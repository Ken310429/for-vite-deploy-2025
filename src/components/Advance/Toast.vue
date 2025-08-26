<!-- eslint-disable vue/multi-word-component-names -->
<template id="notificationState">
  <div v-if="state.message" class="position-fixed top-0 end-0 p-3" style="z-index: 1050">
    <div class="toast show align-items-center text-white bg-success border-0">
      <div class="d-flex">
        <div class="toast-body">{{ state.message }}</div>
        <button type="button" class="btn-close btn-close-white me-2 m-auto" @click="removeToast"></button>
      </div>
    </div>
  </div>
</template>
<script setup>
import { inject } from 'vue';

const state = inject('notificationState')

const removeToast = () => {
  state.message = ''
}

</script>
