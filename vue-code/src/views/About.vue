<template>
  <div class="about">
    <div @click="addItems">Add</div>
    <div><input v-model="inputContent" /></div>
    <div v-for="item in items"
         :key="item.id">
      <span>{{item.content}}</span>
      <button @click="changeStatus(item)">{{item.isDone?'complete':'onprogress'}}</button>
      <button @click="delItem(item)">删除</button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      items: [],
      inputContent: '',
    };
  },
  methods: {
    addItems() {
      let leng = this.items.length;
      this.items.push({
        id: this.leng++,
        content: this.inputContent,
        isDone: false,
      });
    },
    delItem(item) {
      let thisItem = this.items.findIndex((innerItem) => {
        innerItem.id == item.id;
      });
      this.items.splice(thisItem, 1);
    },
    changeStatus(item) {
      item.isDone = !item.isDone;
    },
  },
};
</script>
