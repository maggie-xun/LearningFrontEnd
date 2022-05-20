function test() {
  let param = arguments;
  let paramArr;
  paramArr = [...param];
  console.log(paramArr);
}
test(1, 2, 3);
