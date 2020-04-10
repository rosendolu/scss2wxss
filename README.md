## scss2wxss

> **前提假设：** 已经假设了 对应的 wxss 文件和 css 文件内容上一致，对于不一致的，本方案不适合。

### Getting started

install

```sh
npm i scss-to-wxss -D
```

watch && build

```sh
const wxss = require('scss-to-wxss');
wxss.run();
```

### dev

```shell
npm i
node index.js
```

**提示:** 笔者出发点在于想在微信小程序中使用 scss 中的嵌套，变量等功能。解决 BEM 规则下 class 一长串的问题。语法采用的是 wxss 的规则，请留意 wxss 语法规则。

**实现原理：** 调用 node-sass 把 sass 文件转为 css 文件，把 css 文件直接写入到对应目录中的 wxss 文件中。因此不能保证完全正确。
