<template>
  <div class="drink-item" @click="orderDrink">
    <span class="drink-name">{{ drink.name }}</span>
    <div class="ingredients">
      <span v-for="(ingredient, index) in drink.ingredients" :key="index">
        {{ ingredient.name }}<span v-if="index + 1 !== drink.ingredients.length">,</span>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AvailableDrinkRow',
  props: ['drink'],
  methods: {
    orderDrink() {
      this.$parent.$emit('drink-clicked', this.drink);
    }
  }
}
</script>

<style scoped>
.drink-item {
  cursor: pointer;
  background: #191b1f;
  border-radius: 2px;
  text-align: left;
  display: inline-block;
  position: relative;
  padding: 10px;
  height: 50px;
  width: 90%;
  margin: 5px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
  transition: all 0.3s cubic-bezier(.25,.8,.25,1);
}

.drink-item:active {
  box-shadow: 5px 5px 5px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
}

.drink-name {
  color: #67a5fb;
  font-size: 1.3em;
}

.ingredients {
  position: absolute;
  bottom: 10px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 95%;
}
</style>
