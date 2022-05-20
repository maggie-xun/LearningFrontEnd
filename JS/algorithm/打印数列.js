function printNum(n) {
  let totalNum = (n * (n + 1)) / 2;
  for (let i = 1; i <= n; i++) {
    let row = "";
    let lastNum = (i * (i + 1)) / 2;
    if (lastNum == 1) {
      console.log(1 + "***");
      continue;
    }
    let startNum = lastNum - i + 1;
    if (i % 2 != 0) {
      for (let j = startNum; j <= lastNum; j++) {
        row = row + j + "***";
      }
    }
    if (i % 2 == 0) {
      for (let j = lastNum; j >= startNum; j--) {
        row = row + j + "***";
      }
    }
    console.log(row);
  }
}
printNum(6);
