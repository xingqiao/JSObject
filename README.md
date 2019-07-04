# JS对象字符串化及解析，支持函数和正则对象

> 支持 AMD、CMD、CommonJs

## 方法定义

```js
/**
 * JS对象字符串化及解析，支持函数和正则对象
 * @namespace JSObject
 */
var JSObject = {
    /**
     * 将js对象转为字符串，支持函数和正则对象
     * @param {object} obj js对象，支持 object、array、string、number、boolean、RegExp、undefined、null
     * @param {number} [space] 空格缩进
     * @returns {string} 格式化的js对象字符串
     */
    stringify,

    /**
     * 将js字符串转换为对象
     * @param {string} str 格式化的js对象字符串
     * @returns {object} js对象
     */
    parse
};
```

## 调用示例

```js
const obj = {
    reg: /./i,
    fun: (...args) => {
        console.log(args);
    }
};

JSObject.stringify(obj);
// "{\n    \"reg\": /./i,\n    \"fun\": (...args) => {\n        console.log(args);\n    }\n}"

```
