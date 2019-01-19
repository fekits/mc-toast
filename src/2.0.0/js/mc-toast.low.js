/**
 * 提示消息插件
 *
 * {
 *     time  : time,                       //  {Number}    显示时间
 *     icon  : type,                       //  {String}    状态类型并显示状态图片有成功success,失败error,警告warning,网络network,加载中loading五种
 *     msg   : msg,                        //  {String}    提示文案
 *     theme : theme,                      //  {String}    主题
 *     then  : function (o) {              //  {Function}  显示和消失时的回调传参中的status可以判断是显示或是消失，code可以对显示出的代码进一步操作.
 *         if (o.status === 'show') {
 *             console.log('出来了〜');
 *         }
 *         if (o.status === 'hide') {
 *             console.log('消失了〜');
 *         }
 *     }
 *  }
 *
 *  当前版本: v1.0.1
 *
 *  更新说明:
 *  此版本精简了代码，取消了onshow和onhide，回调合并为一个then，可以通赤then回调的传参来判断是显示还是消失及其它一些操作。
 *
 * */

let mcToast = function (o) {
    let conf  = {dim: o.dim || 'false', icon: o.icon || 'none', theme: o.theme || 'aa'};
    if (o && o.msg) {
        let oToast = document.getElementsByClassName('mc-toast');
        for (let i = 0; i < oToast.length; i++) {
            document.body.removeChild(oToast[i]);
        }
        let code       = document.createElement('div');
        code.id        = conf.id || '#mc-toast';
        code.className = 'mc-toast';
        for (let k in conf) {
            code.setAttribute('data-' + k, conf[k]);
        }
        let iconDom    = o.icon ? '<p class="mc-toast-icon"><b></b></p>' : '';
        code.innerHTML = '<div class="mc-toast-dim"><div class="mc-toast-content">' + iconDom + '<p class="mc-toast-msg">' + o.msg + '</p></div></div>';
        document.body.appendChild(code);
        setTimeout(function () {
            document.body.removeChild(code);
            o.then()
        }, o.time || 2000);
    }
};

window.fekit ? window.fekit.mcToast = mcToast : window.fekit = {mcToast: mcToast};
module.exports = mcToast;