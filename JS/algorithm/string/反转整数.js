function reverse(num) {
  let numStr = num.toString().split("");

  //负数
  numStr =
    num > 0
      ? parseInt(numStr.reverse().join(""))
      : 0 - parseInt(numStr.slice(1).reverse().join(""));
  return numStr;
}
console.log(reverse(-123));
