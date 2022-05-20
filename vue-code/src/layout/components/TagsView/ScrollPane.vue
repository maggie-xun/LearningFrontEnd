<template>
  <el-scrollbar ref="scrollContainer"
                :vertical="false"
                class="scroll-container"
                @wheel.native.prevent="handleScroll">
    <slot />
  </el-scrollbar>
</template>

<script>
export default {
  name: "ScrollPane",
  //   computed: {
  //     scrollWrapper() {
  //       return this.$refs.scrollContainer.$refs.wrap;
  //     },
  //     mounted() {
  //       this.scrollWrapper.addEventListener("scroll", this.emitScroll, true);
  //     },
  //     beforeDestroy() {
  //       this.scrollWrapper.removeEventListener("scroll", this.emitScroll);
  //     },
  //   },
  //   data() {
  //     return {
  //       left: 0,
  //     };
  //   },
  methods: {
    handleScroll() {},
    //   emitScrll() {},
  },
};
</script>

<style lang="scss" scoped>
.scroll-container {
  white-space: nowrap;
  position: relative;
  overflow: hidden;
  width: 100%;
  & ::v-deep {
    .el-scrollbar__bar {
      bottom: 0px;
    }
    .el-scrollbar__view {
      float: left;
    }
    .el-scrollbar__wrap {
      height: 49px;
    }
  }
}
</style>