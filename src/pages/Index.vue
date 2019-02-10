<template>
  <q-page class="text-center">
    <q-btn-group>
      <router-link to="/admin">
        <q-btn color="secondary" @click="navigate">
          Login as operator
        </q-btn>
      </router-link>
      <router-link to="/chat">Login as user</router-link>
    </q-btn-group>
  </q-page>
</template>

<style>
</style>

<script>
import router from '../router/routes';

export default {
  name: 'PageIndex',
  data() {
    return {
      messages: [],
    };
  },
  methods: {
    navigate() {
      router.push({ name: 'ChatIndex' });
    },
  },
};
</script>
