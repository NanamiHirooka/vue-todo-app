<template>
  <v-form>
    <v-container class="ma-0">
      <v-row align-content="center">
        <v-col cols="4">
          <v-text-field
            v-model="newTodo"
            label="Todo"
            variant="underlined"
          />
        </v-col>
        <v-col cols="8" align-self="center">
          <v-btn
            @click="addTodo"
            prepend-icon="$plus"
            variant="flat"
            class="text-blue-darken-2"
          >Add</v-btn>
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
