<template>
  <div class="container" @click="toggleActive" :class="{ active: isActive }">
    <div class="row">
      <div class="top-left">{{ order.name }}</div>
      <div class="top-right">{{ age }}</div>
    </div>
    <div class="row" v-if="!isActive">
      <div class="bottom-left">for {{ order.recipient.toLowerCase() }}</div>
      <div class="bottom-right">+ tap to expand</div>
    </div>
    <div v-if="isActive">
      <div v-for="(ingredient, index) in order.ingredients" :key="index">
        {{ ingredient.name }} - {{ ingredient.amount }}
      </div>
    </div>
    <div class="row" v-if="isActive">
      <div class="drink-style">serve over ice</div>
      <button class="complete-button" @click="complete">Complete</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'OrderDrinkRow',
  props: ['order'],
  data: () => ({
    age: '',
    isActive: false
  }),
  created: function () {
    this.startOrderAgeInterval();
  },
  methods: {
    startOrderAgeInterval() {
      this.updateOrderAge();
      setInterval(() => this.updateOrderAge(), 1000);
    },
    updateOrderAge() {
      const minutes = this.getOrderAgeInMinutes();
      if (minutes === 0) {
        this.age = 'ordered just now';
      } else if (minutes === 1) {
        this.age = '1 minute ago';
      } else {
        this.age = `${minutes} minutes ago`;
      }
    },
    getOrderAgeInMinutes() {
      const now = new Date();
      const minute = 1000 * 60;
      return Math.floor((now.getTime() - this.order.timestamp) / minute);
    },
    toggleActive() {
      this.isActive = !this.isActive;
    },
    complete() {
      this.$parent.$emit('complete-order', this.order.id);
    }
  }
}
</script>

<style scoped>
.container {
  background: #191b1f;
  border-bottom: 2px solid #22262b;
  cursor: pointer;
  /* TODO: this is working for color changes but not div resizing */
  transition: all 0.3s cubic-bezier(.25,.8,.25,1);
}

.row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.top-left {
  color: #67a5fb;
  padding: 5px;
  font-size: 1.1em;
}

.top-right {
  padding: 5px;
  color: #67a5fb;
}

.bottom-left {
  padding: 5px;
  color: #8a8a8a;
}

.bottom-right {
  padding: 5px;
  font-style: italic;
  color: #8a8a8a;
}

.drink-style {
  padding: 10px;
  color: #eee;
  font-size: 1em;
  font-weight: bold;
}

.complete-button {
  width: 120px;
  padding: 5px;
  margin: 10px 5px;
  border: 0;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1em;
  font-weight: bold;
}

.active {
  background-color: #131313;
}
</style>
