(function ($, root) {

    function renderList(data) {
        var ul = $("<ul class='song-list'></ul>");
        var str = "";
        data.forEach(function (ele, index) {
            str += "<li class='item' data-song='" + index + "'>\
                        <span class='item-song' data-song='" + index + "'>" + ele.song + "</span>\
                        <span class='item-singer' data-song='" + index + "'>-" + ele.singer + "</span>\
                    </li>"
        })
        $(ul).append($(str));
        $(".control").append($(ul));
    }

    root.renderList = renderList;
    
})(window.Zepto, window.player || (window.palyer = {}))