// 渲染 背景图片音乐封面 歌曲信息 like图标

(function ($, root) {
    function renderImg(src) {
        var img = new Image();
        img.src= src;
        img.onload = function () {
            $(".img-box > img").attr("src", src);
            root.blurImg(img, $("body"));
        }
    }

    function renderInfo(data) {
        var str = "";
        str += '<div class="song-name">' + data.song + '</div>\
                <div class="singer">' + data.singer + '</div>\
                <div class="album">' + data.album + '</div>'
        $(".song-info").html(str);
    }

    function renderIslike(data) {
        if(data.isLike) {
            $(".control > .like").addClass("liking");
        }else {
            $(".control > .like").removeClass("liking");
        }
    }

    root.render = function (data) {
        renderImg(data.image);
        renderInfo(data);
        renderIslike(data);
    }
})(window.Zepto, window.player || (window.player = {}))