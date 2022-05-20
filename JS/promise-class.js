class myPromise {
  constructor(executor) {
    this.state = "pending";
    this.value = undefined;
    this.reason = undefined;
    this.onResolvedCallbacks = [];
    this.onRejectedCallbacks = [];
    try {
      //   console.log(this.value);
      executor(this.resolve.bind(this), this.reject.bind(this));
    } catch (err) {
      this.reject(err);
    }
  }
  resolve(value) {
    if (this.state != "pending") return;
    this.state = "resolved";
    this.value = value;
    this.onResolvedCallbacks.forEach((fn) => fn());
    //this.onResolvedCallbacks.shift()(this.value);
  }
  reject(reason) {
    if (this.stateQ != "pending") return;
    this.state = "rejected";
    this.reason = reason;
    //this.onResolvedCallbacks.shift()(this.reason);
    this.onRejectedCallbacks.forEach((fn) => fn());
  }
}

myPromise.prototype.then = function (onFulfilled, onRejected) {
  return new myPromise((resolve, reject) => {
    let x;
    onFulfilled =
      typeof onFulfilled == "function" ? onFulfilled : (value) => value;
    onRejected =
      typeof onRejected == "function?"
        ? onRejected
        : (reason) => {
            throw reason;
          };

    var thenPromise = new myPromise((resolve, reject) => {
      const resolvePromise = (cb) => {
        setTimeout(() => {
          try {
            const x = cb(this.value);
            if (x === thenPromise) {
              throw new Error("不能返回自身。。。");
            }
            if (x instanceof myPromise) {
              x.then(resolve, reject);
            } else {
              resolve(x);
            }
          } catch (err) {
            reject(err);
            throw new Error(err);
          }
        });
      };

      if (this.state === "resolved") {
        resolvePromise(onFulfilled);
      }
      if (this.state === "rejected") {
        resolvePromise(onRejected);
      }
      if (this.state === "pending") {
        this.onRejectedCallbacks.push(() => {
          resolvePromise(onFulfilled(this.value));
        });
        this.onRejectedCallbacks.push(() => {
          resolvePromise(onRejected(this.reason));
        });
      }
    });
  });
};

const xun = new myPromise((resolve, reject) => {
  resolve(1);
  //   console.log(3);
}).then((res) => {
  console.log(res);
});
console.log(2);
