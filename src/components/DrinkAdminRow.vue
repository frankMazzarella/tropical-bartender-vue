<template>
  <div class="drink">
    <div class="drink-name">{{ drink.name }}</div>
    <div v-if="drink.active" class="drink-toggle active" @click="toggleActive">active</div>
    <div v-if="!drink.active" class="drink-toggle disabled" @click="toggleActive">disabled</div>
    <div class="ingredients">
      <table>
        <tr v-for="(ingredient, index) in drink.ingredients" :key="index">
          <div class="ingredient">&bull; {{ ingredient.name }}</div>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DrinkAdminRow',
  props: ['drink'],
  methods: {
    toggleActive() {
      this.$parent.$emit('toggle-drink-active', this.drink.id);
    }
  }
}
</script>

<style scoped>
.drink {
  background: #191b1f;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  margin: 5px auto;
}

.drink-name {
  text-align: left;
  flex: 2 1 auto;
  color: #67a5fb;
  padding: 10px;
  font-size: 1.1em;
}

.drink-toggle {
  width: 120px;
  padding: 5px;
  margin: 10px;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  color: #22262b;
}

.active {
  background-color: #67a5fb;
}

.disabled {
  background-color: #e0723b;
}

.ingredients {
  margin: 20px;
  width: 100%;
  display: flex;
  justify-content: center;
}

table {
  text-align: left;
  width: 250px;
}

.ingredient {
  border-bottom: 1px dashed #808080;
  margin: 2px auto;
}
</style>
