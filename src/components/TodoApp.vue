<template>
  <v-app>
    <v-app-bar elevation="1">
      <v-app-bar-title>Vue Todo App</v-app-bar-title>
    </v-app-bar>
    <TodoForm class="mt-16" @add="addTodo" />
    <TodoList :todos="todos" @edit="editTodo" @delete="deleteTodo" />
  </v-app>
</template>

<script>
import TodoForm from './/TodoForm.vue'
import TodoList from './/TodoList.vue'

export default {
  name: 'TodoApp',
  components: {
    TodoForm,
    TodoList,
  },
  data() {
    return {
      todos: [
        { id: 1, text: 'Learn Vue', editing: false },
        { id: 2, text: 'Learn Vuex', editing: false },
        { id: 3, text: 'Learn Vue Router', editing: false },
      ],
    }
  },
  methods: {
    addTodo(newTodo) {
      this.todos.push({
        id: this.todos.length + 1,
        text: newTodo,
        editing: false,})
    },
    deleteTodo(id) {
      this.todos = this.todos.filter(todo => todo.id !== id)
    },
    editTodo(id) {
      this.todos = this.todos.map(todo =>
        todo.id === id ? { ...todo, editing: !todo.editing } : todo
      )
    },
  },
}
</script>
