<template>
  <div class="col-md-4">
    <h2 class="mb-3">購物車</h2>
    <ul class="list-group mb-3" v-for="item in cartItems" :key="item.id">
      <li class="list-group-item d-flex justify-content-between align-items-center">
        <div>
          <h6 class="my-0">{{ item.name }}</h6>
          <small class="text-muted">數量：{{ item.count }}</small>
        </div>
        <div>
          <span class="text-muted">${{ itemPrice(item) }}</span>
          <button class="btn btn-sm btn-outline-danger ms-2" @click="removeItem(item)"> 移除 </button>
        </div>
      </li>
    </ul>
    <div class="text-end">
      <h5>總計: <span>${{ totalPrice }}</span></h5>
    </div>
  </div>
</template>
<script setup>
import { computed } from 'vue';

const emit = defineEmits(['remove-to-cart'])

const removeItem = (item) => {
  emit('remove-to-cart', item)
}

const props = defineProps({
  cartItems: {
    type: Array,
    required: true,
  },
});

const itemPrice = (item) => {
  return item.price * item.count
}

const totalPrice = computed(() => {

  return props.cartItems.reduce((total, item) => {
    return total + item.price * item.count
  }, 0)
})

</script>
