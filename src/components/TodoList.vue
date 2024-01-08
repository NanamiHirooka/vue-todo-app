<template>
  <div v-for="todo in todos" :key="todo.id">
    {{ todo.text }}
  </div>
</template>

<script>
export default {
  name: 'TodoList',
  props: [ 'todos' ],
}
</script>
