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
        <li>
          <RouterLink to="/login">登出</RouterLink>
        </li>
      </ul>
    </nav>
    <div class="conatiner todoListPage vhContainer">
      <div class="todoList_Content">
        <TodoForm @add-todo-list="addTodoList" />
        <TodoList v-if="todoList.length" :todoList="todoList" :editingId="editingId" @start-editor="startEditor"
          @put-todo-list="putTodoList" @change-toggle="changeToggle" @delete-todo-list="deleteTodoList" />
        <p v-else class="todoList_nodata">目前尚無待辦事項</p>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted, inject } from 'vue';
import '@/assets/todo.css'
import { useRouter } from 'vue-router';
import TodoForm from '@/components/TodoList/TodoForm.vue';
import TodoList from '@/components/TodoList/TodoList.vue';
import { addTodoAPI, changeToggleAPI, checkoutAPI, deleteTodoAPI, editTodoAPI, getTodoAPI } from '../../utils/TodoAPI';


const router = useRouter()
const notify = inject('notify');

const todoList = ref([])
// const route = useRoute()

const user = ref({
  token: '',
  nickname: '',
  uid: ''
})

const editingId = ref(null)

const getTodoList = async () => {
  const res = await getTodoAPI(user.value.token);
  if (res) {
    todoList.value = res.data;
  }
}
const addTodoList = async (content) => {
  const res = await addTodoAPI(content, user.value.token);
  if (res) {
    notify(`${content} 已加入待辦清單`);
    await getTodoList()
  }
}

const startEditor = (todoId) => {
  editingId.value = todoId
}

const putTodoList = async (todo) => {
  editingId.value = null
  const res = await editTodoAPI(user.value.token, todo);
  if (res) {
    await getTodoList()
  }
}
const changeToggle = async (id) => {
  const res = await changeToggleAPI(id, user.value.token);
  if (res) {
    await getTodoList()
  }
}

const deleteTodoList = async (todo_id) => {
  if (editingId.value === todo_id) {
    editingId.value = null
  }
  const res = await deleteTodoAPI(user.value.token, todo_id);
  if (res) {
    await getTodoList()
  }
}


onMounted(async () => {
  const token = document.cookie.replace(/(?:^|.*;\s*)customTodoToken\s*=\s*([^;]*).*$/i,
    "$1");
  const res = await checkoutAPI(token);
  if (!res.status) {
    notify('請先登入！')
    router.push('/login')
    return
  }
  user.value = res;
  user.value.token = token;
  await getTodoList()
})

</script>
<style></style>
