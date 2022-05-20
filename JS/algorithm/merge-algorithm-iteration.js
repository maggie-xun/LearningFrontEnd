//迭代算法
function mergePass(
  arr = [],
  temp = new Array(arr.length),
  N = arr.length,
  length = 1
) {
  // 将每个元素看作是相邻的数组长度为1。
  let t; // 迭代深度。
  for (t = 0; Math.pow(2, t) < N; t++, length *= 2) {
    // 每次跳过的长度翻倍。
    const even = t % 2 === 0; // 复用 arr 和 temp 来回赋值。
    for (let left = 0; left < N; left += 2 * length) {
      // 左边数组起始位置 left 从0开始。
      const middle = left + length < N ? left + length : left; // 右边数组起始位置 middle 就是left + 一个数组长度length 但是不要超过 N 。
      const right = left + 2 * length < N ? left + 2 * length : N; // 右边界 right 就是 left + 两个数组长度。
      merge(even ? arr : temp, even ? temp : arr, left, middle, right); // 合并每两个相邻的数组。
    }
  }
  if (t % 2 === 0) {
    return arr; //返回arr
  }
  return temp; // 返回 temp 。
}
function merge(arr, temp, left, middle, right) {
  const leftEnd = middle - 1; // 通过右边数组的起始位置得到左边数组的结束位置。
  while (left <= leftEnd && middle < right) {
    // 如果‘指针’没有越界。
    if (arr[left] > arr[middle]) {
      // 如果左边数组第一个元素比右边数组第一个元素大。
      temp[left + middle - leftEnd - 1] = arr[middle++]; // 将右边数组最小的放入有序数组 temp（初始值为空)。
    } else {
      temp[left + middle - leftEnd - 1] = arr[left++]; // 将左边数组最小的放入有序数组 temp（初始值为空)。
    }
  }
  while (left > leftEnd && middle < right) {
    // 如果左边数组放完了，右边数组还有元素。
    temp[left + middle - leftEnd - 1] = arr[middle++]; // 那么依次将右边数组剩余的元素放入 temp 。
  }
  while (left <= leftEnd && middle >= right) {
    // 如果右边数组放完了，左边数组还有元素
    temp[left + middle - leftEnd - 1] = arr[left++]; // 那么依次将左边数组剩余的元素放入 temp 。
  }
}
