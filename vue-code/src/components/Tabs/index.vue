<template>
  <div>
    <div class="tabs-bar">
      <div class="tab"
           :class="tabCls(item)"
           v-for="item in navList"
           :key="item.name"
           @click="handleChange(item)">
        {{item.label}}</div>
    </div>
    <div class="tabs-content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: [String, Number],
    },
  },
  data() {
    return {
      navList: [],
      currentValue: this.value,
    };
  },
  mounted() {},
  methods: {
    updateNav() {
      console.log(2);
      this.navList = [];
      this.getTabs().forEach((element, index) => {
        this.navList.push({
          name: element.name || index,
          label: element.label,
        });
      });
      this.updateStatus();
    },
    getTabs() {
      // console.log(this.$children);
      // console.log(1);
      return this.$children.filter(function (item) {
        return item.$options.name === 'panel';
      });
    },
    updateStatus() {
      let tabs = this.getTabs();
      tabs.forEach((tab) => {
        tab.show = tab.name === this.currentValue;
      });
    },
    handleChange(item) {
      this.currentValue = item.name;
    },
    tabCls(item) {
      if (item.name == this.currentValue) {
        return 'active-tab';
      }
    },
  },
  watch: {
    currentValue(newValue, oldValue) {
      this.updateStatus();
    },
    value(value) {
      this.currentValue = value;
    },
  },
};
</script>

<style lang="scss" scoped>
.tabs-bar {
  display: flex;
}
.active-tab {
  background: red;
}
</style>