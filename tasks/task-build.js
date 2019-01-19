// @ts-nocheck
const path = require('path');
const fs   = require('fs');


/**
 * 预处理build配置文件
 * */
module.exports = function (o, cb) {
    // 超全局任务队列
    global.taskQueue = [];

    // 配置列表(全局使用)
    let builds = [];

    // 源文件目录
    const srcDir = path.resolve(__dirname, '../src');

    // 获取SRC源文件目录下的所有子文件和文件夹(以下简称源目录子项)的数组;
    let srcLs = ['.'].concat(fs.readdirSync(srcDir));

    // 遍历源目录子项数组;
    for (let i = 0; i < srcLs.length; i++) {
        // 源目录子项名称
        const srcLsName = srcLs[i];

        // 源目录子项路径
        const srcLsDir = srcDir + (srcLsName ? '/' + srcLsName : '');

        // 源目录子项下面的BUILD.JS
        const buildJS = srcLsDir + '/build.js';

        // 检查BUILD.JS文件是否存在
        if (fs.existsSync(buildJS)) {
            /*build.js存在则说明是需要打包的项目源文件目录，这里把没有build.js配置的目录和所有文件排除掉了。*/

            // 判断是否传入环境设置参数
            if (o && o.env) {


                // 打印成功状态日志
                console.log(('[' + srcLsName + ']  ✓').green);

                // 读取项目build.js配置文件信息
                let build = require(buildJS);

                /**
                 * 路径
                 * @param src {*} 源文件目录
                 * @param tmp {*} 临时文件目录
                 * @param out {*} 输出文件目录
                 * */
                const dirs = {
                    src : srcLsDir,
                    tmp : path.resolve(__dirname, '..') + '/tmp/' + srcLsName,
                    out : path.resolve(__dirname, '..') + '/' + build.conf[o.env].out + '/' + srcLsName,
                    mods: path.resolve(__dirname, '..') + '/kits'
                };

                // 载入配置文件内容
                build = JSON.stringify(build);

                // 预处理-配置文件里的{item}变量为项目路径
                build = build.replace(/{item}/g, dirs.src);

                build = build.replace(/{mods}/g, dirs.mods);
                /**
                 * 处理标识约定信息
                 * dev 仅在开发环境中使用
                 * pro 仅在生产环境中使用
                 * */
                // 删除当前环境标识
                build = build.replace(new RegExp('[?&]' + o.env, 'g'), '');

                // 删除非当前环境的字段
                build = build.replace(new RegExp('("[^,|[]*[?&][pro|dev][^,]*",?)|(,?"[^,|[]*[?&][pro|dev][^,]*")', 'g'), '');


                // 转为对象
                build = JSON.parse(build);

                // 配置中的文件列表预处理
                let files = build.file;

                /**
                 * 智能处理CONF信息
                 * 自动为每一个未设置自定义conf的file队列项补充conf首选配置
                 *
                 * */
                for (let fileType in files) {
                    if (files.hasOwnProperty(fileType)) {
                        // 文件列表
                        let fileLs = files[fileType];

                        // 遍历文件类型对应的配置
                        let confLs = build.conf[o.env][fileType];
                        confLs.out = dirs.out + '/' + confLs.out;

                        //预处理INS
                        if (fileType === 'html') {
                            files.html.forEach(function (file) {
                                file.ins.forEach(function (ins) {
                                    ins.src.forEach(function (src, i) {
                                        if (!ins.inline) {
                                            if (/.*\.js/.test(src)) {
                                                ins.src[i] = '<script src="' + src + '"></script>';
                                            }
                                            if (/.*\.css/.test(src)) {
                                                ins.src[i] = '<link href="' + src + '" rel="stylesheet">';
                                            }
                                        }
                                    });
                                });
                            });
                        }

                        //预处理HMTL多条拆分
                        for (let i = 0; i < fileLs.length; i++) {
                            // 先存入一个临时变量
                            let srcFiles = fileLs[i];
                            if (srcFiles.src.length > 1) {

                                // 把HTML多个SRC共享CONF的拆分成条记录。
                                if (fileType === 'html') {
                                    // 把src中有多个文件的从列表中删除
                                    fileLs.splice(i, 1);
                                    for (let i = 0; i < srcFiles.src.length; i++) {
                                        let fileSrc  = srcFiles.src[i];
                                        let fileName = srcFiles.name[i];
                                        fileLs.push({
                                            name: fileName,
                                            src : [fileSrc],
                                            ins : srcFiles.ins
                                        });
                                    }
                                }
                            }
                            if (fileType !== 'img' && fileType !== 'media') {
                                // 除了img和media之外的其它类型文件，检查配置记录中的文件是否存在，如果不存在则从记录中删除并打印日志提示。
                                srcFiles.src = srcFiles.src.filter(function (file) {
                                    if (fs.existsSync(file)) {
                                        return file;
                                    } else {
                                        console.log(('ERR: [' + srcLsName + ']  Can\'t find ' + file + '   ✗').red);
                                    }
                                });
                            }

                            // 把src为空的配置记录删除
                            if (srcFiles.src.length === 0) {
                                fileLs.splice(i, 1);
                            }

                        }

                        //闭包预处理CONF
                        (function (fileLs, confLs) {
                            for (let i = 0; i < fileLs.length; i++) {
                                // 遍历中的单条文件记录
                                let file = fileLs[i];

                                // 补充输出配置
                                file.name = file.name ? file.name : file.src[0].replace(/\/.*\//, '');
                                (function () {
                                    for (let typeItem in confLs) {
                                        if (confLs.hasOwnProperty(typeItem)) {

                                            // 如何build.js配置中没有写的配置则补充默认的配置
                                            if (!file.hasOwnProperty(typeItem)) {
                                                file[typeItem] = confLs[typeItem];
                                            }
                                        }
                                    }
                                })(i);
                            }
                        })(fileLs, confLs);

                    }
                }

                // 修改配置的项目名称
                build.info.name = srcLsName;

                // 删除公共配置中不需要的环境配置
                let conf          = build.conf[o.env];
                build.conf        = {};
                build.conf[o.env] = conf;

                // 设置公共配置中的输入路径
                build.conf[o.env].out = dirs.out;
                builds.push(build);

                console.log(('SUC: Build.js configuration file preprocessing completed  ✓').green);
                console.log((''));

                // 将BUILD配置设到全局队列中
                global.taskQueue.push(build);

                // 将一个项目存入全局；
                global.taskItem = build;
                cb && cb(build);

            } else {
                // 打印错误信息
                console.log(('ERR: Use the build () function needs to set the "env" parameter   ✗').red);
                console.log((''));
                return;
            }

        } else {
            // 在src目录下的子文件夹中没有检索到build.js配置文件的文件夹
            // console.log(('ERR: [' + srcLsName + ']   Can\'t find build.js file  ✗').red);
            console.log((''));
        }
    }
    return builds;
};