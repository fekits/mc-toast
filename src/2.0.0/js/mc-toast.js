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
        // console.log('创建一个实例');
        // console.log('↓');
        // console.log('实例ID');
        // console.log('↓');
        this.taskId = McToast.taskId = McToast.taskId ? McToast.taskId + 1 : 1;
        // console.log(this.taskId);
        // console.log('↓');
        // console.log('设置默认属性');
        // console.log('↓');
        this.id     = param.id || `mc-toast-${this.taskId}`;
        this.time   = param.time || '';
        this.icon   = param.icon || 'none';
        this.theme  = param.theme || 'aa';
        this.text   = param.text || '';
        this.status = 'free';
    }

    anim(_then) {
        // 设置显示隐藏标识状态 [跟CSS配合]
        this.code.setAttribute('data-view', this.status);

        // 显示隐藏动画结束后执行事件
        let _animEnd = () => {
            if (this.status === 'hide') {
                // 隐藏后删除DOM
                this.code.remove();
                // 并将实例状态设置为空闲
                this.status = 'free';
            }
            // 动画结束后解绑动画事件防止事件累积
            this.code.removeEventListener(amEnd, _animEnd, false);
            _then && _then();
        };
        // 显示隐藏动画
        this.code.addEventListener(amEnd, _animEnd, false);
    }

    show(showParam = {}) {
        // console.log(this);
        // 设置属性
        for (let key in showParam) {
            if (showParam.hasOwnProperty(key)) {
                this[key] = showParam[key];
            }
        }
        if (this.status === 'free') {
            if (this.text) {
                // 创建一个DOM
                let cDom       = document.createElement('div');
                cDom.innerHTML = `<div id="${this.id}" class="mc-toast" data-icon="${this.icon}" data-theme="${this.theme}"><div class="mc-toast-dim"><div class="mc-toast-content">${this.icon ? '<p class="mc-toast-icon"><b></b></p>' : ''}<p class="mc-toast-text">${this.text}</p></div></div></div>`;
                this.code      = cDom.children[0];
                document.body.appendChild(this.code);

                // console.log('显示提示消息');
                // console.log('↓');
                this.status = 'show';

                // console.log('触发显示过渡动画');
                // console.log('↓');
                this.anim(() => {
                    // 显示后的回调
                    showParam && showParam.on && showParam.on.show && showParam.on.show(this);
                    // 如果设有时间则在指定时间后自动隐藏
                    if (this.time && !isNaN(this.time)) {
                        this.timer = setTimeout(() => {
                            this.hide({
                                on: {
                                    hide() {
                                        // 隐藏后的回调
                                        showParam && showParam.on && showParam.on.hide && showParam.on.hide(this);
                                    }
                                }
                            });
                        }, this.time);
                    }
                });
            }
        } else {
            // 清除上一条的隐藏定时器
            clearTimeout(this.timer);
            // 隐藏上一条并且
            this.hide({
                on: {
                    hide(_this) {
                        // 在隐藏后再显示最新的一条
                        _this.show();
                    }
                }
            });
        }
    }

    hide(hideParam) {
        // console.log('隐藏提示消息');
        // console.log('↓');
        this.status = 'hide';

        // console.log('触发隐藏过渡动画');
        // console.log('↓');
        this.anim(() => {
            // 隐藏后的回调
            hideParam && hideParam.on && hideParam.on.hide && hideParam.on.hide(this);
        });
    }

}

window.fekit ? window.fekit.McToast = McToast : window.fekit = {McToast: McToast};
export default McToast;