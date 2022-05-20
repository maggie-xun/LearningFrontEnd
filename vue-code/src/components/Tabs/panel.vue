<template>
  <div class="pane"
       v-if="show">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'panel',
  props: {
    name: {
      type: String,
    },
    label: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      show: true,
    };
  },
  mounted() {
    console.log(3);
    this.updateNav();
  },
  watch: {
    // label(newValue, oldValue) {
    //   this.updateNav();
    // },
  },
  methods: {
    updateNav() {
      this.$parent.updateNav();
    },
  },
};
</script>

<style lang="scss" scoped>
</style>