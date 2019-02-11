<template>
  <q-layout fit window-height view="lHh Lpr lFf">
    <q-layout-header>
      <q-toolbar
        color="primary"
        :glossy="$q.theme === 'mat'"
        :inverted="$q.theme === 'ios'"
      >
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          aria-label="Menu"
        >
          <q-icon name="menu" />
        </q-btn>

        <q-toolbar-title>
          Quasar App
          <div slot="subtitle">Running on Quasar v{{ $q.version }}</div>
        </q-toolbar-title>
      </q-toolbar>
    </q-layout-header>

    <q-layout-drawer
      v-model="leftDrawerOpen"
      :content-class="$q.theme === 'mat' ? 'bg-grey-2' : null"
    >
      <q-list
        no-border
        link
        inset-delimiter
      >
        <q-list-header>Users</q-list-header>
        <q-item
          v-for="(user, index) in users"
          :key="index"
          v-on:click="openRoom(user)"
        >
          <q-item-side icon="user" />
          <q-item-main :label="user" />
        </q-item>
      </q-list>
    </q-layout-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
/* fixme can be used to add rooms functionality */
import io from 'socket.io-client';
import createNameFromId from '../utils/createNameFromId';

export default {
  name: 'AdminLayout',
  data() {
    return {
      user: '',
      users: [],
      leftDrawerOpen: this.$q.platform.is.desktop,
      socket: io('localhost:3001'),
    };
  },
  methods: {
    openRoom: (user) => {
      this.socket.emit('join room', {
        name: user,
      });
    },
  },
  created() {
    this.socket.on('addition of connected user', (userId) => {
      this.users = [...this.users, createNameFromId(userId)];
      this.leftDrawerOpen = false;
    });

    this.socket.on('delete users', (userId) => {
      this.users = this.users.filter(user => user !== userId);
    });
  },
};
</script>

<style>
</style>
