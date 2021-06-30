<template>
  <div class="drink-item" @click="orderDrink">
    <div class="drink-icon">
      <inline-svg v-if="drink.type === 'iced'" :src="require('../assets/drink-iced.svg')" fill="#eee" width="50px" />
      <inline-svg v-if="drink.type === 'smoothie'" :src="require('../assets/drink-smoothie.svg')" fill="#eee" width="50px" />
    </div>
    <div class="drink-info-container">
      <div class="drink-name">{{ drink.name }}</div>
      <div class="drink-ingredients">
        <span v-for="(ingredient, index) in drink.ingredients" :key="index">
          {{ ingredient.name }}<span v-if="index + 1 !== drink.ingredients.length">,</span>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import InlineSvg from 'vue-inline-svg';

// TODO: would be nice if other modals would close when a new one opened
export default {
  name: 'AvailableDrinkRow',
  components: {
    InlineSvg
  },
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
  width: 90%;
  margin: 5px auto;
  height: 65px;
  display: flex;
  background: #191b1f;
  border-radius: 2px;
  cursor: pointer;
}

.drink-icon {
  align-self: center;
  width: 75px;
}

.drink-info-container {
  width: 70%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  flex: 1 1 auto;
}

.drink-name {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 95%;
  color: #67a5fb;
  font-size: 1.3em;
  text-align: left;
}

.drink-ingredients {
  text-align: left;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 95%;
  color: #eee;
}
</style>
