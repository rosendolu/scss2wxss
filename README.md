## scss2wxss

>  **前提假设：** 已经假设了 对应的wxss 文件和css文件内容上一致，对于不一致的，本方案不适合。

**提示：**笔者出发点在于想在微信小程序中使用scss中的嵌套，变量等功能。解决`BEM`规则下class 一长串的问题。

语法采用的是wxss的规则，请留意 [wxss语法规则](https://developers.weixin.qq.com/miniprogram/dev/framework/view/wxss.html)。

实现原理： 调用node-sass 把sass 文件转为css文件，把css文件`直接`写入到对应目录中的wxss 文件中。因此不能保证完全正确。

### dev

```shell
npm i // 安装依赖
node index.js // 监听文件夹变动并把 scss 转为 wxss
```