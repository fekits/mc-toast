import McToast from './mc-toast';

let toast = new McToast();

let toast2 = new McToast();

// 不想对每个按钮都写一份事件代码，所以直接用把type,time,icon,msg,theme全部用data存在html行间啦。在这里就先取了data数据再弹出提示了。
let btns = document.getElementsByClassName('btn'), btnsLength = btns.length;
for (let i = 0; i < btnsLength; i++) {
    let btn     = btns[i];
    btn.onclick = function () {
        // 把按钮里的自定义数据取出来
        let type  = this.getAttribute('data-toast-type');
        let theme = this.getAttribute('data-toast-theme');
        let msg   = this.getAttribute('data-toast-text');
        let time  = this.getAttribute('data-toast-time');

        // 调用提示实例
        toast.show({
            time : time,                                       // 显示时间
            icon : type,                                       // 状态类型并显示状态图片有成功success,失败error,警告warning,网络network,加载中loading五种
            text : msg,                                        // 提示文案
            theme: theme,                                      // 主题,
            on   : {
                show() {
                    console.log('出来了〜');

                    if (!time) {
                        console.log('这个没有设置定时，手动关闭');
                        // setTimeout(() => {
                        //     toast.hide({
                        //         on: {
                        //             hide() {
                        //                 console.log('这个是手动关闭');
                        //             }
                        //         }
                        //     });
                        // }, 5000);
                    }

                },
                hide() {
                    console.log('隐藏了〜');
                }

            }

        });
    };
}
