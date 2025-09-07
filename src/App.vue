<script setup>
import { ref, provide } from 'vue'
import Toast from './components/Advance/Toast.vue';

const items = ref([
  {
    label: '首頁',
    icon: 'pi pi-home',
    route: '/'       // Vue Router 路徑
  },
  {
    label: '第一週',
    route: '/weekone'
  },
  {
    label: '第二週',
    route: '/weektwo'
  },
  {
    label: '第三週',
    route: '/weekthree'
  },
  {
    label: '進階任務',
    route: '/advanceMission'
  },
  {
    label: '最終任務',
    route: '/login'
  }
])
// 提示元件
const notificationState = ref({ message: '' });
provide('notificationState', notificationState);
provide('notify', (message) => {
  notificationState.value.message = message
  setTimeout(() => {
    notificationState.value.message = ''
  }, 3000)
});


</script>

<template>
  <PrimeMenubar :model="items">
    <template #item="{ item, props }">
      <router-link :to="item.route" v-bind="props.action">
        {{ item.label }}
      </router-link>
    </template>
  </PrimeMenubar>
  <RouterView />
  <Toast />
</template>
<style></style>
