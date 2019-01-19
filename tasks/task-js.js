// @ts-nocheck
const gulp    = require('gulp');
const gulpif  = require('gulp-if');
const concat  = require('gulp-concat');
const uglify  = require('gulp-uglify');
const rename  = require('gulp-rename');
const webpack = require('webpack-stream');
const babel   = require('gulp-babel');
const maps    = require('gulp-sourcemaps');
const debug   = require('gulp-strip-debug');

function err(error) {
    return function (err) {
        console.log(('ERR:  ' + error + '  ✗').red);
        console.log(err.toString().red);
    };
}

module.exports = function (o) {

    if (o.file.cmd) {
        gulp.src(o.file.src)
            .pipe(gulpif(!o.file.map, webpack({
                stats : {
                    assets : false,
                    hash   : false,
                    version: true
                },
                output: {
                    filename: '[name].js'
                }
            })))
            .pipe(gulpif(o.file.map, webpack({
                stats  : {
                    assets : false,
                    hash   : false,
                    version: true
                },
                // watch  : o.env === 'dev',
                devtool: 'cheap-module-eval-source-map',
                output : {
                    filename: '[name].js'
                }
            })))
            .pipe(gulpif(o.file.syntax === 'es6', babel({
                presets: ['es2015']
            })))
            .pipe(gulpif(o.file.debug, debug()))
            .pipe(gulpif(o.file.min, uglify()))
            .on('error', err('Please check your syntax is es5 or es6'))
            .pipe(gulpif(!o.file.name && !o.file.min, rename({
                suffix: ''
            })))
            .pipe(gulpif(!o.file.name && o.file.min, rename({
                suffix: '.min'
            })))
            .pipe(gulpif(o.file.name && !o.file.min, rename(o.file.name.replace(/\.min\.js/, '.js'))))

            .pipe(gulpif(o.file.name && o.file.min, rename(o.file.name.replace(/(\.min)?\.js/, '.min.js'))))

            .pipe(gulp.dest(o.file.out))
            .on('end', function () {
                console.log((o.file.out + '/' + o.file.name + '  ').green + (new Date().getHours() + ':' + (new Date().getMinutes() < 10 ? '0' + new Date().getMinutes() : new Date().getMinutes()) + '  ✓').magenta);
                // 回调
                o && o.then && o.then();
            });
    } else {
        gulp.src(o.file.src)
            .pipe(gulpif(o.file.map, maps.init()))
            .pipe(gulpif(o.file.syntax === 'es6', babel({
                presets: ['es2015']
            })))
            .pipe(concat(o.file.name))
            .pipe(gulpif(o.file.debug, debug()))
            .pipe(gulpif(o.file.min, uglify()))
            .pipe(gulpif(!o.file.name && !o.file.min, rename({
                suffix: ''
            })))
            .pipe(gulpif(!o.file.name && o.file.min, rename({
                suffix: '.min'
            })))
            .pipe(gulpif(o.file.name && !o.file.min, rename(o.file.name.replace(/\.min\.js/, '.js'))))
            .pipe(gulpif(o.file.name && o.file.min, rename(o.file.name.replace(/(\.min)?\.js/, '.min.js'))))
            .pipe(gulpif(o.file.map, maps.write('./maps')))
            .pipe(gulp.dest(o.file.out))
            .on('end', function () {
                console.log((o.file.out + '/' + o.file.name + '  ').green + (new Date().getHours() + ':' + (new Date().getMinutes() < 10 ? '0' + new Date().getMinutes() : new Date().getMinutes()) + '  ✓').magenta);
                // 回调
                o && o.then && o.then();
            });
    }
};