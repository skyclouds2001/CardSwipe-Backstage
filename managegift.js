"use strict";

window.onload = function () {
    // 记录当前分页：1代表新上传礼物（初始值）；0代表过往礼物
    let STATE = 1;
    // 记录页数
    let page_new = 1;
    let page_old = 1;
    // 请求url
    const url_old = 'https://www.yangxiangrui.xyz:9092/gift/admin/examinedGift';
    const url_new = 'https://www.yangxiangrui.xyz:9092/gift/admin/unexaminedGift';
    // 记录礼物信息
    let gift_info = null;

    // 返回图标事件处理
    $('#return').on('click', function () {
        location.assign('menu.html');
    });

    // 导航栏切换事件处理
    $('.new-gift').on('click', function () {
        // 检测并设置当前分页
        if(STATE === 1) {
            return;
        }
        STATE = 1;

        // 获取当前页数并更新
        const page = 1;
        page_new = 1;
        page_old = 1;

        // 请求获取数据
        getGift(url_new, page);
    });
    $('.old-gift').on('click', function () {
        // 检测并设置当前分页
        if(STATE === 0) {
            return;
        }
        STATE = 0;


        // 获取当前页数并更新
        const page = 1;
        page_old = 1;
        page_new = 1;

        // 请求获取数据
        getGift(url_old, page);
    });

    // 获取礼物：成功获取后会调用渲染函数
    function getGift(url, page) {
        let request = new XMLHttpRequest();

        request.onreadystatechange = function() {
            if(this.readyState === 4) {
                const res = JSON.parse(this.responseText);

                const gift = res.data['giftList:'];
                gift_info = gift;

                setGift(gift);
            }
        }

        request.open('GET', url + '/' + page, true);

        request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

        request.send({
            page: page
        });
    }

    // 渲染礼物：渲染完成后会自动给按钮图片添加事件处理函数
    function setGift(gift) {
        $('#content').empty();

        for (const v of gift) {

            const mode = `
                <div class="list-item">
                    <div class="list-item-name">${v.title ? v.title : ' '}</div>
                    <div class="list-item-tags">${v.tag ? v.tag : ' '}</div>
                    <div class="list-item-img">
                        <img src="${v.url ? v.url : './img/gift.png'}">
                    </div>
                    <div class="list-item-manage">
                        <button type="button" id="manage" data-id="${v.id}">${STATE === 1 ? '审核' : '管理'}</button>
                    </div>
                </div>
            `;

            $('#content').append(mode);
        }

        setImgError();
        setButtonClick();
    }

    // 图片加载失败处理
    function setImgError () {
        $('img').on('error', function () {
            $(this).attr('src', './img/gift.png');
        });
    }

    // 按钮点击跳转事件
    function setButtonClick () {
        $('.list-content button').on('click', function () {
            const {id} = this.dataset;

            location.assign(STATE === 1 ? `newgiftinfo.html?id=${id}` : `oldgiftinfo.html?id=${id}`);
        });
    }

    // 页面跳转事件
    $('#preview').on('click', function () {
        setPage(-1);
    });
    $('#next').on('click', function () {
        setPage(1);
    });
    function setPage(flag) {
        if(STATE === 1 && page_new + flag > 0) {
            page_new += flag;

            getGift(url_new, page_new);

            $('#current').text(`第${page_new}页`);
        } else if (STATE === 0 && page_old + flag > 0) {
            page_old += flag;

            getGift(url_old, page_old);

            $('#current').text(`第${page_old}页`);
        }
    }

    // 导航栏搜索事件
    $('.search-value').on('blur', () => {
        const value = $('.search-value').val().trim();
        const gift = gift_info;

        if (gift && value) {

            let gift0 = [];

            gift.forEach((v) => {
                const str = v.title;

                if(str.indexOf(value) !== -1) {
                    gift0.push(v);
                }
            });

            setGift(gift0);
        } else {
            setGift(gift);
        }
    });

    // 初始渲染
    getGift(url_new, page_new);
};
