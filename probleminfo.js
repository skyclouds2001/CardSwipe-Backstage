"use strict";

/*
 * 来源：菜鸟教程
 *
 * 功能：提取url中指定参数
 * 参数：参数的键名
 * 返回值：参数的键值 or false
 */
function getQueryVariable (variable) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
            var pair = vars[i].split("=");
            if(pair[0] == variable){
                return pair[1];
            }
    }
    return false;
}

window.onload = function () {
    const id = getQueryVariable('id');
    const content = getQueryVariable('content');

    // 设置问题内容
    $('#content').text(decodeURIComponent(content));

    // 设置问题通过事件
    $('#solve').on('click', () => {
        let request = new XMLHttpRequest();

        request.onreadystatechange = function() {
            if(this.readyState === 4) {
                const res = JSON.parse(this.responseText);

                if(res.success) {
                    alert('操作成功！');
                    location.assign('problem.html');
                } else {
                    alert('操作失败！\n请稍后再试');
                }
                
            }
        }

        request.open('GET', `https://www.yangxiangrui.xyz:9092/gift/admin/passQuestions/${id}`, true);

        request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

        request.send({
            id: id
        });
    });

    // 设置返回按钮事件
    $('.return-icon').on('click',  () => {
        location.assign('problem.html');
    });
};
