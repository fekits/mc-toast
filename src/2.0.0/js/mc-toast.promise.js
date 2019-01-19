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

class McToastPromise {
    constructor(param = {}) {
        // 实例数量
        this.task  = McToastPromise.tasks = McToastPromise.tasks ? McToastPromise.tasks + 1 : 1;
        this.id    = param.id || `mc-toast-${this.task}`;
        this.time  = param.time;
        this.icon  = param.icon || 'none';
        this.theme = param.theme || 'aa';
        this.msg   = param.msg || '';

        // 创建节点
        if (this.msg) {
            this.code           = document.createElement('div');
            this.code.id        = this.id;
            this.code.className = 'mc-toast';

            let conf = {icon: this.icon, theme: this.theme};
            for (let k in conf) {
                this.code.setAttribute('data-' + k, conf[k]);
            }

            let iconDom         = this.icon ? '<p class="mc-toast-icon"><b></b></p>' : '';
            this.code.innerHTML = '<div class="mc-toast-dim"><div class="mc-toast-content">' + iconDom + '<p class="mc-toast-msg">' + this.msg + '</p></div></div>';

            this.code.addEventListener(amEnd, () => {
                if (this.huanghao === 'show') {
                    // this.code.remove();
                    this.resolve();
                    this.resolve = null;
                }
            });
        }
    }

    init(initParam = {}) {
        this.code.setAttribute('data-view', initParam.status);
        console.error(initParam.status);

        // 如果设置了显示时间则在设置时间后自动隐藏
        if (this.time) {
            setTimeout(() => {
                this.hide();
            }, this.time);
        }
    }

    // 显示
    show(showParam = {}) {
        this.huanghao = 'show';
        this.code.setAttribute('data-view', 'show');
        document.body.appendChild(this.code);
        return new Promise(resolve =>{
            this.resolve = resolve;
        });


        // setTimeout(() => {
        //     this.init({
        //         status: 'show',
        //         then  : () => {
        //             showParam && showParam.then && showParam.then({status: 'show', code: this.code});
        //         }
        //     });
        // }, 100);
    }

    // 隐藏
    hide(hideParam) {
        this.init({
            status: 'hide',
            then  : () => {
                hideParam && hideParam.then && hideParam.then({status: 'hide', code: this.code});
            }
        });
    }
}

window.fekit ? window.fekit.McToast = McToastPromise : window.fekit = {McToast: McToastPromise};
export default McToastPromise;