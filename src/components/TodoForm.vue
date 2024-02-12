<template>
  <v-form>
    <v-container>
      <v-row>
        <v-col cols="6">
          <v-text-field
            v-model="newTodo"
            label="Todo"
            variant="underlined"
          />
        </v-col>
        <v-col>
          <v-btn
            @click="addTodo"
            prepend-icon="$plus"
            size="large"
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
