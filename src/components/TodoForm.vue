<template>
  <v-form>
    <v-container class="ma-0">
      <v-row align-content="center">
        <v-col cols="4">
          <v-text-field
            v-model="newTodo"
            label="Todo"
            append-inner-icon="$plus"
            @click:append-inner="addTodo"
          />
        </v-col>
      </v-row>
    </v-container>
  </v-form>
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
