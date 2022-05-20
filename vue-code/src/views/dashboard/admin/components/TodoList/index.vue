<template>
  <section class="todoapp">
    <header>
      <input class="new-todo"
             type="text"
             placeholder="Todo List"
             @keyup.enter="addTodo">
    </header>
    <section class="main">
      <input id="toggle-all"
             class="toggle-all"
             type="checkbox"
             ::checked="allChecked"
             @change="toggleAll({ done: !allChecked })">
      <label for="toggle-all"></label>
      <ul class="todo-list">
        <TodoItem v-for="(item,index) in filteredTodos"
                  :key="index"
                  :todo="item"
                  @toggleTodo="toggleTodo"
                  @editTodo="editTodo"
                  @deleteTodo="deleteTodo"></TodoItem>
      </ul>
    </section>
    <footer class="footer">
        <span class="todo-count"><strong>{{remaining}}</strong>items left</span>
        <ul class="filters">
            <li v-for='(val,key) in filters' :key="key">
                <a :class="{selected:visibility===key}" @click.prevent="visibility=key">{{key | capitalize}}</a>
            </li>
        </ul>
    </footer>
  </section>
</template>

<script>
import TodoItem from "./TodoItem";
const filters = {
  all: (todos) => todos,
  active: (todos) => todos.filter((todo) => !todo.done),
  completed: (todos) => todos.filter((todo) => todo.done),
};
const defalutList = [
  { text: "star this repository", done: false },
  { text: "fork this repository", done: false },
  { text: "follow author", done: false },
  { text: "vue-element-admin", done: true },
  { text: "vue", done: true },
  { text: "element-ui", done: true },
  { text: "axios", done: true },
  { text: "webpack", done: true },
];
export default {
    filters: {
        capitalize: function(s) {
            return s.charAt(0).toUpperCase()+s.slice(1);
        }
    },
  data() {
    return {
      visibility: "all",
      filters,
      todos: defalutList,
    };
  },
  computed: {
    allChecked() {
      return this.todos.every((todo) => todo.done);
    },
    filteredTodos() {
      return filters[this.visibility](this.todos);
    },
    remaining(){
        return this.todos.filter(item=>!item.done).length
    }
  },
  components: {
    TodoItem,
  },
  methods: {
    addTodo(e) {
      this.todos.push({ text: e.target.value, done: false });
    },
    toggleTodo(val) {
      val.done = !val.done;
      console.log(this.todos);
    },
    toggleAll({ done }) {
      this.todos.map((todo) => (todo.done = done));
    },
    editTodo({ todo, value }) {
      todo.text = value;
    },
    deleteTodo(todo) {
      this.todos.splice(this.todos.indexOf(todo), 1);
    },
  },
};
</script>

<style lang="scss">
@import "./index.scss";
</style>