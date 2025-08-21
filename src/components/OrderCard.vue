<template>
  <div class="card">
    <div class="card-body">
      <div class="card-title">
        <h5>訂單</h5>
        <table class="table">
          <thead>
            <tr>
              <th scope="col">品項</th>
              <th scope="col">數量</th>
              <th scope="col">小計</th>
            </tr>
          </thead>
          <tbody v-for="item in props.order" :key="item.id">
            <tr>
              <td>{{ item.name }}</td>
              <td>{{ item.count }}</td>
              <td>{{ PorductPrice(item) }}</td>
            </tr>
          </tbody>
        </table>
        <div class="text-end">備註: <span>{{ note }}</span></div>
        <div class="text-end">
          <h5>總計: <span>${{ OrderTotalPrice }}</span></h5>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
const props = defineProps({
  order: Array,
  OrderTotalPrice: Number,
  PorductPrice: Function,
})
</script>
