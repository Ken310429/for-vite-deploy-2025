<template>
  <div id="root">
    <div class="container mt-5">
      <div class="row">
        <div class="col-md-4">
          <OrderList :product="product" @add-item="addProduct" />
        </div>
        <div class="col-md-8">
          <shoppingCart :cartItems="cartItems" :itemCount="itemCount" @delete-item="deleteProduct"
            :PorductPrice="PorductPrice" />
          <div class="text-end mb-3">
            <h5>總計: <span>${{ TotalPrice }}</span></h5>
          </div>
          <textarea class="form-control mb-3" rows="3" placeholder="備註" v-model="note"></textarea>
          <div class="text-end">
            <button class="btn btn-primary" @click="checkProduct">送出</button>
          </div>
        </div>
      </div>
      <hr />
      <div class="row justify-content-center">
        <div class="col-8">
          <order-card :order="order" :OrderTotalPrice="OrderTotalPrice" :PorductPrice="PorductPrice" />
        </div>
      </div>
    </div>
  </div>

</template>
<script setup>
import { ref, computed } from 'vue';
import OrderList from '@/components/OrderList.vue';
import shoppingCart from '@/components/ShoppingCart.vue';
import OrderCard from '@/components/OrderCard.vue';


const data = [
  {
    "id": 1,
    "name": "珍珠奶茶",
    "description": "香濃奶茶搭配QQ珍珠",
    "price": 50
  },
  {
    "id": 2,
    "name": "冬瓜檸檬",
    "description": "清新冬瓜配上新鮮檸檬",
    "price": 45
  },
  {
    "id": 3,
    "name": "翡翠檸檬",
    "description": "綠茶與檸檬的完美結合",
    "price": 55
  },
  {
    "id": 4,
    "name": "四季春茶",
    "description": "香醇四季春茶，回甘無比",
    "price": 45
  },
  {
    "id": 5,
    "name": "阿薩姆奶茶",
    "description": "阿薩姆紅茶搭配香醇鮮奶",
    "price": 50
  },
  {
    "id": 6,
    "name": "檸檬冰茶",
    "description": "檸檬與冰茶的清新組合",
    "price": 45
  },
  {
    "id": 7,
    "name": "芒果綠茶",
    "description": "芒果與綠茶的獨特風味",
    "price": 55
  },
  {
    "id": 8,
    "name": "抹茶拿鐵",
    "description": "抹茶與鮮奶的絕配",
    "price": 60
  }
]
const arr = Array.from({ length: 10 }, (_, i) => i + 1)
const itemCount = ref(arr)
const product = ref(data)

const cartItems = ref([])
const order = ref([])

const note = ref('')

const addProduct = (productItem) => {

  const existProduct = cartItems.value.find(item => item.id === productItem.id);

  if (existProduct) {
    existProduct.count++;
  }
  else {
    cartItems.value.push({
      ...productItem,
      'count': 1
    })
  }
  // console.log(shoppingCart.value)
};

const PorductPrice = (item) => {
  return item.price * item.count
}

const TotalPrice = computed(() => {
  return cartItems.value.reduce((prev, curr) =>
    prev + (curr.price * curr.count), 0)
})

const OrderTotalPrice = computed(() => {
  return order.value.reduce((prev, curr) =>
    prev + (curr.price * curr.count), 0)
})

const deleteProduct = (item) => {
  const index = cartItems.value.indexOf(item)
  cartItems.value.splice(index, 1)

}

const checkProduct = () => {
  order.value = [...cartItems.value]
  cartItems.value = []
}

// watch(shoppingCart.value, (newValue, oldValue) => {
//   console.log(newValue, oldValue)
// })

</script>
<style></style>
