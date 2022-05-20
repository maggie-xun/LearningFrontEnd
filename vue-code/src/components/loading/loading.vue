<template>
  <div v-show='show'
       class="loading_wrapper">
    <p>loading...</p>
  </div>
</template>

<script>
export default {
  name: "loading",
  data() {
    return {
      show: false,
    };
  },
  props: {
    // show: {
    //   type: Boolean,
    //   default: false,
    // },
  },
  created() {
    // setTimeout(() => {
    //   this.show = false;
    // }, 5000);
  },
};
</script>

<style lang="scss" scoped>
.loading_wrapper {
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #e3e3e3;
}
</style>