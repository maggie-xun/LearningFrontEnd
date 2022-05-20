<template>
  <div>
    <div class="img"></div>
    <router-view></router-view>
  </div>
</template>

<script>
import './css/index.css';
const addxx = (x, y) => {
  return x + y;
};
const promisedd = new Promise((resolve) => {
  resolve();
});
console.log(promisedd);
console.log(addxx(2, 3));
export default {};
</script>

<style lang="scss" scoped>
</style>