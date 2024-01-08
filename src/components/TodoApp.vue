<template>
  <h1>Vue Todo App</h1>
  <TodoForm @add="addTodo" />
  <TodoList :todos="todos" @delete="deleteTodo" />
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
      todos: [],
    }
  },
  methods: {
    addTodo(newTodo) {
      this.todos.push({
        id: this.todos.length + 1,
        text: newTodo})
    },
    deleteTodo(id) {
      this.todos = this.todos.filter(todo => todo.id !== id)
    },
  },
}
</script>
