"use strict";

window.onload = function () {
    // 标记分页状态
    //     false代表未检查问题分页，true代表已检查问题分页
    //     默认为false
    let PAGE = false;
    // 标记各分页页数
    let ePage = 1;  // 已检查页数
    let uPage = 1;  // 未检查页数
    // 记录当页问题数量
    let pageSize = 0;

    // 返回按钮事件
    $('#btn-return').on('click', () => {
        location.assign('menu.html');
    });

    // 查看按钮事件
    $('.check').on('click', function () {
        const {id, content} = this.dataset;
        location.assign(`probleminfo.html?id=${id}&content=${content}`);
    });

    // 切换分页按钮事件
    $('#unchecked').on('click', () => {
        if(PAGE) {
            ePage = 1;
            uPage = 1;
            PAGE = false;

            getProblemList();
        }
    });
    $('#checked').on('click', () => {
        if(!PAGE) {
            ePage = 1;
            uPage = 1;
            PAGE = true;

            getProblemList();
        }
    });

    // 换页按钮事件
    $('#preview').on('click', () => {
        if(PAGE && ePage > 1) {
            ePage -= 1;
            getProblemList();
            $('#current').text(`第${ePage}页`);
        } else if (!PAGE && uPage > 1) {
            uPage -= 1;
            getProblemList();
            $('#current').text(`第${uPage}页`);
        } else {
            alert('已在第一页');
        }
    });
    $('#next').on('click', () => {
        if(PAGE && pageSize === 20) {
            ePage += 1;
            getProblemList();
            $('#current').text(`第${ePage}页`);
        } else if (!PAGE && pageSize === 20) {
            uPage += 1;
            getProblemList();
            $('#current').text(`第${uPage}页`);
        } else {
            alert('已在最后一页');
        }
    });

    // 获取用户数据: 成功获取后调用渲染函数
    function getProblemList () {
        let url = '';
        if(PAGE) {
            url = `https://www.yangxiangrui.xyz:9092/gift/admin/examinedQuestion/${ePage}`;
        } else {
            url = `https://www.yangxiangrui.xyz:9092/gift/admin/unexaminedQuestion/${uPage}`;
        }

        let request = new XMLHttpRequest();

        request.onreadystatechange = function() {
            if(this.readyState === 4) {
                const res = JSON.parse(this.responseText);
                console.log(res);
                // setProblemList(res.data['questionList:']);
            }
        }

        request.open('GET', url, true);

        request.setRequestHeader('content-type', 'application/x-www-form-urlencoded');

        request.send({
            page: PAGE ? ePage : uPage
        });
    }

    // 渲染页面数据
    function setProblemList(issue) {
        pageSize = issue.length;

        $('.content').empty();

        for(const v of issue) {
            const mode = `
                <div class="item">
                    <div class="item-icon">
                        <img src="./img/gift.png">
                    </div>
                    <div class="item-name">lilillllllllllllllllllll</div>
                    <div class="item-time">2022/2/5 14:26:45</div>
                    <div class="item-btn">
                        <button type="button" class="check" data-id="1" data-content="1">查看</button>
                    </div>
                </div>
            `;
            $('.content').append(mode);
        }

        $('.check').on('click', function () {
            const {id, content} = this.dataset;
            location.assign(`probleminfo.html?id=${id}&content=${content}`);
        });
    }

    getProblemList();
};
