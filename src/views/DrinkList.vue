<template>
  <div class="home">
    <h1>This is the Drink List</h1>
  </div>
</template>

<script>
import SocketIOClient from '../services/SocketIOClient';

export default {
  name: 'DrinkList',
  data: () => ({
    socket: null,
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
      });
    }
  }
}
</script>
