<template>
  <div class="order">
    {{ order.name }} for {{ order.recipient }}
  </div>
</template>

<script>
export default {
  name: 'OrderDrinkRow',
  props: ['order']
}
</script>

<style scoped>
.order {
  background: #191b1f;
  width: 100%;
  height: 80px;
  border-bottom: 2px solid #22262b;
}
</style>
