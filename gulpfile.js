var gulp = require("gulp");
// html 压缩
var HtmlClean = require("gulp-htmlclean");
// js 压缩
var Uglify = require("gulp-uglify");
// js 除去调试语句
var StripDebug = require("gulp-strip-debug");
// css 添加前缀和压缩
var Postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var cssnano = require("cssnano");
var less = require("gulp-less");
// img 图片压缩
var Imagemin = require("gulp-imagemin");
// gulp 服务器
var connect = require("gulp-connect");

//判断模式环境 开发模式还是生产模式
// true --> 开发环境
// false --> 生产环境
var devMode = process.env.NODE_ENV !== "production";

// $ export NODE_ENV=development 在git里设置模式环境


gulp.task("html", function () {
    var page = gulp.src("./src/html/*")
        // 每次监听到文件有改动，再次执行这个任务时，让页面重新加载 connect.reload()
        .pipe(connect.reload());
        if(!devMode) {
            page.pipe(HtmlClean());
        }
        page.pipe(gulp.dest("./dist/html/"));
})

gulp.task("css", function () {
    var css = gulp.src("./src/css/*")
        .pipe(connect.reload())
        .pipe(less());
        var options = [autoprefixer()]
        if(!devMode) {
            options.push(cssnano());
        }
        css.pipe(Postcss(options))
        .pipe(gulp.dest("./dist/css/"));
})

gulp.task("js", function () {
    var js = gulp.src("./src/js/*")
    .pipe(connect.reload());
    if(!devMode) {
        js.pipe(Uglify())
        .pipe(StripDebug())
    }    
    js.pipe(gulp.dest("./dist/js/"));
})

gulp.task("img", function () {
    gulp.src("./src/img/*")
        .pipe(Imagemin())
        .pipe(gulp.dest("./dist/img/"));
})

// 自动监听变化并打包文件
gulp.task("watch", function () {
     // 监听 ./src/html/ 文件夹下 所有文件, 如果有变化就执行 "html"任务
    gulp.watch("./src/html/*", ["html"]);
    gulp.watch("./src/js/*", ["js"]);
    gulp.watch("./src/css/*", ["css"]);
    gulp.watch("./src/img/*", ["img"]);
})

// 创建开启gulp服务器 任务
gulp.task("server", function () {
    connect.server({
        port: 9082,
        livereload: true
    });
})

gulp.task('default', ['html', "css", "js", "img", "watch", "server"]);