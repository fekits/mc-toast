// @ts-nocheck
const gulp         = require('gulp');
const sass         = require('gulp-sass');
const less         = require('gulp-less');
const gulpif       = require('gulp-if');
const rename       = require('gulp-rename');
const concat       = require('gulp-concat');
const mincss       = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');
const maps         = require('gulp-sourcemaps');


module.exports = function(o) {
    gulp.src(o.file.src)
        .pipe(gulpif(o.file.map, maps.init()))
        .pipe(gulpif(o.file.syntax === 'scss', sass().on('error', function(err) {
            console.log(err);
        })))
        .pipe(gulpif(o.file.syntax === 'less', less()))
        .pipe(autoprefixer({                                                                                             // 自动处理兼容（添加-webkit等操作）
            browsers: ['last 2 versions', 'Android >= 4.0', 'iOS>=8'],                                                   // 兼容最后两个版本
            cascade : false,                                                                                              // 是否美化代码？(属性按:对齐)
            remove  : true                                                                                                 // 是否去掉不必要的前缀 默认：true
        }))
        .pipe(concat(o.file.name))                                                                                         // 合并CSS
        .pipe(gulpif(o.file.min, mincss()))                                                                                // 压缩CSS
        .pipe(gulpif(!o.file.min, rename(o.file.name.match(/(.*)(\.css|\.scss)/)[1] + '.css')))
        .pipe(gulpif(o.file.min, rename(o.file.name.match(/(.*)(\.css|\.scss)/)[1] + '.min.css')))                           // 压缩后修改为"文件名.min.css"
        .pipe(gulpif(o.file.map, maps.write('./maps')))
        .pipe(gulp.dest(o.file.out))                                                                                       // 输出CSS
        .on('end', function() {
            console.log((o.file.out + '/' + o.file.name.replace(/\.scss/, '.css') + '  ').green + (new Date().getHours() + ':' + (new Date().getMinutes() < 10 ? '0' + new Date().getMinutes() : new Date().getMinutes()) + '  ✓').magenta);
        });
    // 回调
    o && o.then && o.then();
    
};