function subArr(arr, sum) {
  let num = -1;

  let result = arr.reduce((pre, cur, curIndex, arr) => {
    // console.log(pre);
    if (pre == sum) {
      arr.splice(0, curIndex);
      if (num < curIndex) num = curIndex;
      //   console.log(arr);
      return pre;
    } else {
      return pre + cur;
    }
  });
  console.log(num);
  //   console.log(result);
}
subArr([1, 2, 3, 4, 2], 10);
