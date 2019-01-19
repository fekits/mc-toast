#MC-RATIO

一个“TOAST”插件，可扩展各种主题样式，目前已有三款主题可用，欢迎使用或开发更多主题。



## 索引
* [演示](#演示)
* [参数](#参数)
* [示例](#示例)
* [版本](#版本)


## 演示
[http://www.junbo.name/plugins/mc-toast/v2.0.0/](http://www.junbo.name/plugins/mc-toast/v2.0.0/)


## 开始

下载项目: 


```git
git clone https://gitlab.com/mcui/plugins/mc-toast.git
```

```
npm i mc-toast

```

## 参数
```
    {
        time  : 3000,                       //  {数字}选填，显示时间,默认为2000
        icon  : type,                       //  {字符}选填，状态类型并显示状态图片有成功success,失败error,警告warning,网络network,加载中loading五种
        text  : '提示文案',                  //  {字符}必填，提示文案 *
        theme : theme,                      //  {字符}必填，主题
        on  : {                             //  {函数}选填，显示和消失时的回调传参中的status可以判断是显示或是消失，code可以对显示出的代码进一步操作.
            show() {
                console.log('出来了〜');
            },
            hide() {
                console.log('消失了〜');
            }
        }
    }
       
```

## 示例

```javascript
import McToast from './mc-toast';

let toast = new McToast({
    theme : 'ac',              // 在这里设置的只是这个实例公共的，在使用时仍然可以在show函数的入参中设置并覆盖掉这里的公共设置
    time  : 3000
});

let oBtn2     = document.getElementById('btn2');
oBtn2.onclick = function () {
    
    // 显示提示消息
    toast.show({
        icon : 'success',                         
        text : '一第操作成功的提示消息',                          
        on : {
            show() {
                console.log('提示消息出来了〜');
            },
            hide() {
                console.log('提示消息消失了〜');
            }
        }
    });
};

// 如果实例公共属性中或show中传入了time则无需手动调用hide方法。但是有时候不能设置时间自动关闭，则不要入参time或time为空，这时我们就需要在合适的时机隐藏它。方法如下：
toast.show({
    time:'',
    icon:'loading',
    text:'等我请求了一个接口并获得数据后再关闭我吧！'
});
// 手动关闭它
toast.hide({
    on:{
        hide(){
            console.log('提示消息消失了〜')
        }
    }
});

```

## 版本
```
v2.0.0 [Latest version]
1. 重构成构造函数，可以new多个实例并设置为不同的主题同时使用。
2. 优化了新提示冲掉上一条提示时的性能与稳定性问题并让冲掉过程动画更平滑
3. 新增了一款主题mc-toast-ac
4. 文字内容入参名称msg改为text
```

```
v1.0.3
1. 废除回调函数then的用法并新增了on事件群。on里面有show及hide回调
```

```
v1.0.2 
1. 此版本除了模块化使用本插件，还将方法挂载在了window下的fekit对象下，除了模块化引用还可以直接用fekit.mcToast方法。
```
```
v1.0.1
1. 此版本精简了代码，取消了onshow和onhide，回调合并为一个then，可以通赤then回调的传参来判断是显示还是消失及其它一些操作。
```
