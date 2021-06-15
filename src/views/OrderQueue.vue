<template>
  <div class="about">
    <h1>Open Drink Orders: {{ orderQueue.length }}</h1>
    <div v-for="(order, index) in orderQueue" :key="index">
      <drink-order-row :order="order" />
    </div>
  </div>
</template>

<script>
import SocketIOClient from '../services/SocketIOClient';
import DrinkOrderRow from '../components/DrinkOrderRow.vue';

export default {
  name: 'OrderQueue',
  components: {
    DrinkOrderRow
  },
  data: () => ({
    socket: null,
    orderQueue: []
  }),
  created: function () {
    this.socket = SocketIOClient.connectToOrderQueue();
    this.registerSocketLifecycleEvents();
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
    }
  }
}
</script>
