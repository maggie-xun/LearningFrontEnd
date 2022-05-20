<template>
  <div>
    <button :data-index="index"
            :class="['button',{'positive':currentIndex==index}]"
            :currentIndex="currentIndex"></button>
  </div>
</template>

<script>
export default {
  name: "tab",
  props: ["index", "currentIndex"],
  data() {
    return {};
  },
  mounted() {
    console.log(this.currentIndex);
    console.log(this.index);
  },
};
</script>

<style lang="css" scoped>
.button {
  height: 50px;
  width: 40px;
}
.positive {
  background-color: red;
}
</style>