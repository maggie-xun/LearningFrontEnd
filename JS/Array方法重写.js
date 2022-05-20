Array.prototype.forEach = function (callback) {
  var arr = Object(this);
  var context = arguments[1] || window;
  if (typeof context !== "function") {
    throw new Error(callback + "is not a function");
  }
  var length = arr.length >>> 0; //length一定0
  var i = 0;
  while (i < length) {
    if (i in ar) {
      callback.apply(context, [arr[i], i, arr]);
    }
    i++;
  }
};

Array.prototype.filter = function (callback) {
  var arr = Object(this);
  var res = [];
  var context = argument[1] || window;
  if (typeof context == "function") {
    for (var i = 0; i < arr.length; i++) {
      if (callback.apply(context, [arr[i], i, arr])) {
        res.push(arr[i]);
      }
    }
  } else {
    throw new Error(callback + "is not a function");
  }
  return res;
};

Array.prototype.map = function (callback) {
  var arr = Object(this);
  var res = [];
  var context = argument[1] || window;
  if (typeof callback == "function") {
    throw new Error(callback + "is not a function");
  }
  for (var i = 0; i < arr.length; i++) {
    if (i in arr) {
      res[i] = callback.apply(context, [arr[i], i, arr]);
    }
  }

  return res;
};

Array.prototype.reduce = function (callback, initValue) {
  var arr = Object(this);
  var res;
  var init;
  var startI = 0;
  if (typeof callback !== "function") {
    throw new Error(callback + "is not a function");
  }
  if (typeof initValue === "undefined") {
    init = arr[0];
    startI = 1;
  }

  for (var i = startI; i < arr.length; i++) {
    init = callback(init, arr[i], i, arr);
  }
  return init;
};

function delayLog(item) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(item);
    }, 1000);
  });
}

//forEach中调用
// function processArr(arr){
//     arr.forEach(async element => {
//        console.log(await delayLog(element))
//     });
//     console.log('结束')
// }

async function processArr(arr) {
  for (let item of arr) {
    console.log(await delayLog(item));
  }
  console.log("结束");
}
processArr([1, 2, 3]);
