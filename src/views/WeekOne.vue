<template>
  <div>
    <table>
      <thead>
        <tr>
          <th scope="col">品項</th>
          <th scope="col">描述</th>
          <th scope="col">價格</th>
          <th scope="col">庫存</th>
        </tr>
      </thead>
      <tbody>
        <template v-for="item in items" :key="item.id">
          <tr>
            <td v-if="editId === item.id">
              <input type="text" v-model="defaultValue.name" />
            </td>
            <td v-else>{{ item.name }}</td>
            <td><small>{{ item.description }}</small></td>
            <td>{{ item.price }}</td>
            <td>
              <button :disabled="item.number <= 0" @:click="handleNumber(item.id, item.number - 1)">-
              </button>
              {{ item.number }}
              <button @:click="handleNumber(item.id, item.number + 1)">+</button>
            </td>
            <td v-if="editId === item.id">
              <button @:click="ConfirmEdit">儲存</button>
              <button @:click="CancelEdit">取消</button>
            </td>
            <td v-else>
              <button @:click="Edit(item)">編輯</button>
            </td>
          </tr>
        </template>
      </tbody>
    </table>
  </div>
</template>
<script setup>
import { ref } from 'vue';
const data = [{
  id: 1,
  name: '珍珠奶茶',
  description: '香濃奶茶搭配QQ珍珠',
  price: 50,
  number: 20
}, {
  id: 2,
  name: '冬瓜檸檬',
  description: '清新冬瓜配上新鮮檸檬',
  price: 45,
  number: 15
}, {
  id: 3,
  name: '翡翠檸檬',
  description: '綠茶與檸檬的完美結合',
  price: 55,
  number: 30
}, {
  id: 4,
  name: '四季春茶',
  description: '香醇四季春茶，回甘無比',
  price: 45,
  number: 10
}, {
  id: 5,
  name: '阿薩姆奶茶',
  description: '阿薩姆紅茶搭配香醇鮮奶',
  price: 50,
  number: 25
}, {
  id: 6,
  name: '檸檬冰茶',
  description: '檸檬與冰茶的清新組合',
  price: 45,
  number: 20
}, {
  id: 7,
  name: '芒果綠茶',
  description: '芒果與綠茶的獨特風味',
  price: 55,
  number: 18
}, {
  id: 8,
  name: '抹茶拿鐵',
  description: '抹茶與鮮奶的絕配',
  price: 60,
  number: 20
}];

const items = ref(data);
const editId = ref(null);
const defaultValue = ref(null);

const handleNumber = (id, number) => {
  items.value = items.value.map((item => {
    if (item.id === id) {
      item.number = number;
      //console.log(item.number);
    }
    return item;
  }))
}

const Edit = (item) => {
  editId.value = item.id;
  defaultValue.value = { ...item };
}

const ConfirmEdit = () => {
  const index = items.value.findIndex(item => item.id === editId.value);
  items.value[index] = { ...defaultValue.value };
  editId.value = null;
}

const CancelEdit = () => {
  editId.value = null;
}

</script>

<style>
</style>
