<template>
  <div class="inputBox">
    <input type="text" v-model="newTodo" placeholder="請輸入待辦事項">
    <a href="#" @click.prevent="handleAddTodo">
      <i class="fa fa-plus"></i>
    </a>
  </div>
</template>
<script setup>
import { ref, inject } from 'vue';

const notify = inject('notify');
const newTodo = ref('')
const emit = defineEmits(['add-todo-list']);
const handleAddTodo = () => {
  if (!newTodo.value.trim()) {
    notify('請輸入待辦事項')
    return
  }
  emit('add-todo-list', newTodo.value)
  newTodo.value = ''
}
</script>
