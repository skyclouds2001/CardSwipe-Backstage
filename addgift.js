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
    let imgurl = '';

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
                        $('.img_box').css('display', 'block');

                        alert('图片上传成功！');
                    } else {
                        alert('图片上传失败\n请稍后再试');
                        return;
                    }
                }
            });
        })
    });

    // button提交表单及图片
    $('#update_single').on('click', function () {
        // 获取表单各内容
        const obj = {
            buyurl: $('#gift_source').val(),
            des: $('gift_info').val(),
            tag: $('#gift_tags').val(),
            title: $('#gift_name').val(),
            url: imgurl,
            price: $('#gift_price').val()
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

        request.open('POST', 'https://www.yangxiangrui.xyz:9092/gift/gift/addGift', true);
        request.setRequestHeader('Content-Type', 'application/json');
        request.send(JSON.stringify(obj));
    });
}
