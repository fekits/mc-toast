// @ts-nocheck
let gulp    = require('gulp'),
    tap     = require('gulp-tap'),
    gulpif  = require('gulp-if'),
    rename  = require('gulp-rename'),
    htmlmin = require('gulp-htmlmin');


module.exports = function(o) {
    let ins = o.file.ins;
    gulp.src(o.file.src)
        .pipe(tap(function(file) {
            let newContents = file.contents.toString();
            ins.map(function(item) {
                let reg     = new RegExp('</' + item.pos + '>');
                let insCode = (item.pos === 'head' ? '    ' : '') + item.src.join('\n' + (item.pos === 'head' ? '    ' : ''));
                newContents = newContents.replace(reg, insCode + '\n</' + item.pos + '>');
            });
            file.contents = Buffer.concat([
                Buffer.from(newContents)
            ]);
        }))
        .pipe(gulpif(o.file.min, htmlmin({
                removeComments: true,                                                         //清除HTML注释
                collapseWhitespace: true,                                                         //压缩HTML
                collapseBooleanAttributes: true,                                                         //省略布尔属性的值 <input checked="true"/> ==> <input />
                removeEmptyAttributes: true,                                                         //删除所有空格作属性值 <input id="" /> ==> <input />
                removeScriptTypeAttributes: true,                                                         //删除<script>的type="text/javascript"
                removeStyleLinkTypeAttributes: true,                                                         //删除<style>和<link>的type="text/css"
                minifyJS: true,                                                         //压缩页面JS
                minifyCSS: true                                                          //压缩页面CSS
            })
        ))
        .pipe(gulpif(o.file.name !== '' && o.file.src.length === 1, rename(o.file.name)))
        .pipe(gulp.dest(o.file.out))
        .on('end', function() {
            for(let i = 0; i < o.file.src.length; i++) {
                console.log((o.file.src[i] + '  ').green + (new Date().getHours() + ':' + (new Date().getMinutes() < 10 ? '0' + new Date().getMinutes() : new Date().getMinutes()) + '  ✓').magenta);
            }
        });
    
    // 回调
    o && o.then && o.then();
    
};