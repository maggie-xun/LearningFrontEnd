function unique1(arr) {
  return [...new Set(arr)];
}

function unique2(arr) {
  var obj = {};
  return arr.filter((ele) => {
    if (!obj[ele]) {
      obj[ele] = true;
      return true;
    }
  });
}
