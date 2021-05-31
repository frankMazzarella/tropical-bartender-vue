<template>
  <div>
    <h1>Tropical Drink List</h1>
    <div v-for="(drink, index) in drinkList" :key="index">
      <available-drink-row :drink="drink" />
    </div>
    <order-drink-modal drink-name="501 Blue" />
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
  },
  methods: {
    registerSocketLifecycleEvents() {
      this.socket.on('connect', () => {
        console.log('socket connect');
      });
      this.socket.on('disconnect', () => {
        console.log('socket disconn');
      });
      this.socket.on('drink list', (drinkList) => {
        console.log({ drinkList });
        this.drinkList = drinkList;
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
