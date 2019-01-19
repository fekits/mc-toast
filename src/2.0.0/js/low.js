import mcToast from './mc-toast.low';

// 不想对每个按钮都写一份事件代码，所以直接用把type,time,icon,msg,theme全部用data存在html行间啦。在这里就先取了data数据再弹出提示了。
let btns = document.getElementsByClassName('btn'), btnsLength = btns.length;
for (let i = 0; i < btnsLength; i++) {
    let btn     = btns[i];
    btn.onclick = function () {
        // 把按钮里的自定义数据取出来
        let type  = this.getAttribute('data-toast-type');
        let theme = this.getAttribute('data-toast-theme');
        let msg   = this.getAttribute('data-toast-msg');
        let time  = this.getAttribute('data-toast-time');

        // 调用提示实例
        mcToast({
            time : time,                                       // 显示时间
            icon : type,                                       // 状态类型并显示状态图片有成功success,失败error,警告warning,网络network,加载中loading五种
            msg  : msg,                                        // 提示文案
            theme: theme,                                      // 主题,
            then : function (o) {
                if (o.status === 'show') {
                    console.log('出来了〜');
                }
                if (o.status === 'hide') {
                    console.log('消失了〜');
                }
            }
        });
    };
}