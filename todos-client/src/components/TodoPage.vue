<template>
<div class="container">
  <h2>Todo List</h2>
  <div class="input-group" style="margin-bottom:10px;">
  <input type="text" class="form-control"
    placeholder="할일을 입력하세요"
    v-model="todoName"
    v-on:keyup.enter="createTodo(todoName)">
  <span class="input-group-btn">
    <button class="btn btn-default" type="button"
      @click="createTodo(todoName)">추가</button>
  </span>
  </div>
  <ul class="list-group">
    <li class="list-group-item" v-for="(todo, index) in todos" :key="index">
    {{todo.name}}
      <div class="btn-group pull-right"
        style="font-size: 12px; line-height: 1;">
        <button type="button"
        class="btn-link dropdown-toggle"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false">
          더보기<span class="caret"></span>
        </button>
        <ul class="dropdown-menu">
          <li>
            <a href="#" @click="deleteTodo(todo)">삭제</a>
          </li>
        </ul>
      </div>
    </li>
  </ul>
</div>
</template>

<script>
export default {
  name: 'TodoPage',
  data () {
    return {
      todos: []
    }
  },
  mounted () {
    this.getTodos()
  },
  methods: {
    getTodos () {
      var vm = this
      this.$http.get('http://127.0.0.1:8082/api/todos')
        .then((result) => {
          vm.todos = result.data
        })
    },
    deleteTodo (todo) {
      var vm = this
      vm.todos.forEach(function (_todo, i, obj) {
        if (_todo._id === todo._id) {
          vm.$http.delete('http://127.0.0.1:8082/api/todos/' + _todo._id)
            .then((result) => {
              obj.splice(i, 1)
            })
        }
      })
    },
    createTodo (todoName) {
      if (todoName != null) {
        var vm = this
        this.$http.defaults.headers.post['Content-Type'] = 'application/json'
        this.$http.post('http://127.0.0.1:8082/api/todos', {
          name: todoName
        }).then((result) => {
          vm.todos.push(result.data)
        })
        this.name = null
      }
    }
  }
}
</script>
