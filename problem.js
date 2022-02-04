window.onload = function () {
    // 标记分页状态
    //     false代表未检查问题分页，true代表已检查问题分页
    //     默认为false
    let PAGE = false;

    // 返回按钮事件
    $('#btn-return').on('click', () => {
        location.assign('menu.html');
    });
};
