<template>
  <div class="about">
    <h1>This is the Order Queue</h1>
  </div>
</template>

<script>
import SocketIOClient from '../services/SocketIOClient';

export default {
  name: 'OrderQueue',
  data: () => ({
    socket: null,
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
      });
      this.socket.on('queue update', (queue) => {
        console.log(queue);
      });
    }
  }
}
</script>
