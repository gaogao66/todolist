<template>
  <div id="todo-list-example">
    <form @submit.prevent="addnewtodo">
      <label>Add a todo</label>
      <input v-model=newTodoText id="new_todo" type="text" placeholder="E.g. Feed the cat"/>
      <button type="submit">Add</button>
    </form>
    <ul>
      <li
        is="mytextremove"
        v-for="(todo,index) in todos"
        v-bind:key="todo.id"
        v-bind:title="todo.title"
        v-on:remove="todos.splice(index,1)"></li>
    </ul>
  </div>
</template>

<script>
import mytextremove from './my_text_remove'

export default {
  name: 'my_text',
  data () {
    return {
      newTodoText: '',
      todos: [
        {
          id: 1,
          title: 'Do the dishes'
        },
        {
          id: 2,
          title: 'Take out the trash'
        },
        {
          id: 3,
          title: 'Mow the lawn'
        }
      ],
      nextTodoId: 4
    }
  },
  methods: {
    addnewtodo: function () {
      console.log(this.newTodoText)
      this.todos.push({
        id: this.nextTodoId++,
        title: this.newTodoText
      })
      console.log(this.newTodoText)
      this.newTodoText = ''
    }
  },
  components: {mytextremove}
}
</script>

<style scoped>

</style>
