const { types } = require("util");

function myTypeof(type) {
    let typeValue = typeof type;
    const toStr = Object.prototype.toString;
    const typeObj = { 'object Array': 'Array', 'object String': 'String', 'object Number': 'Number', 'object Object': 'object', 'object Boolean': 'boolean' }
    if (typeValue == null) return 'null';
    else if (typeValue == 'object') {
        let typeStr = toStr.call(typeValue);
        return typeObj[typeStr]
    } else {
        return typeValue
    }

}