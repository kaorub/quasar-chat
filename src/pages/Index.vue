<template>
  <q-page class="text-center">
    <div class="q-display-1">Login</div>
    <q-btn-group>
      <router-link to="/admin" class="q-pa-sm">
        <q-btn color="primary">
          as operator
        </q-btn>
      </router-link>
      <router-link to="/chat" class="q-pa-sm">
        <q-btn color="primary">
          as user
        </q-btn>
      </router-link>
    </q-btn-group>
  </q-page>
</template>

<style>
</style>

<script>

export default {
  name: 'PageIndex',
  data() {
    return {
      messages: [],
    };
  },
};
</script>
