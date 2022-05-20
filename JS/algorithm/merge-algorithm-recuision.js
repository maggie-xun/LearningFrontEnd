//递归
function merge_sort(arr) {
  if (arr.length == 1) {
    return arr;
  }
  let middle = Math.floor(arr.length / 2),
    left = arr.slice(0, middle),
    right = arr.slice(middle);
  return merge(merge_sort(left), merge_sort(right));
}

function merge(arr1, arr2) {
  let result = [];
  while (arr1.length > 0 && arr2.length > 0) {
    if (arr1[0] > arr2[0]) {
      result.push(arr2.shift());
    } else {
      result.push(arr1.shift());
    }
  }

  return result.concat(arr1).concat(arr2);
}

console.log(merge_sort([1, 3, 2, 6, 4]));
