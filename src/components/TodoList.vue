<template>
  <v-table>
    <thead>
      <tr>
        <th>Done</th>
        <th>Todo</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="todo in todos" :key="todo.id" :class="trColor(todo.id)">
        <td>
          <div class="mt-5">
            <v-checkbox
              v-model="todo.done"
            />
          </div>
        </td>
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
  props: {
    todos: Array,
    default: () => []
  },
  emits: [ 'delete', 'edit' ],
  methods: {
    deleteTodo(id) {
      this.$emit('delete', id)
    },
    editTodo(id) {
      this.$emit('edit', id)
    },
    trColor(id) {
      if (!this.todos) return;
      return this.todos.find(todo => todo.id === id).done ? 'bg-grey-lighten-4' : ''
    },
  },
}
</script>
