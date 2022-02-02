window.onload = function() {
    // 标记选择的内容，默认是false
    // false代表多选， true代表单选
    let selected = false;
    // 导航栏点击切换效果
    $('.navigator > div').on('click', function () {
        // 0代表点击的是多选，1代表点击的是单选
        const index = Number(this.dataset.flag);

        if(index === 1 && !selected) {
            $('.navigator > div:eq(1)').addClass('selected');
            $('.navigator > div:eq(0)').removeClass('selected');

            $('.content:eq(1)').css('display', 'flex');
            $('.content:eq(0)').css('display', 'none');

            selected = !selected;
        }
        if(index === 0 && selected) {
            $('.navigator > div:eq(0)').addClass('selected');
            $('.navigator > div:eq(1)').removeClass('selected');

            $('.content:eq(0)').css('display', 'flex');
            $('.content:eq(1)').css('display', 'none');

            selected = !selected;
        }
    });

    // 多礼物上传部分
    let fileObj = null;
    // 多礼物上传选中文件
    $('.icon').on('click', function () {
        // 触发文件提交
        $('#fileUp').click();

        // 绑定变化事件
        $('#fileUp').change((e) => {
            // 获取文件
            const file = e.target.files[0];

            // 判断文件类型及是否存在
            if(file){
                const file_type = file.name.substring(file.name.lastIndexOf('.'));
                if (file_type === '.xlsx' || file_type === '.xls') {
                    fileObj = file;
                } else {
                    alert("请提交excel文件！");
                }
            } else {
                alert("请选择excel文件！");
            }
        });
    });

    // 多选按钮button提交文件
    $('.button > button').on('click', function () {
        // 判断文件是否存在
        if(!fileObj) {
            alert('请先选择excel文件再提交！');
            return;
        }

        // 初始化数据&发送请求
        let formdata = new FormData();
        formdata.append('file', fileObj);
        formdata.append('name', fileObj.name);

        $.ajax({
            url: 'https://www.yangxiangrui.xyz:9092/gift/excel/upload',
            type: 'POST',
            async: true,
            data: formdata,
            contentType: false,
            processData: false,
            success: (e) => {
                if(e.success) {
                    alert('上传成功！');
                } else {
                    alert('上传失败\n请稍后再试');
                }
            }
        });
    });

    // 单礼物上传部分
}
