/**
 * 默认配置
 *
 * 这里是全局默认配置，在单个配置中默认是使用这个全局默认配置的，如果要自定义则把这个斌值换成自己写的一个配置对象即可！
 * 设置参考文档 doc/build.md
 *
 *
 * **/
const config = require('../../tasks/conf');

/**
 * 打包配置
 *
 * 1、把需要打包到一起的JS写在同一个src的数组中。
 * 2、如果单个配置中有自定义的配置参数，则整个conf下的所有设置都需要手动配置。--这个以后会改善！！！
 *
 * **/
module.exports = {
    info: {
        name   : 'mc-toast',
        version: '2.0.0',
        title  : 'MC-TOAST',
        branch : 'master',
        author : 'xiaojunbo'
    },
    conf: config,
    file: {
        html : [
            {
                name: 'index.html',
                ins : [
                    {
                        pos: 'head',
                        src: [
                            './css/demo.min.css',
                            './css/mc-toast-aa.min.css',
                            './css/mc-toast-ab.min.css',
                            './css/mc-toast-ac.min.css'
                        ]
                    },
                    {
                        pos: 'body',
                        src: [
                            './js/demo.min.js'
                        ]
                    }
                ],
                src : [
                    '{item}/index.html'
                ],
                min : false
            },
            {
                name: 'low.html',
                ins : [
                    {
                        pos: 'head',
                        src: [
                            './css/low.min.css',
                            './css/mc-toast-low-aa.min.css'
                        ]
                    },
                    {
                        pos: 'body',
                        src: [
                            './js/low.min.js'
                        ]
                    }
                ],
                src : [
                    '{item}/low.html'
                ],
                min : false
            }
        ],
        css  : [
            {
                name: 'demo.css',
                src : [
                    '{item}/css/demo.scss'
                ]
            },
            {
                name: 'low.css',
                src : [
                    '{item}/css/low.scss'
                ]
            },
            {
                name: 'mc-toast-aa.css',
                src : [
                    '{item}/css/mc-toast@theme=aa.scss'
                ]
            },
            {
                name: 'mc-toast-low-aa.css',
                src : [
                    '{item}/css/mc-toast-low@theme=aa.scss'
                ]
            },
            {
                name: 'mc-toast-ab.css',
                src : [
                    '{item}/css/mc-toast@theme=ab.scss'
                ]
            },
            {
                name: 'mc-toast-ac.css',
                src : [
                    '{item}/css/mc-toast@theme=ac.scss'
                ]
            },
            {
                name: 'mc-toast-aa.css',
                src : [
                    '{item}/css/mc-toast@theme=aa.scss'
                ],
                out : 'npm/theme'
            },
            {
                name: 'mc-toast-low-aa.css',
                src : [
                    '{item}/css/mc-toast-low@theme=aa.scss'
                ],
                out : 'npm/theme'
            },
            {
                name: 'mc-toast-ab.css',
                src : [
                    '{item}/css/mc-toast@theme=ab.scss'
                ],
                out : 'npm/theme'
            },
            {
                name: 'mc-toast-ac.css',
                src : [
                    '{item}/css/mc-toast@theme=ac.scss'
                ],
                out : 'npm/theme'
            }
        ],
        js   : [
            {
                name  : 'demo.js',
                src   : [
                    '{item}/js/demo.js'
                ],
                syntax: 'es6',
                cmd   : true
            },
            {
                name  : 'low.js',
                src   : [
                    '{item}/js/low.js'
                ],
                syntax: 'es6',
                cmd   : true
            },
            {
                name  : 'mc-toast.js',
                src   : [
                    '{item}/js/mc-toast.js'
                ],
                syntax: 'es6'
            },
            {
                name  : 'mc-toast.js',
                src   : [
                    '{item}/js/mc-toast.js'
                ],
                syntax: 'es5',
                min   : false,
                cmd   : false,
                out   : 'npm',
                debug : false
            },
            {
                name  : 'mc-toast.low.js',
                src   : [
                    '{item}/js/mc-toast.low.js'
                ],
                syntax: 'es5',
                cmd   : false,
                min   : false,
                out   : 'npm',
                debug : false
            }
        ],
        img  : [
            {
                src: [
                    '{item}/img/*.{png,jpg,gif,ico}'
                ]
            }
        ],
        media: [
            {
                src: [
                    '{item}/media/*.{mp3,mp4}'
                ]
            }
        ]
    },
    then: {}
};
