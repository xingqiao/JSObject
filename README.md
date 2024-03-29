# JS对象字符串化及解析，支持函数和正则对象

[![NPM Version](https://img.shields.io/npm/v/js-object-stringify.svg?style=flat-square)](https://www.npmjs.com/package/js-object-stringify)
[![NPM Downloads](https://img.shields.io/npm/dm/js-object-stringify.svg?style=flat-square)](https://www.npmjs.com/package/js-object-stringify)

## 安装

```bash
$ npm i -S js-object-stringify
```

## 特性说明

支持 AMD、CMD、CommonJs 方式引入

使用方法和 `JSON.stringify()` 一致

支持的特殊类型包括
- Function
- RegExp
- Date
- undefined

其余类型会默认调用 `JSON.stringify()` 方法完成字符串化

## 方法定义

```js
/**
 * JS对象字符串化及解析，支持函数、正则对象和日期对象
 * @namespace JSObject
 */
var JSObject = {
    /**
     * 将js对象转为字符串，支持函数和正则对象
     * @param {object} obj js对象，支持 object、array、string、number、boolean、RegExp、Date、undefined、null
     * @param {function} [replacer] 替换函数
     * @param {number} [space] 空格缩进
     * @returns {string} 格式化的js对象字符串
     */
    stringify(value[, replacer [, space]]),

    /**
     * 将js字符串转换为对象
     * @param {string} str 格式化的js对象字符串
     * @returns {object} js对象
     */
    parse(str)
};
```

## 调用示例

```js
const JSObject = require('js-object-stringify');

const obj = {
    reg: /./i,
    date: new Date('1990-11-10T03:42:00.000Z'),
    fun: (...args) => {
        console.log(args);
    }
};

JSObject.stringify(obj, null, 4);
// "{\n    \"reg\": /./i,\n    \"date\": new Date(\"1990-11-10T03:42:00.000Z\"),\n    \"fun\": (...args) => {\n        console.log(args);\n    }\n}"

```
