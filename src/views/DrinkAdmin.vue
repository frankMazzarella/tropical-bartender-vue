<template>
  <div>
    <bartender-header>Drink Admin</bartender-header>
    <div class="container">
      <div v-for="(drink, index) in drinkList" :key="index">
        <drink-admin-row :drink="drink" />
      </div>
    </div>
  </div>
</template>

<script>
import SocketIOClient from '../services/SocketIOClient';
import BartenderHeader from '../components/BartenderHeader.vue';
import DrinkAdminRow from '../components/DrinkAdminRow.vue';

export default {
  name: 'DrinkAdmin',
  components: {
    BartenderHeader,
    DrinkAdminRow
  },
  data: () => ({
    socket: null,
    drinkList: []
  }),
  created: function () {
    this.socket =  SocketIOClient.connectToDrinkList();
    this.registerSocketLifecycleEvents();
    this.$on('toggle-drink-active', this.emitToggleDrinkActive);
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
    emitToggleDrinkActive(id) {
      this.socket.emit('toggle drink active', id, (updatedDrink) => {
        console.log(`drink ${updatedDrink.id} was toggled to active = ${updatedDrink.active}`);
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
</style>
