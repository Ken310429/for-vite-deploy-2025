<script setup>
import { ref } from 'vue'

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
  }
])
</script>

<template>
  <PrimeMenubar :model="items">
    <template #item="{ item, props}">
      <router-link :to="item.route" v-bind="props.action">
        {{ item.label }}
      </router-link>
    </template>
  </PrimeMenubar>
  <RouterView />
</template>
<style></style>
