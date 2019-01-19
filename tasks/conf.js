module.exports = {
    dev: {
        html: {
            out : '',                    // HTML输出目录
            min : false,                 // 是否压缩
            mix : false,                 //
            bare: false                  // 是否去除<HTML>,<BODY><HEAD>等标签
        },
        css : {
            out   : 'css',               // CSS输出目录
            syntax: 'scss',              // 编译语言
            min   : true,                // 是否压缩
            map   : true                 // 是否生成MAP源文件追踪
        },
        js  : {
            out   : 'js',                // JS输出目录
            syntax: 'es5',               // 编译语言
            min   : true,                // 是否压缩
            map   : true,                // 是否生成MAP源文件追踪
            cmd   : false,               // 是否为CMD模式打包(CMD采用webpack打包)
            debug : false
        },
        img : {
            out   : 'img',               // 图片输出目录
            min   : false,               // 是否压缩图片
            sprite: false,               // 是否开启雪碧图 - 功能未建设
            base64: false                // 是否把图片转为BASE64码
        },
        media :{
            out   : 'plugin',            // 媒体输出目录
            min   : false,               // 是否压缩媒体
        },
        out : 'dist'                     // 整个项目打包输出目录
    },
    pro: {
        html: {
            out : '',
            min : false,
            mix : false,
            bare: false
        },
        css : {
            out   : 'css',
            syntax: 'scss',
            min   : true,
            map   : false
        },
        js  : {
            out   : 'js',
            syntax: 'es5',
            min   : true,
            map   : false,
            cmd   : false,
            debug : true
        },
        img : {
            out   : 'img',
            min   : true,
            sprite: false,
            base64: false
        },
        media :{
            out   : 'plugin',            // 媒体输出目录
            min   : false,               // 是否压缩媒体
        },
        out : 'dist'
    }
};