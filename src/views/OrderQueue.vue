<template>
  <div>
    <bartender-header>Order Queue</bartender-header>
    <div class="container">
      <div v-for="(order, index) in orderQueue" :key="index">
        <drink-order-row :order="order" />
      </div>
    </div>
    <div class="no-orders" v-if="orderQueue.length === 0">
      <inline-svg :src="require('../assets/cocktail.svg')" fill="#eee" width="100px" />
      <div>no orders</div>
    </div>
  </div>
</template>

<script>
import InlineSvg from 'vue-inline-svg';

import SocketIOClient from '../services/SocketIOClient';
import DrinkOrderRow from '../components/DrinkOrderRow.vue';
import BartenderHeader from '../components/BartenderHeader.vue';

export default {
  name: 'OrderQueue',
  components: {
    BartenderHeader,
    DrinkOrderRow,
    InlineSvg
  },
  data: () => ({
    socket: null,
    orderQueue: [],
  }),
  created: function () {
    this.socket = SocketIOClient.connectToOrderQueue();
    this.registerSocketLifecycleEvents();
    this.$on('complete-order', this.emitDeleteDrinkOrder);
  },
  methods: {
    registerSocketLifecycleEvents() {
      this.socket.on('connect', () => {
        console.log('socket connect');
      });
      this.socket.on('disconnect', () => {
        console.log('socket disconn');
        this.orderQueue = [];
      });
      this.socket.on('queue update', (orderQueue) => {
        console.log({ orderQueue });
        this.orderQueue = orderQueue;
      });
    },
    emitDeleteDrinkOrder(id) {
      this.socket.emit('delete drink order', id, () => {
        console.log(`drink ${id} was deleted`);
      });
    }
  }
}
</script>

<style scoped>
.container {
  max-width: 700px;
  margin: auto;
}

.no-orders {
  width: 250px;
  height: 250px;
  background-color: #191b1f;
  border-radius: 15px;
  margin: 75px auto;
  vertical-align: middle;
  font-size: 2em;
  font-weight: bold;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  color: #eee;
}
</style>
