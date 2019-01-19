let gulp     = require('gulp');

module.exports = function (o) {
    gulp.src(o.file.src)
        .pipe(gulp.dest(o.file.out))
        .on('end', function () {
            console.log((o.file.out + '/' + o.file.name + '  ').green + (new Date().getHours() + ':' + (new Date().getMinutes() < 10 ? '0' + new Date().getMinutes() : new Date().getMinutes()) + '  ✓').magenta);
        });
    // 回调
    o && o.then && o.then();
};