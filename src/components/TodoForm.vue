<template>
  <form @submit.prevent="addTodo">
    <input v-model="newTodo" type="text" placeholder="Enter a new todo" />
    <button>Add</button>
  </form>
</template>

<script>
export default {
  name: 'TodoForm',
  data() {
    return {
      newTodo: '',
    }
  },
  emits: [ 'add' ],
  methods: {
    addTodo() {
      if (this.newTodo === '') return
      this.$emit('add', this.newTodo)
      this.newTodo = ''
    },
  },
}
</script>
