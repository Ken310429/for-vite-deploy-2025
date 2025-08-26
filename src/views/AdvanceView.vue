<template>
  <div id="app" class="container py-4">
    <div class="row">
      <!-- 商品列表區 -->
      <ProductList :products="products" @add-to-cart="addCart" />
      <!-- 購物車區 -->
      <ShoppingCart :cartItems="cartItems" @remove-to-cart="removeCart" />
    </div>
    <Toast />
    <!-- 通知元件 -->

  </div>
</template>
<script setup>
import ProductList from '@/components/Advance/ProductList.vue';
import ShoppingCart from '@/components/Advance/ShoppingCart.vue';
import Toast from '@/components/Advance/Toast.vue';
import { provide, ref } from 'vue';

const products = ref([
  {
    id: 1,
    name: '耳罩式藍牙耳機',
    description: '舒適配戴，支援降噪技術',
    price: 2490,
    image:
      'https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=80&w=2065&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 4,
    name: '耳罩式彩虹耳機',
    description: '舒適配戴，支援降噪技術',
    price: 1380,
    image:
      'https://images.unsplash.com/photo-1524678606370-a47ad25cb82a?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 5,
    name: '時尚藍牙耳機',
    description: '舒適配戴，支援降噪技術',
    price: 7990,
    image:
      'https://images.unsplash.com/photo-1628116709703-c1c9ad550d36?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 2,
    name: '機械式鍵盤',
    description: '紅軸機械鍵盤，打字手感極佳',
    price: 1890,
    image:
      'https://images.unsplash.com/photo-1595044426077-d36d9236d54a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 3,
    name: '無線滑鼠',
    description: '靜音按鍵設計，長效電池',
    price: 890,
    image:
      'https://images.unsplash.com/photo-1527814050087-3793815479db?q=80&w=1928&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
])
const cartItems = ref([
])

const notificationState = ref({ message: '' });

provide('notificationState', notificationState);
provide('notify', (message) => {
  notificationState.value.message = message
  console.log(notificationState.value.message);
  setTimeout(() => {
    notificationState.value.message = ''
  }, 3000)
});


const addCart = (product) => {
  //console.log(product)
  const existProduct = cartItems.value.find((item) => item.id === product.id)
  if (existProduct) {
    existProduct.count += 1
    return
  }
  cartItems.value.push({
    ...product,
    'count': 1,
  })
}

const removeCart = (product) => {
  const index = cartItems.value.findIndex((item) => item.id === product.id)
  if (index !== -1) {
    cartItems.value.splice(index, 1)
  }
}


</script>
<style scoped>
body {
  background: #f2f2f2f2;
}

.card-img-top {
  height: 150px;
  object-fit: cover;
}
</style>
