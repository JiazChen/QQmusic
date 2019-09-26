// 动态创建audio 播放 暂停
(function ($, root) {

    var ptt = AudioControl.prototype;

    function AudioControl() {
        this.status = "pause";
        this.audio = new Audio();
    }

    ptt.play = function () {
        this.audio.play();
        this.status = "play";
    };

    ptt.pause = function () {
        this.audio.pause();
        this.status = "pause";
    };

    ptt.getAudio = function (src) {
        this.audio.src = src;
        this.audio.load();
    };

    ptt.playTo = function (per, dur) {
        this.audio.currentTime = (per * dur);
        this.play();
    }

    root.audioControl = new AudioControl();

})(window.Zepto, window.player || (window.palyer = {}))