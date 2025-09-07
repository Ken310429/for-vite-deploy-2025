<template>
  <div class="todoList_list">
    <ul class="todoList_tab">
      <li><a href="#" :class="{ active: currentFilter === 'all' }" @click.prevent="setFilter('all')">全部</a></li>
      <li><a href="#" :class="{ active: currentFilter === 'pending' }" @click.prevent="setFilter('pending')">待完成</a>
      </li>
      <li><a href="#" :class="{ active: currentFilter === 'completed' }" @click.prevent="setFilter('completed')">已完成</a>
      </li>
    </ul>
    <div class="todoList_items">
      <ul class="todoList_item">
        <TodoItem v-for="todo in currentTodoList" :key="todo.id" :todo="todo" :isEditor="editingId === todo.id"
          @start-editor="emit('start-editor', $event)" @put-todo-list="emit('put-todo-list', $event)"
          @change-toggle="emit('change-toggle', $event)" @delete-todo-list="emit('delete-todo-list', $event)" />
      </ul>
      <div class="todoList_statistics">
        <p>{{ incompleteCount }} 個未完成項目</p>
      </div>
    </div>
  </div>
</template>
<script setup>
import TodoItem from './TodoItem.vue';
import { ref, computed } from 'vue';

const props = defineProps({
  todoList: {
    type: Array,
    required: true,
  },
  editingId: {
    type: [Number, String, null],
    default: null
  },
});
const emit = defineEmits(['start-editor', 'put-todo-list', 'change-toggle', 'delete-todo-list']);
const currentFilter = ref('all')
const setFilter = (value) => {
  currentFilter.value = value
  if (props.editingId !== null) {
    emit('start-editor', null)
  }
}

const currentTodoList = computed(() => {
  switch (currentFilter.value) {
    case 'pending':
      return props.todoList.filter(item => !item.status);
    case 'completed':
      return props.todoList.filter(item => item.status);
    case 'all':
    default:
      return props.todoList;
  }
})

const incompleteCount = computed(() =>
  props.todoList.filter(item => !item.status).length
)

</script>
