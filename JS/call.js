function myCall() {
  let context = Array.prototype.splice(arguments, 0, 1);

  const o = context == undefined ? window : Object(context);
  const key = Symbol();

  o[key] = this;
  let res = o[key](...arguments);
  delete o[key];
  return res;
}

//fn.bind(this,[1,2,3])
let obj = { a: 2, b: 4 };
function add(a, b) {
  return a + b;
}
Function.prototype.myBind = function (_this, ...args) {
  let thisFn = this;
  let argsOuter = Array.prototype.slice(args);
  let fn = function () {
    let innerArgs = Array.prototype.slice(arguments);
    const isNew = this instanceof fn; //this 是否是fn的示例，也就是返回的fn是否通过new调用
    const context = isNew ? this : Object(_this);
    return fn.apply(context, argsOuter.concat(innerArgs));
  };
  fn.prototype = Object.create(thisFn.prototype);
  return fn;
};
let fnbind = add.myBind(obj);
fnbind();
