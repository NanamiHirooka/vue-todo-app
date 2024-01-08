<template>
  <div v-for="todo in todos" :key="todo.id">
    {{ todo.text }}
    <button @click="deleteTodo(todo.id)">Delete</button>
  </div>
</template>

<script>
export default {
  name: 'TodoList',
  props: [ 'todos' ],
  emits: [ 'delete' ],
  methods: {
    deleteTodo(id) {
      this.$emit('delete', id)
    },
  },
}
</script>
