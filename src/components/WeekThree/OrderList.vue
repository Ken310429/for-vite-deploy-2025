<template>
  <div v-for="item in props.product" :key="item.id" class="list-group">
    <a href="#" @click.prevent="addProduct(item)" class="list-group-item list-group-item-action">
      <div class="d-flex w-100 justify-content-between">
        <h5 class="mb-1">{{ item.name }}</h5>
        <small>${{ item.price }}</small>
      </div>
      <p class="mb-1">{{ item.description }}</p>
    </a>
  </div>
</template>
<script setup>
const props = defineProps({
  product: Object,
})
const emit = defineEmits(['addItem'])

const addProduct = (item) => {
  emit('addItem', item)
}
</script>
<style></style>
