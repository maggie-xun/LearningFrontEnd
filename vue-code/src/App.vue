<template>
  <div id="app">
    <!-- <router-view /> -->
    <!-- <span class="comment">利用这个样式可以把可点区域扩大为40px宽，高度原理一样</span> -->
    <!-- <slotCom></slotCom> -->
    <!-- <number-input :value="value"
                  :max="max"
                  :min="min"></number-input>
    <button @click="changeValue">9</button> -->
    <!-- <Tabs v-model="activeTab">
      <Panel name="1"
             label="tab1">1111</Panel>
      <Panel name="2"
             label="tab2">222</Panel>
      <Panel name="3"
             label="tab3">333</Panel>
    </Tabs> -->
    <About></About>

  </div>
</template>
<script>
// import slotCom from './views/slot/slot-parent.vue';
// import NumberInput from './components/NumberInput/index.vue';
// import Tabs from './components/Tabs';
// import Panel from './components/Tabs/panel.vue';
// // import About from './About.vue';
import About from './views/About.vue';

export default {
  components: {
    // slotCom,
    // NumberInput,
    // Tabs,
    // Panel,
    About,
  },
  data() {
    return {
      value: 0,
      min: 0,
      max: 10,
      activeTab: '1',
    };
  },
  methods: {
    // changeValue() {
    //   this.value = 's';
    // },
  },
};
</script>
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

.comment:before {
  content: '<span class="string">""</span>';
  display: block;
  position: absolute;
  width: '<span class="number">40</span>px';
  left: '<span class="number">50</span>%';
  margin-left: '-<span class="number">20</span>px';
  top: '<span class="number">0</span>';
  height: '<span class="number">50</span>px;   <span class="comment">//随便</span>';
}
</style>
