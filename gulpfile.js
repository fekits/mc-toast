/**
 * 使用到的插件
 * @param colors {*} -> colors是打印日志设置颜色的插件，require即可,无需设置一下接收变量。
 * @param gulp {*} -> Gulp不解释
 *
 * */
require('colors');
const gulp  = require('gulp');
const clean = require('gulp-clean');

/**
 * 拆分的子任务
 * @param build {*} -> Build.js配置文件预处理
 * */
const build      = require('./tasks/task-build');
const buildJs    = require('./tasks/task-js');
const buildCss   = require('./tasks/task-css');
const buildImg   = require('./tasks/task-img');
const buildMedia = require('./tasks/task-media');
const buildHtml  = require('./tasks/task-html');

/**
 * 清理
 * */
gulp.task('clean', function () {
    return gulp.src(['./tmp', './dist', './out', './npm/**/*.{js,css,scss,less,html}', './pro', './dev', '!src/'], {read: false}).pipe(clean());
});

// 开发环境打包
gulp.task('dev-js', function () {
    build({env: 'dev'}, function (item) {
        // 处理JS
        item.file.js.forEach(function (file) {
            buildJs({
                file: file,
                env : 'dev'
            });
        });
    });
});
gulp.task('dev-css', function () {
    build({env: 'dev'}, function (item) {
        // 处理JS
        item.file.css.forEach(function (file) {
            buildCss({
                file: file,
                env : 'dev'
            });
        });
    });
});
gulp.task('dev-img', function () {
    build({env: 'dev'}, function (item) {
        // 处理JS
        item.file.img.forEach(function (file) {
            buildImg({
                file: file,
                env : 'dev'
            });
        });
    });
});
gulp.task('dev-media', function () {
    build({env: 'dev'}, function (item) {
        // 处理媒体
        item.file.media.forEach(function (file) {
            buildMedia({
                file: file,
                env : 'dev'
            });
        });
    });
});
gulp.task('dev-html', function () {
    build({env: 'dev'}, function (item) {
        // 处理JS
        item.file.html.forEach(function (file) {
            buildHtml({
                file: file,
                env : 'dev'
            });
        });
    });
});

gulp.task('dev', ['clean'], function () {
    // 获取项目及其预处理好的配置文件
    build({env: 'dev'}, function (item) {

        // console.log(JSON.stringify(item));

        // 处理JS
        item.file.js.forEach(function (file) {
            buildJs({
                file: file,
                env : 'dev'
            });
        });

        // 处理CSS
        item.file.css.forEach(function (file) {
            buildCss({
                file: file,
                env : 'dev'
            });
        });

        // 处理IMG
        item.file.img.forEach(function (file) {
            buildImg({
                file: file,
                env : 'dev'
            });
        });

        // 处理IMG
        item.file.media.forEach(function (file) {
            buildMedia({
                file: file,
                env : 'dev'
            });
        });

        // 处理HTML
        item.file.html.forEach(function (file) {
            buildHtml({
                file: file,
                env : 'dev'
            });
        });
    });

    gulp.watch('./src/**/*.js', ['dev-js']);
    gulp.watch(['./src/**/*.scss', './kits/**/*.scss'], ['dev-css']);
    gulp.watch('./src/**/*.{png,jpg}', ['dev-img']);
    gulp.watch('./src/**/*.{mp3,mp4}', ['dev-media']);
    gulp.watch('./src/**/*.html', ['dev-html']);
});

// 生产环境打包
gulp.task('pro', ['clean'], function () {
    // 获取项目及其预处理好的配置文件
    build({env: 'pro'}, function (item) {
        // console.log(item);

        // 处理JS
        item.file.js.forEach(function (file) {
            buildJs({
                file: file,
                env : 'pro'
            });
        });

        // 处理CSS
        item.file.css.forEach(function (file) {
            buildCss({
                file: file,
                env : 'pro'
            });
        });

        // 处理IMG
        item.file.img.forEach(function (file) {
            buildImg({
                file: file,
                env : 'pro'
            });
        });

        // 处理IMG
        item.file.media.forEach(function (file) {
            buildMedia({
                file: file,
                env : 'pro'
            });
        });

        // 处理HTML
        item.file.html.forEach(function (file) {
            buildHtml({
                file: file,
                env : 'pro'
            });
        });

    });

});