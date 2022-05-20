function timeTransfer(time) {
  console.log(time);
  let now = Date.now();
  let seconds = (now - time) / 1000;
  console.log(seconds);
  if (seconds < 60) {
    console.log(`￥{seconds}秒前`);
  } else if (60 < seconds && seconds < 60 * 60) {
    console.log(60 < seconds < 60 * 60);
    console.log(`${seconds / (60 * 60)}分钟前`);
  } else if (60 * 60 < seconds && seconds <= 60 * 60 * 24) {
    console.log(`${seconds / (60 * 60 * 24)}小时前`);
  } else if (60 * 60 * 24 < seconds && seconds < 60 * 60 * 24 * 30) {
    console.log(`${seconds / (60 * 60 * 24 * 30)}天`);
  }
}
let oldDate = new Date();
oldDate.setDate(oldDate.getDate() - 1);
console.log(oldDate);
timeTransfer(oldDate);
