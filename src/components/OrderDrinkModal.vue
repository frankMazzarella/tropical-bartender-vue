<template>
  <div v-if="active">
    <div class="modal">
      <div class="title">Order a <strong>{{ drinkName }}</strong></div>
      <label for="name">Your name</label>
      <input type="text" id="name" />
      <button class="cancel" @click="hide">Nevermind</button>
      <button class="submit">Order</button>
    </div>
    <div class="mask"></div>
  </div>
</template>

<script>
export default {
  name: 'OrderDrinkModal',
  props: ['drinkName'],
  data: () => ({
    active: true
  }),
  methods: {
    hide() {
      this.active = false;
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
}

button {
 width: 120px;
 padding: 5px;
 margin: 10px 5px;
 border: 0;
 border-radius: 2px;
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
  width: 350px;
  padding: 25px 0;
  transform: translate(-50%, -50%);
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
  z-index: 50;
}
</style>
