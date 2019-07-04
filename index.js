(function() {
    var spaceMap = {};

    /** 生成指定长度的空字符串 */
    function getSpaceText(size) {
        if (size > 0) {
            if (!spaceMap[size]) {
                spaceMap[size] = Math.pow(10, size)
                    .toString()
                    .slice(1)
                    .replace(/0/g, ' ');
            }
            return spaceMap[size];
        } else {
            return '';
        }
    }

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
        stringify(obj, space) {
            if (obj === null) {
                return 'null';
            }
            space = space > 0 ? parseInt(space) : 0;
            var spaceText = getSpaceText(space);
            space += 4;
            var subSpaceText = getSpaceText(space);
            var type = typeof obj;
            var children;
            if (obj === undefined) {
                return 'undefined';
            } else if (obj instanceof Date) {
                return 'new Date(' + JSON.stringify(obj.toISOString()) + ')';
            } else if (type === 'function' || obj instanceof RegExp) {
                return obj.toString();
            } else if (type !== 'object' || obj instanceof String) {
                return JSON.stringify(obj);
            } else if (Array.isArray(obj)) {
                children = obj.map(function(item) {
                    return subSpaceText + JSObject.stringify(item, space);
                });
                children = children.length ? '\n' + children.join(',\n') + '\n' + spaceText : '';
                return '[' + children + ']';
            } else {
                children = [];
                for (const key in obj) {
                    if (obj.hasOwnProperty(key)) {
                        children.push(subSpaceText + JSON.stringify(key) + ': ' + JSObject.stringify(obj[key], space));
                    }
                }
                children = children.length ? '\n' + children.join(',\n') + '\n' + spaceText : '';
                return '{' + children + '}';
            }
        },

        /**
         * 将js字符串转换为对象
         * @param {string} str 格式化的js对象字符串
         * @returns {object} js对象
         */
        parse(str) {
            return new Function('return (' + str + ')')();
        }
    };

    if (typeof module !== 'undefined' && typeof exports === 'object') {
        module.exports = JSObject;
    } else if (typeof define === 'function' && (define.amd || define.cmd)) {
        define(function() {
            return JSObject;
        });
    } else {
        this.JSObject = JSObject;
    }
}.call(typeof window !== 'undefined' ? window : this));
