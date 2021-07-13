<template>
  <div class="fullscreen-container" ref="fullscreen-container">
    <div class="header" @click="headerClicked">
      <div class="container">
        <div class="header-left" v-if="!bartenderIsLazy">Tropical Drink Night!</div>
        <div class="header-left red" v-if="bartenderIsLazy">Bartender is lazy!!!!</div>
        <div class="header-right">{{ dateTime }}</div>
      </div>
    </div>
    <div class="spacer" />
    <div class="container" v-for="(drink, index) in drinkList" :key="index">
      <available-drink-row v-if="drink.active" :drink="drink" />
    </div>
    <order-drink-modal />
  </div>
</template>

<script>
import NoSleep from 'nosleep.js';

import SocketIOClient from '../services/SocketIOClient';
import AvailableDrinkRow from '../components/AvailableDrinkRow';
import OrderDrinkModal from '../components/OrderDrinkModal';

// TODO: add mojito to list

export default {
  name: 'DrinkList',
  components: {
    AvailableDrinkRow,
    OrderDrinkModal
  },
  data: () => ({
    socket: null,
    noSleep: null,
    drinkList: [],
    dateTime: '',
    bartenderIsLazy: false
  }),
  created: function () {
    this.socket = SocketIOClient.connectToDrinkList();
    this.registerSocketLifecycleEvents();
    this.$on('order-drink', this.emitDrinkOrder);
    this.startDateTimeUpdateInterval();
    this.noSleep = new NoSleep();
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
      this.socket.on('oldest drink order age', (oldestDrinkOrderAge) => {
        const fiveMinutes = 1000 * 60 * 5;
        if (oldestDrinkOrderAge >= fiveMinutes) {
          this.bartenderIsLazy = true;
        } else {
          this.bartenderIsLazy = false;
        }
      });
    },
    emitDrinkOrder(drink) {
      this.socket.emit('add drink order', drink, () => {
        console.log(drink);
        console.log(`${drink.recipient} has ordered a ${drink.name}`);
        this.$emit('order-complete');
      });
    },
    startDateTimeUpdateInterval() {
      this.updateDateTime();
      setInterval(() => this.updateDateTime(), 1000);
    },
    updateDateTime() {
      const days = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday'
      ];
      const months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'August',
        'October',
        'November',
        'December'
      ];
      const now = new Date();
      const weekDay = days[now.getDay()];
      const month = months[now.getMonth()];
      const date = now.getDate();
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
      this.dateTime = `${weekDay}, ${month} ${date}, ${hours}:${minutes}`;
    },
    headerClicked() {
      const fullscreenContainer = this.$refs['fullscreen-container'];
      if (document.fullscreenElement) {
        if (document.exitFullscreen) {
          this.noSleep.disable();
          document.exitFullscreen();
        }
      } else {
        if (fullscreenContainer.requestFullscreen) {
          this.noSleep.enable();
          fullscreenContainer.requestFullscreen();
        }
      }
    }
  }
}
</script>

<style scoped>
.fullscreen-container {
  overflow: auto;
  background-color: #22262b;
}

.container {
  max-width: 1200px;
  margin: auto;
}

.header {
  background-color: #191b1f;
  width: 100%;
  position: fixed;
  z-index: 50;
  border-bottom: 1px solid #e0723b;
  color: #e0723b;
  font-size: 1.5em;
  cursor: pointer;
}

.header-left {
  float: left;
  padding: 5px 15px;
}

.header-right {
  float: right;
  padding: 5px 15px;
}

.spacer {
  height: 50px;
}

.red {
  color: #e81f1f;
}

@media (max-width: 700px) {
  .header-left {
    float: none;
    text-align: center;
  }

  .header-right {
    display: none;
  }
}
</style>
