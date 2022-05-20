const mapTag = '[object Map]';
const setTag = '[object Set]';
const arrayTag = '[object Array]';
const objectTag = '[object Object]';

const boolTag = '[object Boolean]';
const dateTag = '[object Date]';
const errorTag = '[object Error]';
const numberTag = '[object Number]';
const regexpTag = '[object RegExp]';
const stringTag = '[object String]';
const symbolTag = '[object Symbol]';
const deepTag = [mapTag, setTag, arrayTag, objectTag]

function deepClone(value, map = new WeakMap()) {
    if (!isObject) {//原始数据类型
        return value
    }

    const type = getType(value);
    if (deepTag.includes(type))
        cloneTarget = getInit(target, type);

    if (map.get(target))
        return map.get(target)
    map.set(target, cloneTarget)

    //复制set
    if (type == setTag) {
        target.forEach(value => {
            cloneTarget.add(clone(value, map))
        });
        return cloneTarget
    }

    //复制map
    if (type == mapTag) {
        target.forEach(value => {
            cloneTarget.set(key, clone(value, map))
        })
        return cloneTarget
    }

    //复制对象或数组
    const keys = Array.isArray(target) ? undefined : Object.keys(target);
    forEach(keys || target, (value, key) => {
        if (keys) key = value;
        cloneTarget[key] = clone(target[key], map)
    });

    return cloneTarget

}
function isObject(target) {
    const type = typeof target;
    return target != null && (target === 'object' || target === 'function');
}
function getType(target) {
    return Object.prototype.toString.call(target)
}
function forEach(array, iteratee) {
    let index = -1;
    const length = array.length;
    while (++index < length) {
        iteratee(array[index], index);
    }
    return array;
}
function getInit(target) {
    const Ctor = target.constructor;
    return new Ctor();
}

Array.prototype.myPush = function () {
    for (let i = 0; i < arguments.length; i++) {
        this[this.length] = arguments[i]
    }
    return this.length
}

Array.prototype.myUnshift = function () {
    // this.splice(this.length,0,value)
    this.splice(0, 0, ...arguments)
}