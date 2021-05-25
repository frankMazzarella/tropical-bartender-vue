<template>
  <div class="about">
    <h1>This is the Order Queue</h1>
  </div>
</template>

<script>
import SocketIOClient from '../services/SocketIOClient';

export default {
  name: 'App',
  created: function () {
    SocketIOClient.initSocket();
    this.registerSocketLifecycleEvents();
  },
  methods: {
    // TODO: this should probably be in a service or something to manage state
    registerSocketLifecycleEvents() {
      console.log('registering');
      SocketIOClient.socket.on('connect', () => {
        console.log('socket connect');
      });
      SocketIOClient.socket.on('disconnect', () => {
        console.log('socket disconn');
      });
      SocketIOClient.socket.on('queue update', (queue) => {
        console.log({ queue });
      });
      SocketIOClient.socket.on('drink list', (drinkList) => {
        console.log({ drinkList });
      });
    }
  }
}
</script>
