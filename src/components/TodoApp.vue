<template>
  <v-app color="bgcolor">
    <v-app-bar
        :elevation="0"
        color="transparent"
        class="ml4 index10000"
    >
      <v-app-bar-nav-icon
        rounded="circle"
        :ripple="false" 
        @click.stop="drawer = !drawer"
      ></v-app-bar-nav-icon>
      <v-avatar
        class="ml-3"
      >
        <v-img
          width="10"
          src="https://hiyokoyarou.com/wp-content/uploads/2020/10/shiba-dog.png"
        >
        </v-img>
      </v-avatar>
      <v-toolbar-title>カレンダー</v-toolbar-title>
    </v-app-bar>
    <!-- <div class="d-flex"> -->
      <v-navigation-drawer
        class="border-0 pl-4"
        app
        v-model="drawer"
        width="300"
      >
        <v-btn
          prepend-icon="mdi-plus"
          size="x-large"
          elevation="4"
          :ripple="false"
          rounded="lg"
          class="ma-3"
          :height="h-25"
          @click="addTaskDialogOpen = true"
        >
          作成
        </v-btn>
        <v-list density="compact" class="mb-0">
          <v-list-item
            v-for="(item, i) in items"
            :key="i"
            :value="item"
            color="primary"
            class="h-25"
            rounded="xl"
          >
            <template v-slot:prepend>
              <v-icon :icon="item.icon"></v-icon>
            </template>
            <v-list-item-title v-text="item.text"></v-list-item-title>
          </v-list-item>

          <v-list-item
            :ripple="false"
            variant="plain"
            :append-icon="chevron"
            title="リスト"
            @click="open = !open"
            :active="false"
          ></v-list-item>

          <v-list density="compact" class="mb-0" v-if="open">
            <v-list-item
              v-for="(list, i) in lists"
              :key="i"
              :value="list"
              color="primary"
              class="h-25"
              rounded="xl"
            >
              <template v-slot:prepend>
                <v-checkbox-btn
                  :ripple="false"
                  :hide-details="true"
                  density="compact"
                  class="h-25 mr-2"
                  v-model="list.displayable"
                ></v-checkbox-btn>
              </template>
              <v-list-item-title v-text="list.title"></v-list-item-title>
            </v-list-item>
          </v-list>

          <v-list-item
            color="primary"
            class="h-25"
            prepend-icon="mdi-plus"
            rounded="xl"
            title="新しいリストを作成"
            @click="addListDialogOpen = true"
          >
          </v-list-item>
          
        </v-list>
      </v-navigation-drawer>

      <!-- タスク表示 -->
      <v-main
      >
        <v-container>
          <template class="d-flex">
            <v-card
              v-for="(list, i) in filteredlists"
              :key="i"
              :width="400"
              :min-height="400"
              rounded="xl"
              class="mr-3 pa-3"
              hover
              :title="list.title"
            >
              <v-list density="compact">
                <v-list-item
                  color="primary"
                  class="h-25"
                  rounded="xl"
                  prepend-icon="mdi-checkbox-marked-circle-plus-outline"
                  title="タスクを追加"
                  @click="addTask(list.id)"
                >
                </v-list-item>
              </v-list>

              <v-list>
                <v-list-item
                  v-for="(task, i) in filteredTasks(list.id)"
                  :key="i"
                  :value="task"
                  color="primary"
                >
                  <template v-slot:prepend v-if="!task.editing">
                    <v-checkbox-btn
                      :ripple="false"
                      :hide-details="true"
                      density="compact"
                      class="h-25 mr-2"
                      v-model="task.done"
                    ></v-checkbox-btn>
                  </template>
          
                  <div @click="task.editing = !task.editing">
                    <v-list-item-title
                      v-if="!task.editing"
                      v-text="task.title"
                    ></v-list-item-title>

                    <v-text-field
                      v-else
                      v-model="task.title"
                      density="compact"
                      hide-details
                      :autofocus="true"
                    ></v-text-field>
                  </div>
  
                </v-list-item>
              </v-list>
            </v-card>
          </template>
        </v-container>
      </v-main>
    <!-- </div> -->

    <!-- タスク追加ダイアログ -->
    <v-dialog
       v-model="addTaskDialogOpen"
       max-width="650"
       rounded="xl"
       scrollable
     >
      <v-card
        class="pa-12"
        height="500"
      >
        <v-card-title
           class="d-flex justify-space-between align-center"
        >
          <div class="text-h5 text-medium-emphasis ps-2"></div>
          <v-btn
            icon="mdi-close"
            variant="text"
            @click="addTaskDialogOpen = false"
          ></v-btn>
        </v-card-title>
        <v-text-field
          placeholder="タイトルを追加"
          variant="underlined"
          required
          v-model="newTaskTitle"
        ></v-text-field>
        
        <div class="d-flex flex-row">
          <v-date-input
            prepend-icon="mdi-clock-outline"
            v-model="newTaskDate"
            label="Select a date"
            max-width="368"
            class="ma-5"
            density="compact"
          ></v-date-input>
          
          <v-select
            :items="dateOptions"
            v-model="newTaskTime"
            class="ma-5"
            density="compact"
          ></v-select>
        </div>

        <v-select
          :items="lists"
          v-model="newTaskList"
          prepend-icon="mdi-list-box-outline"
          item-value="id"
          item-text="title"
          class="ma-5"
          density="compact"
        ></v-select>

        <v-card-actions>
          <v-btn
          @click="addTask()"
          size="large"
          rounded="xl"
          :disabled="taskBtnDisabled"
          >保存</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- リスト追加ダイアログ -->
     <v-dialog
       v-model="addListDialogOpen"
       max-width="350"
       rounded="xl"
     >
      <v-card
        title="新しいリストを作成"
        class="pa-5"
      >
        <v-text-field
          placeholder="名前を入力してください"
          class="mt-5"
          v-model="newListTitle"
          focused
        ></v-text-field>

        <v-card-actions>
          <v-btn
            @click="addListDialogOpen = false"
            size="large"
            rounded="xl"
          >キャンセル</v-btn>
          <v-btn
            @click="addList"
            size="large"
            rounded="xl"
          >完了</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script>
export default {
  name: 'TodoApp',
  data() {
    return {
      todos: [],
      drawer: true,
      open: true,
      addListDialogOpen: false,
      addTaskDialogOpen: false,
      items: [
        { icon: 'mdi-checkbox-marked-circle-outline', text: 'すべてのタスク' },
        { icon: 'mdi-star', text: 'スター付き' },
      ],
      lists: [
        { id: 0, title: 'マイタスク', displayable: true },
      ],
      newListTitle: '',
      newListId: 1,
      newTaskTitle: '',
      newTaskId: 1,
      newTaskDate: undefined,
      newTaskTime: undefined,
      newTaskList: 0,
      dateOptions: [
        "00:00", "00:30", "01:00", "01:30", "02:00", "02:30", 
        "03:00", "03:30", "04:00", "04:30", "05:00", "05:30",
        "06:00", "06:30", "07:00", "07:30", "08:00", "08:30",
        "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
        "12:00", "12:30", "13:00", "13:30", "14:00", "14:30",
        "15:00", "15:30", "16:00", "16:30", "17:00", "17:30",
        "18:00", "18:30", "19:00", "19:30", "20:00", "20:30",
        "21:00", "21:30", "22:00", "22:30", "23:00", "23:30"
      ],
      tasks: [],
    }
  },
  computed: {
    chevron() {
      if (this.open) {
        return 'mdi-chevron-up'
      } else {
        return 'mdi-chevron-down'
      }
    },
    filteredlists() {
      return this.lists.filter(list => list.displayable)
    },
    taskBtnDisabled() {
      if (this.newTaskTitle === '') {
        return true
      } else {
        return false
      }
    }
  },
  methods: {
    addTask(listId) {
      console.log(listId)
      let list_id
      if (listId === undefined) {
        list_id = this.newTaskList
      } else {
        list_id = listId
      }
      this.tasks.unshift({
        id: this.newTaskId,
        listId: list_id,
        title: this.newTaskTitle,
        date: this.newTaskDate,
        time: this.newTaskTime,
        editing: false,
        done: false,
      })
      this.newTaskTitle = ''
      this.newTaskId = this.newTaskId + 1
      this.newTaskDate = undefined
      this.newTaskTime = undefined
      this.newTaskList = undefined
      this.addTaskDialogOpen = false
    },
    filteredTasks(listId) {
      return this.tasks.filter( task => task.listId === listId && !task.done)
    },
    fontClass(done) {
      if (done) {
        'text-decoration-line-through'
      } else {
        'text-decoration-none'
      }
    },
    deleteTodo(id) {
      this.todos = this.todos.filter(todo => todo.id !== id)
    },
    editTodo(id) {
      this.todos = this.todos.map(todo =>
        todo.id === id ? { ...todo, editing: !todo.editing } : todo
      )
    },
    addList() {
      this.addListDialogOpen = false
      this.lists.push({ id: this.newListId, title: this.newListTitle, displayable: true })
      this.newListTitle = ''
      this.newListId = this.newListId + 1
    }
  },
}
</script>

<style scoped>
.without_flex  {
  display: inline !important;
}
.index10000 {
  z-index: 10000 !important;
}
.index0 {
  z-index: 0 !important;
}
</style>