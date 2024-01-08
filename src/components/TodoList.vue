<template>
  <div class="todo-list">
    <div
      v-for="todo in todos" :key="todo.id" class="todo-item">
      <div v-if="todo.editing">
        <input type="text" v-model="todo.text" />
      </div>
      <div v-else>{{ todo.text }}</div>
      <button @click="editTodo(todo.id)">{{ changeButtonText(todo) }}</button>
      <button @click="deleteTodo(todo.id)">Delete</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TodoList',
  props: [ 'todos' ],
  emits: [ 'delete', 'edit' ],
  methods: {
    deleteTodo(id) {
      this.$emit('delete', id)
    },
    editTodo(id) {
      this.$emit('edit', id)
    },
    changeButtonText(todo) {
      return todo.editing ? 'Save' : 'Edit'
    },
  },
}
</script>

<style>
  .todo-list {
    margin-top: 20px;
  }
  .todo-item {
    display: flex;
  }
</style>
