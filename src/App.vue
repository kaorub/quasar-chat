<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  mounted() {
    this.socket.on('DELETE_MESSAGES', () => {
      this.messages = [];
    });
  },
};
</script>

<style>
</style>
