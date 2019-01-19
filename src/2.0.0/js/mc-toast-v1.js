/**
 * 提示消息插件
 *
 * {
 *     time  : time,                       //  {Number}    显示时间
 *     icon  : type,                       //  {String}    状态类型并显示状态图片有成功success,失败error,警告warning,网络network,加载中loading五种
 *     text   : text,                        //  {String}    提示文案
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

let amEnd = (function () {
    let evs = {
        WebkitAnimation: 'webkitAnimationEnd',
        animation      : 'animationend'
    };
    for (let k in evs) {
        if (typeof evs[k] === 'string') {
            return evs[k];
        }
    }
})();

class McToast {
    constructor(param = {}) {
        // 实例数量
        this.task  = McToast.tasks = McToast.tasks ? McToast.tasks + 1 : 1;
        this.id    = param.id || `mc-toast-${this.task}`;
        this.time  = param.time;
        this.icon  = param.icon;
        this.theme = param.theme || 'aa';
        this.text  = param.text || '';

        // 创建节点
        if (this.text) {
            let cDom       = document.createElement('div');
            cDom.innerHTML = `<div id="${this.id}" class="mc-toast" ${this.icon ? 'data-icon=' + this.icon : ''} ${this.theme ? 'data-theme=' + this.theme : ''}><div class="mc-toast-dim"><div class="mc-toast-content">${this.icon ? '<p class="mc-toast-icon"><b></b></p>' : ''}<p class="mc-toast-text">${this.text}</p></div></div></div>`;
            this.code      = cDom.children[0];
            console.log(this.code);

            this.code.addEventListener(amEnd, () => {
                if (this.status === 'show') {
                    console.log(this.status);
                }

                if (this.status === 'hide') {
                    console.log(this.status);
                    this.code.remove();
                }
            });
        }
    }

    init(initParam = {}) {
        this.code.setAttribute('data-view', this.status);

        // 如果设置了显示时间则在设置时间后自动隐藏
        if (this.time) {
            setTimeout(() => {
                this.hide();
            }, this.time);
        }
    }

    // 显示
    show(showParam = {}) {
        for (let key in showParam) {
            if (showParam.hasOwnProperty(key)) {
                console.log(key);
                this[key] = showParam[key];
            }
        }
        console.log(this);
        this.status = 'show';
        document.body.appendChild(this.code);
        this.init();
    }

    // 隐藏
    hide(hideParam = {}) {
        this.status = 'hide';
        this.init();
    }
}

window.fekit ? window.fekit.McToast = McToast : window.fekit = {McToast: McToast};
export default McToast;