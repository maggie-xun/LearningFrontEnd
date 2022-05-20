/* 数组扁平化两种思路
1. 递归
2. 使用whle+some实时更改原始数组
 */

function flat() {
  let outputArr = [];
  return function inner(arr) {
    for (let item of arr) {
      if (Array.isArray(item)) {
        inner(item);
      } else {
        console.log(item);
        outputArr.push(item);
      }
    }
    return outputArr;
  };
}
let fun = flat();
console.log(fun([1, 2, [3, 4, [5, 6]]]));
