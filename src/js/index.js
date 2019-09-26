var root = window.player;
var nowIndex = 0;
var len, data;
var audioControl = root.audioControl;
var timer;
var pro = root.progressBar;

//获取数据
function getData(url) {
    $.ajax({
        url: url,
        type: "get",
        success: function (res) {
            console.log(res);
            data = res;
            len = res.length;
            // 初始化渲染
            root.render(res[nowIndex]);
            // 初始化加载音乐
            audioControl.getAudio(res[nowIndex].audio);
            // 初始化渲染音乐列表
            root.renderList(res);
            // 初始化歌曲总时长
            pro.renderAllTime(res[nowIndex].duration);
            // 初始化进度条拖拽事件
            bindTouch();
            // 初始化绑定事件
            bindEvent();
        },
        error: function (e) {
            console.log("error" + e);
        }
    })
}
// 拖拽
function bindTouch() {
    var per, left, width, offset = $(".pro-wrap").offset();
    $(".spot").on("touchstart", function (e) {
        // 进行拖拽前 让正在运动的进度条与时间停止
        pro.stop();
        // 获取进度条到文档左边界的距离
        left = offset.left;
        // 获取进度条长度
        width = offset.width;
    }).on("touchmove", function (e) {
        var nowX = e.changedTouches[0].clientX;
        var disX = nowX - left;
        per = disX / width;
        // 给per一个 范围，在这个有效范围内进度条才跟着更新，以免拖出去
        // 当拖拽 per值 超过这个范围时，然它等于零
        if(per > 0 && per <= 1) {
            pro.update(per);
        }else {
            per = 0;
        }
    }).on("touchend",function (e) {
        // 放开的时候开始播放音乐
        // 更新音乐进度
        audioControl.playTo(per, data[nowIndex].duration);
        // 放开的时候重新开启进度条，并且把之前拖拽的百分比累加上
        pro.start(per)
        $(".play").addClass("playing");


    })
}
// 绑定事件
function bindEvent() {
    // 左右切换 调用渲染render
    $(".pre").click(function() {  
        handler(-1);
    });
    $(".next").click(function() { 
        handler(1);
    });

    // 播放暂停
    $(".play").click(function () {
        if(audioControl.status == "pause") {
            // 音乐播放
            audioControl.play();
            // play样式
            $(".play").addClass("playing");
            // 开始旋转
            rotate("running");
            // 开启 时间 与进度条 运动
            pro.start();
        }else {
            // 音乐暂停
            audioControl.pause();
            // play样式
            $(".play").removeClass("playing");
            // 停止旋转
            rotate("paused");
            // 暂停
            pro.stop();
        }
    })

    // 歌单列表 toggle list
    $(".list").click(function () {
        $(".song-list").toggle()
                        .scrollTop(0); // 每次默认让list滚动条回归0
    })
    $(".song-list").on("click", function (e) {
        var target =  e.target;
        nowIndex = $(target).attr("data-song");
        $(".song-list").css("display", "none");
        handler();
    })
}
// 计算index 和 重新渲染页面
function handler(val) {
    // 有val, 则是 next pre 按钮触发
    // 没有val, 则是 list 触发
    if(val) {
        nowIndex = (nowIndex + val + len) % len;
    }
    // 每次切换 重新渲染 页面
    root.render(data[nowIndex])
    // 每次切换 重新加载 音乐
    audioControl.getAudio(data[nowIndex].audio);
    // 每次切换 重新加载 歌曲总时长
    pro.renderAllTime(data[nowIndex].duration);
    // 每次切换 初始化进度条

    pro.stop(); //每次切换 关闭上一个 定时器
    pro.start(0); //每次切换 初始化lastPer = 0
    pro.stop(); // 初始化lastPer = 0之后，马上关闭这个 定时器
    pro.update(0); // 每次切换 初始化进度条

    // 判断play状态下切歌 继续播放音乐
    if(audioControl.status == "play") {
        audioControl.play();
        pro.start(0);
    }
}
// 旋转
function rotate(state) {
    $(".img-box").css("animation-play-state", state);
}

getData("http://localhost:9082/mock/data.json");

// 1. 渲染 render
// 2. 左右切换 toggle
// 3. 播放暂停 添加
// 4. 音乐列表
// 5. 进度条

// if (nowIndex == 0) {
//     nowIndex = len - 1;
// } else {
//     nowIndex--;
// }
// if (nowIndex == len - 1) {
//     nowIndex = 0;
// } else {
//     nowIndex++;
// }