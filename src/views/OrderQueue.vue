<template>
  <div>
    <div class="header">
      <div class="container">
        <div class="header-left">Order Queue</div>
        <div class="header-right">{{ time }}</div>
      </div>
    </div>
    <div class="spacer" />
    <div class="container">
      <div v-for="(order, index) in orderQueue" :key="index">
        <drink-order-row :order="order" />
      </div>
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
    orderQueue: [],
    time: ''
  }),
  created: function () {
    this.socket = SocketIOClient.connectToOrderQueue();
    this.registerSocketLifecycleEvents();
    this.startTimeUpdateInterval();
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
    startTimeUpdateInterval() {
      this.updateTime();
      setInterval(() => this.updateTime(), 1000);
    },
    updateTime() {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
      this.time = `${hours}:${minutes}`;
    }
  }
}
</script>

<style scoped>
.container {
  max-width: 700px;
  margin: auto;
}

.header {
  background-color: #191b1f;
  width: 100%;
  position: fixed;
  border-bottom: 1px solid #e0723b;
  color: #e0723b;
  font-size: 1.5em;
  z-index: 50;
}

.header-left {
  float: left;
  padding: 5px;
}

.header-right {
  float: right;
  padding: 5px;
}

.spacer {
  height: 45px;
}
</style>
