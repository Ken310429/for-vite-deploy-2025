<template>
  <table class="table">
    <thead>
      <tr>
        <th scope="col" width="50">操作</th>
        <th scope="col">品項</th>
        <th scope="col">描述</th>
        <th scope="col" width="90">數量</th>
        <th scope="col">單價</th>
        <th scope="col">小計</th>
      </tr>
    </thead>
    <tbody v-for="item in props.cartItems" :key="item.id">
      <tr>
        <td><button type="button" @click="deleteProduct(item)" class="btn btn-sm">x</button></td>
        <td>{{ item.name }}</td>
        <td><small>{{ item.description }}</small></td>
        <td>
          <select v-model="item.count" class="form-select">
            <option v-for="index in props.itemCount" :key="index" :value="index">
              {{ index }}
            </option>
          </select>
        </td>
        <td>{{ item.price }}</td>
        <td>{{ itemPrice }}</td>
      </tr>
    </tbody>
  </table>
</template>
<script setup>

const props = defineProps({
  cartItems: Object,
  itemCount: Array,
  itemPrice: Number,
}
)

const emit = defineEmits(['deleteItem'])

const deleteProduct = (item) => {
  emit('deleteItem', item)
}


</script>
