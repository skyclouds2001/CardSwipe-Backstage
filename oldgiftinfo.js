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

window.onload = function () {
    // 存储图片url
    let imgurl = '';
    // 礼物id
    const id = getQueryVariable('id');

    // 选中图片
    $('.info_box').on('click', function () {
        // 选择图片
        $('#imgUp').click();

        // 判断文件存在并保存
        $('#imgUp').change((e) => {
            const file = e.target.files[0];

            if(file) {
                imgObj = file;
            } else {
                alert('请选择图片文件!');
                return;
            }

            // 上传图片 获取图片回传url
            let formdata = new FormData();
            formdata.append('file', file);
            formdata.append('name', file.name);
            $.ajax({
                url: 'https://www.yangxiangrui.xyz:9092/eduoss/fileoss',
                type: 'POST',
                async: true,
                data: formdata,
                contentType: false,
                processData: false,
                success: (e) => {
                    if(e.success) {
                        const {url} = e.data;
                        imgurl = url;

                        $('.img_box > img').attr('src', imgurl);
                        $('.img_box').css('display', 'flex');
                        $('.info_box').css('display', 'none');

                        alert('图片上传成功！');
                    } else {
                        alert('图片上传失败,请稍后再试');
                    }
                }
            });
        })
    });

    // button提交表单
    $('#update').on('click', function () {
        // 获取表单各内容
        const obj = {
            buyurl: $('#gift_source').val(),
            des: $('#gift_info').val(),
            tag: $('#gift_tags').val(),
            title: $('#gift_name').val(),
            url: imgurl,
            price: $('#gift_price').val(),
            id: id
        };

        // 检测表单各值有效性: html策略替代

        // 提交表单信息
        let request = new XMLHttpRequest();

        request.onreadystatechange = function() {
            if(this.readyState === 4) {
                const res = JSON.parse(this.responseText);
                if(res.success) {
                    alert('提交成功！');
                } else {
                    alert(res.message);
                }
            }
        };

        request.open('POST', 'https://www.yangxiangrui.xyz:9092/gift/admin/update', true);
        request.setRequestHeader('Content-Type', 'application/json');
        request.send(JSON.stringify(obj));
    });

    // 返回页面
    $('#btn-return').on('click', function () {
        location.assign('managegift.html');
    });

    // 删除图片
    $('#del-img').on('click', function () {
        $('.img_box > img').attr('src', '');
        $('.img_box').css('display', 'none');
        $('.info_box').css('display', 'flex');
        imgurl = '';

        alert('删除成功！');
    });
};
