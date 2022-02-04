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
       for (var i=0;i<vars.length;i++) {
               var pair = vars[i].split("=");
               if(pair[0] == variable){return pair[1];}
       }
       return(false);
}

// 图片加载失败处理
function setImgError () {
    $('img').on('error', function () {
        $(this).attr('src', './img/gift.png');
    });
}

// 获取礼物信息
function getGiftInfo (id) {
    let request = new XMLHttpRequest();
    request.onreadystatechange = function() {
        if(this.readyState === 4) {
            const res = JSON.parse(this.responseText);
            if(res.success) {
                setGiftInfo(res.data.gift);
            } else {
                alert('加载出错，请稍后再试');
            }
        }
    }
    request.open('GET', `https://www.yangxiangrui.xyz:9092/gift/gift/getGiftById/${id}`, true);
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    request.send({
        id: id
    });
}

// 渲染礼物信息
function setGiftInfo (gift) {
    const mode = `
        <div class="gift-img">
            <img src="${gift.url ? gift.url : './img/gift.png'}">
        </div>
        <div class="gift-title">${gift.title ? gift.title : ' '}</div>
        <div class="gift-price">${gift.price ? '￥' + gift.price : ' '}</div>
        <div class="gift-tag">${gift.tag}</div>
        <div class="gift-des">${gift.des}</div>
    `;
    $('#gift-content').html(mode);

    setImgError();
}

window.onload = function () {
    // 提取礼物id
    const id = getQueryVariable('id');

    // 获取及渲染礼物信息
    getGiftInfo(id);

    // 设置删除按钮事件
    $('#delete').on('click', function () {
        let request = new XMLHttpRequest();
        request.onreadystatechange = function() {
            if(this.readyState === 4) {
                const res = JSON.parse(this.responseText);
                if(res.success) {
                    alert('删除成功！');
                    location.assign('managegift.html');
                } else {
                    alert('删除失败，请稍后再试');
                }
            }
        }
        request.open('GET', `https://www.yangxiangrui.xyz:9092/gift/admin/delete/${id}`, true);
        request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        request.send({
            id: id
        });
    });

    // 设置通过按钮事件
    $('#pass').on('click', function () {
        let request = new XMLHttpRequest();
        request.onreadystatechange = function() {
            if(this.readyState === 4) {
                const res = JSON.parse(this.responseText);
                if(res.success) {
                    alert('操作成功！');
                    location.assign('managegift.html');
                } else {
                    alert('操作失败，请稍后再试');
                }
            }
        }
        request.open('GET', `https://www.yangxiangrui.xyz:9092/gift/admin/pass/${id}`, true);
        request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        request.send({
            id: id
        });
    });

    // 设置修改按钮事件
    $('#modify').on('click', function () {
        location.assign(`oldgiftinfo.html?id=${id}`);
    });
};
