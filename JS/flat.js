function flat(arr) {
  let resultArr = [];

  for (let i of arr) {
    if (Array.isArray(i)) {
      console.log("iii" + i);
      resultArr = resultArr.concat(flat(i));
    } else {
      resultArr = resultArr.concat(i);
      console.log(i);
    }
  }
  return resultArr;

  //   console.log(resultArr);
}
let arr = [1, 2, 3, [4, [5, 6]]];
console.log(flat(arr));
