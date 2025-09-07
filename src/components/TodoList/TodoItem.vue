<template>
  <li>
    <label class="todoList_label">
      <div>
        <input class="todoList_input" type="checkbox" value="true" :checked="todo.status"
          @click="changeToggle(todo.id)">
        <span v-if="!isEditor">{{ todo.content }}</span>
        <input v-else type="text" v-model="localContent">
      </div>
      <div>
        <Button icon="pi pi-pencil" @click="handleEdit" severity="secondary" variant="text" rounded
          :size="size"></Button>
        <Button icon="pi pi-check" @click="handlePut" severity="secondary" variant="text" rounded :size="size"></Button>
        <Button icon="pi pi-times" @click.prevent="handleDelte(todo.id)" severity="secondary" variant="text" rounded
          :size="size"></Button>
      </div>
    </label>
  </li>
</template>
<script setup>

import { ref, watch, inject } from 'vue';

const size = ref('small')
const notify = inject('notify');

const props = defineProps({
  todo: {
    type: Object,
    required: true,
  },
  isEditor: Boolean,
});

const localContent = ref(props.todo.content)

const emit = defineEmits(['start-editor', 'put-todo-list', 'change-toggle', 'delete-todo-list']);

const handleEdit = () => {
  localContent.value = props.todo.content
  emit('start-editor', props.todo.id)
}
const handleDelte = (id) => {
  emit('delete-todo-list', id)
}
const changeToggle = (id) => {
  emit('change-toggle', id)
}
const handlePut = () => {
  if (!localContent.value.trim()) {
    notify('請輸入待辦事項')
    return
  }
  emit('put-todo-list', { id: props.todo.id, content: localContent.value.trim() })

}

watch(() => props.todo.content, (newVal) => {
  localContent.value = newVal
})
</script>
