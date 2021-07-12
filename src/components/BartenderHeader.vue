<template>
  <div>
    <div class="header" @click="togglePage">
      <div class="container">
        <div class="header-left"><slot /></div>
        <div class="header-right">{{ time }}</div>
      </div>
    </div>
    <div class="spacer" />
  </div>
</template>

// TODO: i hate the tap the header solution for changing pages

<script>
export default {
  name: 'BartenderHeader',
  data: () => ({
    time: ''
  }),
  created: function () {
    this.startTimeUpdateInterval();
  },
  methods: {
    startTimeUpdateInterval() {
      this.updateTime();
      setInterval(() => this.updateTime(), 1000);
    },
    updateTime() {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
      this.time = `${hours}:${minutes}`;
    },
    togglePage() {
      const currentPath = this.$router.currentRoute.path
      if (currentPath === '/list') {
        this.$router.push('admin')
      }
      if (currentPath === '/admin') {
        this.$router.push('list')
      }
    }
  }
}
</script>

<style scoped>
.container {
  max-width: 700px;
  margin: auto;
}

.header {
  cursor: pointer;
  background-color: #191b1f;
  width: 100%;
  position: fixed;
  border-bottom: 1px solid #e0723b;
  color: #e0723b;
  font-size: 1.5em;
  z-index: 50;
}

.header-left {
  float: left;
  padding: 5px;
}

.header-right {
  float: right;
  padding: 5px;
}

.spacer {
  height: 45px;
}
</style>
