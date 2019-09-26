/*
1. 歌曲总时间 
2. 进度条和时间的 运动和停止
3. 拖拽
*/ 
(function ($, root){

    var duration;
    var timer; 
    var startT;
    var lastPer = 0;

    function renderAllTime(time) {
        duration = time;
        var str = formatTime(time);
        $(".end-time").html(str);
    }

    function formatTime(t) {
        t = Math.round(t);
        var m = Math.floor(t / 60);
        var s = t - m * 60;
        m = m < 10 ? "0" + m : m;
        s = s< 10 ? "0" + s : s;
        return m + ":" + s;
    }

    function start(dragPer) {
        // dragPer 为 拖拽放开后，之前的百分比，要累加上
        // 如果存在 dragPer , dragPer的值有可能包含了 lastPer，有可能小于 lastPer
        // 只要存在拖拽后的 dragPer值 , 就直接用 dragPer 累加
        // 不存在 dragPer ,说明没有拖拽， 进行正常的 lastPer 累加
        lastPer = dragPer == undefined ? lastPer : dragPer;
        startT = new Date().getTime();
        function frame(){
            var nowT = new Date().getTime();
            var per = (nowT - startT) / (duration * 1000);
            per = lastPer + per;
            if (per < 1){
                update(per);
                // per < 1, 音乐还没播放完时，才需要继续开启 回调，继续监听，继续更新，否则关闭 
                timer = requestAnimationFrame(frame);
            }else {
                cancelAnimationFrame(timer);
                $(".pre").trigger("click");
            }
        } 
        frame();
        
    }

    function stop() {
        cancelAnimationFrame(timer);
        // 每次暂停时，获取之前 走过的百分比，下次再播放时，累加上去
        var lastT = new Date().getTime();
        // 每进行一次播放，都会更新一次 startT的值，暂停的时候 则会计算出 这段 时间的百分比，
        // 所以每次stop()的时，还要累加上 上一次计算出的百分比，才是总共的
        lastPer = lastPer + (lastT - startT) / (duration * 1000);
    } 

    function update(per) {
        // 更新时间
        var curTime = formatTime(per * duration);
        $(".cur-time").html(curTime);
        // 进度条运动
        var perBar = (per - 1) * 100;
        $(".bar-top").css({
            "transform": "translateX(" + perBar + "%)"
        });
    }

    root.progressBar = {
        renderAllTime: renderAllTime,
        start: start,
        stop: stop,
        update: update
    }

})(window.Zepto, window.player || (window.player = {}))