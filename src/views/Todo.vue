<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div id="todoListPage" class="bg-half">
    <nav>
      <h1>
        <RouterLink to="/todo">ONLINE TODO LIST</RouterLink>
      </h1>
      <ul>
        <li class="todo_sm">
          <RouterLink to="/todo"><span>{{ user.nickname }}的代辦</span></RouterLink>
        </li>
        <li><a href="#loginPage">登出</a></li>
      </ul>
    </nav>
    <div class="conatiner todoListPage vhContainer">
      <div class="todoList_Content">
        <div class="inputBox">
          <input type="text" v-model="todoName.content" placeholder="請輸入待辦事項">
          <a href="#" @click.prevent="addTodoList">
            <i class="fa fa-plus"></i>
          </a>
        </div>
        <div class="todoList_list">
          <ul class="todoList_tab">
            <li><a href="#" :class="{ active: currentFilter === 'all' }" @click.prevent="setFilter('all')">全部</a></li>
            <li><a href="#" :class="{ active: currentFilter === 'pending' }"
                @click.prevent="setFilter('pending')">待完成</a></li>
            <li><a href="#" :class="{ active: currentFilter === 'completed' }"
                @click.prevent="setFilter('completed')">已完成</a></li>
          </ul>
          <div class="todoList_items">
            <ul class="todoList_item">
              <li v-for="item in currentTodoList" :key="item.id">
                <label class="todoList_label">
                  <div>
                    <input class="todoList_input" type="checkbox" value="true" :checked="item.status"
                      @click="changeToggle(item.id)">
                    <span v-if="!isEditor">{{ item.content }}</span>
                    <input v-else type="text" v-model="item.content">
                  </div>
                  <div>
                    <Button icon="pi pi-pencil" @click="startEditor" severity="secondary" variant="text" rounded
                      :size="size"></Button>
                    <Button icon="pi pi-check" @click="putTodoList(item)" severity="secondary" variant="text" rounded
                      :size="size"></Button>
                    <Button icon="pi pi-times" @click.prevent="deleteTodoList(item.id)" severity="secondary"
                      variant="text" rounded :size="size"></Button>
                  </div>
                </label>

              </li>
            </ul>
            <div class="todoList_statistics">
              <p>{{ successCount }} 個已完成項目</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted, computed } from 'vue';
import '@/assets/todo.css'
// import { useRoute } from 'vue-router';
import axios from 'axios';

const api = 'https://todolist-api.hexschool.io/';

const size = ref('small')

const todoList = ref([])
// const route = useRoute()
const todoName = ref({
  content: ''
})
const user = ref({
  token: '',
  nickname: '',
  uid: ''
})
const currentFilter = ref('all')
const setFilter = (value) => {
  currentFilter.value = value
}

const currentTodoList = computed(() => {
  // console.log('當前篩選:', currentFilter.value)
  switch (currentFilter.value) {
    case 'pending':
      return todoList.value.filter(item => !item.status);
    case 'completed':
      return todoList.value.filter(item => item.status);
    case 'all':
    default:
      return todoList.value;
  }
})


const successCount = computed(() => {
  return todoList.value.filter(item => item.status === true).length
})

const isEditor = ref(false)

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

const startEditor = () => {
  isEditor.value = !isEditor.value
}

const putTodoList = async (item) => {
  try {
    isEditor.value = false
    // eslint-disable-next-line no-unused-vars
    const res = await axios.put(`${api}todos/${item.id}`, {
      content: item.content
    }, {
      headers: {
        Authorization: user.value.token
      }
    })
    // await getTodoList()
  }
  catch (error) {
    console.log(error)
  }
}
const changeToggle = async (id) => {
  try {
    // eslint-disable-next-line no-unused-vars
    const res = await axios.patch(`${api}todos/${id}/toggle`, {}, {
      headers: {
        Authorization: user.value.token
      }
    })
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
  // alert('登入成功！')
})

</script>
<style></style>
