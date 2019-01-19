// @ts-nocheck
let gulp     = require('gulp');
let gulpif   = require('gulp-if');
let rename   = require('gulp-rename');
let imagemin = require('gulp-tinypng-nokey');

module.exports = function (o) {
    gulp.src(o.file.src)
        .pipe(gulpif(o.file.min, imagemin()))
        .pipe(gulpif(o.file.min, imagemin()))
        .pipe(gulpif(o.file.min, imagemin()))
        .pipe(rename({suffix: ''}))
        .pipe(gulp.dest(o.file.out))                                                                                       //压缩好的图片输出路经
        .on('end', function () {
            console.log((o.file.out + '/' + o.file.name + '  ').green + (new Date().getHours() + ':' + (new Date().getMinutes() < 10 ? '0' + new Date().getMinutes() : new Date().getMinutes()) + '  ✓').magenta);
        });
    // 回调
    o && o.then && o.then();
};