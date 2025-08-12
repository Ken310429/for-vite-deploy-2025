<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div id="todoListPage" class="bg-half">
    <nav>
      <h1><a href="#">ONLINE TODO LIST</a></h1>
      <ul>
        <li class="todo_sm"><a href="#"><span>{{ user.nickname }}的代辦</span></a></li>
        <li><a href="#loginPage">登出</a></li>
      </ul>
    </nav>
    <div class="conatiner todoListPage vhContainer">
      <div class="todoList_Content">
        <div class="inputBox">
          <input type="text" v-model="todoName.content" placeholder="請輸入待辦事項" >
          <a href="#" @click.prevent="addTodoList" >
            <i class="fa fa-plus"></i>
          </a>
        </div>
        <div class="todoList_list">
          <ul class="todoList_tab">
            <li><a href="#" class="active">全部</a></li>
            <li><a href="#">待完成</a></li>
            <li><a href="#">已完成</a></li>
          </ul>
          <div class="todoList_items">
            <ul class="todoList_item">
              <li v-for="item in todoList" :key="item.id">
                <label class="todoList_label">
                  <input class="todoList_input" type="checkbox" value="true">
                  <span>{{item.content}}</span>
                </label>
                <a href="#" @click.prevent="deleteTodoList(item.id)">
                  <i class="fa fa-times"></i>
                </a>
              </li>
            </ul>
            <div class="todoList_statistics">
              <p> 5 個已完成項目</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import '@/assets/todo.css'
// import { useRoute } from 'vue-router';
import axios from 'axios';

const api = 'https://todolist-api.hexschool.io/';


const todoList = ref([])
// const route = useRoute()
const todoName = ref({
  content:''
})
const user = ref({
  token:'',
  nickname: '',
  uid: ''
})
const getTodoList = async () => {
  try {
    const res = await axios.get(`${api}todos/`, {
      headers: {
        Authorization: user.value.token
      }
    })

    todoList.value = res.data.data
    console.log(todoList.value)
  }
  catch (error) {
    console.log(error)
  }
}
const addTodoList = async () => {
  try {
    // eslint-disable-next-line no-unused-vars
    const res = await axios.post(`${api}todos/`, todoName.value, {
      headers: {
        Authorization: user.value.token
      }
    })
    todoName.value = ''
    await getTodoList()
  }
  catch (error) {
    console.log(error)
  }
}
const deleteTodoList = async (todo_id) => {
  console.log(todo_id)
  try {
    const res = await axios.delete(`${api}todos/${todo_id}`, {
      headers: {
        Authorization: user.value.token
      },
    })
    console.log(res)
    await getTodoList()
  }
  catch (error) {
    console.log(error)
  }
}


onMounted(async () => {
  const token = document.cookie.replace(/(?:^|.*;\s*)customTodoToken\s*=\s*([^;]*).*$/i,
    "$1")
  const res = await axios.get(`${api}users/checkout`, {
    headers: {
      Authorization: token
    }
  })

  user.value = res.data;
  user.value.token = token;
  await getTodoList()
  alert('登入成功！')
})

</script>
<style></style>
