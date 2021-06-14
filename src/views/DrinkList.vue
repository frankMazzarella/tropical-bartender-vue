<template>
  <div>
    <h1>Tropical Drink List</h1>
    <div v-for="(drink, index) in drinkList" :key="index">
      <available-drink-row :drink="drink" />
    </div>
    <order-drink-modal />
  </div>
</template>

<script>
import SocketIOClient from '../services/SocketIOClient';
import AvailableDrinkRow from '../components/AvailableDrinkRow';
import OrderDrinkModal from '../components/OrderDrinkModal';

export default {
  name: 'DrinkList',
  components: {
    AvailableDrinkRow,
    OrderDrinkModal
  },
  data: () => ({
    socket: null,
    drinkList: []
  }),
  created: function () {
    this.socket = SocketIOClient.connectToDrinkList();
    this.registerSocketLifecycleEvents();
    this.$on('order-drink', this.emitDrinkOrder);
  },
  methods: {
    registerSocketLifecycleEvents() {
      this.socket.on('connect', () => {
        console.log('socket connect');
      });
      this.socket.on('disconnect', () => {
        console.log('socket disconn');
        this.drinkList = [];
      });
      this.socket.on('drink list', (drinkList) => {
        console.log({ drinkList });
        this.drinkList = drinkList;
      });
    },
    emitDrinkOrder(drink) {
      this.socket.emit('add drink order', drink, () => {
        console.log(drink);
        console.log(`${drink.recipient} has ordered a ${drink.name}`);
        this.$emit('order-complete');
      });
    }
  }
}
</script>

<style scoped>
h1 {
  color: #e0723b;
}
</style>
