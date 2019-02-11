<template>
  <q-page class="">
    <q-chat-message
        v-for="message in messages"
        :key="message.id"
        :name="message.name"
        :text="[message.message]"
        :avatar="message.avatar"
    />
    <q-input
      fixed
      fixed-bottom
      v-model="message"
      type="textarea"
      float-label="Your message"
      :max-height="50"
      rows="3"
    />
    <q-btn
      v-for="(user, index) in users"
      v-bind:key="index"
      v-if="user !== ''"
      @click="sendToUser(user)"
      color="primary"
      :label="`Ответить ${user}`"
    />
  </q-page>
</template>

<style>
</style>

<script>
import io from 'socket.io-client';
import createNameFromId from '../utils/createNameFromId';

export default {
  name: 'PageAdmin',
  data() {
    return {
      adminSocketId: '',
      user: '',
      users: [],
      message: '',
      messages: [],
      socket: io('localhost:3001'),
    };
  },
  methods: {
    sendToUser(name) {
      this.socket.emit('join room', {
        message: this.message,
        name,
      });
      this.message = '';
    },
  },
  mounted() {
    this.socket.on('message', (data) => {
      this.messages = [...this.messages, data];
    });
    this.socket.on('send message to admin', (data) => {
      this.messages = [...this.messages, data];
    });
    this.socket.on('send message to client', (data) => {
      this.messages = [...this.messages, data];
    });
  },
  created() {
    this.users = [];

    this.socket.on('addition of connected user', (userId) => {
      this.users = [...this.users, createNameFromId(userId)]
        .filter(user => user !== this.adminSocketId);
      this.leftDrawerOpen = false;
    });

    this.socket.on('delete users', (userId) => {
      this.users = this.users.filter(user => user !== userId);
    });
  },
  beforeDestroy() {
    this.messages = [];
    this.users = [];
    this.socket.emit('operator logged out');
  },
};
</script>
