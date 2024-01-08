<template>
  <h1>Vue Todo App</h1>
  <div v-for="todo in todos" :key="todo.id">
    {{ todo.text }}
  </div>
</template>

<script>
export default {
  name: 'TodoApp',
  data () {
    return {
      todos: [
        { id: 1, text: 'task1' },
        { id: 2, text: 'task2' },
        { id: 3, text: 'task3' },
      ]
    }
  }
}
</script>
