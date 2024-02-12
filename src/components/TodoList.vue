<template>
  <v-table>
    <tbody>
      <tr v-for="todo in todos" :key="todo.id">
        <td @click="editTodo(todo.id)">
          <div v-if="todo.editing">
            <v-text-field
              v-model="todo.text"
              variant="plain"
              autofocus />
          </div>
          <div v-else>{{ todo.text }}</div>
        </td>
        <td>
          <v-btn
            @click="deleteTodo(todo.id)"
            class="text-red-darken-2">Delete</v-btn>
        </td>
      </tr>
    </tbody>
  </v-table>
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
