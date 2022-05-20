<template>
  <li>
    <input class="toggle"
           :checked='todo.done'
           type="checkbox"
           @change="toggleTodo(todo)">
    <label @dblclick="editing=true">{{todo.text}}</label>
    <button class="destroy"
            @click="deleteTodo( todo )" />
    <input v-show="editing"
           type="text"
           :value="todo.text"
           @keyup.enter="doneEdit">
  </li>
</template>

<script>
export default {
  props: {
    todo: {
      type: Object,
      default: function () {
        return {};
      },
    },
  },
  data() {
    return {
      editing: false,
    };
  },
  methods: {
    toggleTodo(todo) {
      this.$emit("toggleTodo", todo);
    },
    editTodo({ todo, value }) {
      this.$emit("editTodo", { todo, value });
    },
    doneEdit(e) {
      console.log(e.target.value);
      const value = e.target.value.trim();
      const { todo } = this;
      if (!value) {
        console.log();
      } else {
        this.editTodo({ todo, value });
        this.editing = false;
      }
    },
    deleteTodo() {
      this.$emit("deleteTodo", this.todo);
    },
  },
};
</script>