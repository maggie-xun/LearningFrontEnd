function merge(arr1, arr2) {
  let arr = [],
    i = 0,
    j = 0;
  while (i < arr1.length && j < arr2.length) {
    if (arr1[i] > arr2[j]) {
      arr.push(arr2[j]);
      j++;
    } else {
      arr.push(arr1[i]);
      i++;
    }
  }
  console.log(i);
  console.log(j);
  if (i < arr1.length) {
    return arr.concat(arr1.slice(i));
  } else {
    return arr.concat(arr2.slice(j));
  }
}
console.log(merge([1, 3, 5], [2, 4, 6]));
