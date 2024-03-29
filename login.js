"use strict";

window.onload = function () {
    $('.button > button').on('click', function() {
        const ac = $('#ac').val();
        const pw = $('#pw').val();

        let request = new XMLHttpRequest();

        request.onreadystatechange = function() {
            if(this.readyState === 4) {
                const res = JSON.parse(this.responseText);
                if(res.success) {
                    alert('登录成功！');

                    location.assign('menu.html');
                } else {
                    alert(res.message);

                    $('#ac').val('');
                    $('#pw').val('');
                }
            }
        }

        request.open('POST', 'https://www.yangxiangrui.xyz:9092/gift/admin/login', true);
        request.setRequestHeader('Content-Type', 'application/json');
        request.send(JSON.stringify({
                username: String(ac),
                password: String(pw),
                id: 0
        }));
    });
}
