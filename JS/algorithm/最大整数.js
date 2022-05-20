function func(arr) {
  let result = arr.reduce((pre, cur, curIndex, arr) => {
    let toArr = NumberToArr(cur);
    // console.log(toArr);
    return pre.concat(toArr);
  }, []);
  result.sort((a, b) => a - b);
  let total = result.reduce((pre, cur, curIndex, arr) => {
    return pre + cur * Math.pow(10, curIndex);
  }, 0);
  return total;
  //   console.log(result);
}
let allArr = func([10, 9]);
console.log(allArr);
function NumberToArr(number) {
  let arr = [];
  if (number < 10) return [number];
  arr = arr.concat(Math.floor(number / 10));
  let remain = number % 10;
  if (remain < 10) {
    arr = arr.concat(remain);
  } else {
    return NumberToArr(remain);
  }
  return arr;
}
// console.log(NumberToArr(9));
