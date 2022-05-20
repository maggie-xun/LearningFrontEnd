function fakeNew() {
  let constructor = arguments.splice(0, 1);
  let obj = Object.create(constructor.prototype);
  let res = constructor.apply(obj, arguments);
  return res instanceof object && res != null ? res : obj;
}
