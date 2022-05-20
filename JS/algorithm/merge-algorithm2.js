function merge(arr1, arr2) {
  let arr = [];
  while (arr1.length > 0 && arr2.length > 0) {
    if (arr1[0] > arr2[0]) {
      arr.push(arr2.shift());
    } else {
      arr.push(arr1.shift());
    }
  }
  return arr.concat(arr1).concat(arr2);
}

function mergeSort(arr) {
  //   if (arr.length == 1) return arr[0];
  while (arr.length > 1) {
    let arr1 = arr.shift();
    let arr2 = arr.shift();
    let mergeArr = merge(arr1, arr2);
    arr.push(mergeArr);
  }
  return arr[0];
}
console.log(
  mergeSort([
    [1, 3, 6],
    [2, 4, 5],
    [6, 7, 8],
  ])
);
// console.log(merge([1, 3, 6], [2, 4, 5]));
