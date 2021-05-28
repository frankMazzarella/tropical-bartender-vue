<template>
  <div>
    <h1>Tropical Drink List</h1>
    <div v-for="(drink, index) in drinkList" :key="index">
      <available-drink-row :drink="drink" />
    </div>
    <div class="modal active">
      modal
    </div>
    <div class="mask active"></div>
  </div>
</template>

<script>
import SocketIOClient from '../services/SocketIOClient';
import AvailableDrinkRow from '../components/AvailableDrinkRow';

export default {
  name: 'DrinkList',
  components: {
    AvailableDrinkRow
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

.active {
  visibility: visible !important;
}

.modal {
  position: fixed;
  top: 50%;
  left: 50%;
  width: 400px;
  height: 300px;
  transform: translate(-50%, -50%);
  visibility: hidden;
  background-color: #22262b;
  z-index: 100;
}

.mask {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  visibility: hidden;
  z-index: 50;
}
</style>
