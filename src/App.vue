<template>
  <div id="app">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import SocketIOClient from './services/SocketIOClient';

export default {
  name: 'App',
  components: {
    HelloWorld
  },
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

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
