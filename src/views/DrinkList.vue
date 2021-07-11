<template>
  <div>
    <div class="header">
      <div class="container">
        <div class="header-left" :class="{ red: bartenderIsSlow }">{{ headerText }}</div>
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

// TODO: needs vue-insomnia
// https://github.com/gorbypark/vue-insomnia

<script>
import SocketIOClient from '../services/SocketIOClient';
import AvailableDrinkRow from '../components/AvailableDrinkRow';
import OrderDrinkModal from '../components/OrderDrinkModal';

export default {
  name: 'DrinkList',
  components: {
    AvailableDrinkRow,
    OrderDrinkModal
  },
  data: () => ({
    socket: null,
    drinkList: [],
    dateTime: '',
    headerText: 'Tropical Drink Night!',
    bartenderIsSlow: false
  }),
  created: function () {
    this.socket = SocketIOClient.connectToDrinkList();
    this.registerSocketLifecycleEvents();
    this.$on('order-drink', this.emitDrinkOrder);
    this.startDateTimeUpdateInterval();
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
          this.headerText = 'Bartender Is Slow!!!!';
          this.bartenderIsSlow = true;
        } else {
          this.headerText = 'Tropical Drink Night!';
          this.bartenderIsSlow = false;
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
    }
  }
}
</script>

<style scoped>
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
