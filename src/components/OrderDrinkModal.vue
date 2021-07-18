<template>
  <div v-if="active">
    <div class="modal">
      <div class="title">Order a <strong>{{ drink.name }}</strong></div>
      <label for="name">Your name</label>
      <input type="text" ref="name" id="name" v-model="recipient" @keyup.enter="submit" />
      <button class="cancel" @click="hide">Nevermind</button>
      <button class="submit" @click="submit">Order</button>
    </div>
    <div class="mask" @click="hide"></div>
  </div>
</template>

<script>

// TODO: needs confirmation and also error handling would be good

export default {
  name: 'OrderDrinkModal',
  data: () => ({
    active: false,
    drink: {},
    recipient: ''
  }),
  created: function () {
    this.$parent.$on('drink-clicked', this.show);
    this.$parent.$on('order-complete', this.hide);
  },
  methods: {
    hide() {
      this.active = false;
      this.drink = {};
      this.recipient = '';
    },
    show(drink) {
      this.drink = drink;
      this.active = true;
      this.$nextTick(() => {
        this.$refs.name.focus();
      })
    },
    submit() {
      if (!this.recipient) {
        this.$refs.name.focus();
        return;
      }
      this.drink.recipient = this.recipient;
      this.$parent.$emit('order-drink', this.drink);
    }
  }
}
</script>

<style scoped>
.title {
  font-size: 2em;
  padding-bottom: 45px;
  text-decoration: underline;
}

label {
  font-size: 1.5em;
  font-weight: bold;
}

input {
  display: block;
  margin: auto;
  outline: none;
  border-radius: 4px;
  padding: 5px;
  border: 0;
  font-size: 1.2em;
  font-weight: bold;
  width: 240px;
  background-color: #eee;
}

button {
 width: 120px;
 padding: 5px;
 margin: 10px 5px;
 border: 0;
 border-radius: 4px;
 cursor: pointer;
 font-size: 1em;
 font-weight: bold;
}

.cancel {
  background-color: #eee;
}

.submit {
  background-color: #67a5fb;
}

.modal {
  position: fixed;
  top: 50%;
  left: 50%;
  width: 300px;
  padding: 25px;
  transform: translate(-50%, -50%);
  background-color: #22262b;
  color: #eee;
  z-index: 100;
  border-radius: 4px;
}

.mask {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  z-index: 50;
}
</style>
