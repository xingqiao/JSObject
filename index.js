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
     * 将js对象转为字符串，支持函数和正则对象
     * @param {string} key 
     * @param {object} obj js对象，支持 Object、Array、String、Number、Boolean、RegExp、Date、undefined、null
     * @param {function} replacer 替换函数
     * @param {number} space 当前空格缩进
     * @param {number} spaceUnit 换行增加的空格缩进
     * @returns {string} 格式化的js对象字符串
     */
    function stringify(key, obj, replacer, space, spaceUnit) {
        if (replacer) {
            obj = replacer('' + key, obj);
        }
        if (obj === null) {
            return 'null';
        }
        space = space > 0 ? parseInt(space) : 0;
        var spaceText = getSpaceText(space);
        space += spaceUnit;
        var subSpaceText = getSpaceText(space);
        var type = typeof obj;
        var wrap = spaceUnit > 0 ? '\n' : '';
        if (obj === undefined) {
            return 'undefined';
        } else if (obj instanceof Date) {
            return 'new Date(' + JSON.stringify(obj.toISOString()) + ')';
        } else if (type === 'function' || obj instanceof RegExp) {
            return obj.toString();
        } else if (type !== 'object' || obj instanceof String) {
            return JSON.stringify(obj);
        } else {
            var isArray = Array.isArray(obj);
            var children;
            if (isArray) {
                children = obj.map(function(item, index) {
                    return subSpaceText + stringify(index, item, replacer, space, spaceUnit);
                });
            } else {
                children = [];
                for (const key in obj) {
                    if (obj.hasOwnProperty(key)) {
                        children.push(subSpaceText + JSON.stringify(key) + ':' + (wrap ? ' ' : '') + stringify(key, obj[key], replacer, space, spaceUnit));
                    }
                }
            }
            children = children.length ? wrap + children.join(',' + wrap) + wrap + spaceText : '';
            if (isArray) {
                return '[' + children + ']';
            } else {
                return '{' + children + '}';
            }
        }
    }

    /**
     * JS对象字符串化及解析，支持函数和正则对象
     * @namespace JSObject
     */
    var JSObject = {
        /**
         * 将js对象转为字符串，支持函数和正则对象
         * @param {object} obj js对象，支持 Object、Array、String、Number、Boolean、RegExp、Date、undefined、null
         * @param {function} [replacer] 替换函数
         * @param {number} [space] 空格缩进
         * @returns {string} 格式化的js对象字符串
         */
        stringify: function(obj, replacer, space) {
            replacer = typeof replacer === 'function' ? replacer : null;
            space = space > 0 ? parseInt(space) : 0;
            return stringify('', obj, replacer, 0, space);
        },

        /**
         * 将js字符串转换为对象
         * @param {string} str 格式化的js对象字符串
         * @returns {object} js对象
         */
        parse: function(str) {
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
