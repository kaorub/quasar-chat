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
      v-on:keyup.enter="send"
      type="textarea"
      float-label="Your message"
      :max-height="50"
      rows="3"
    />
    <q-btn
      v-for="(message, index) in messages"
      v-bind:key="index"
      v-if="message.name !== 'admin'"
      @click="sendToUser(message.name)"
      color="primary"
      :label="`Ответить ${message.name}`"
    />
  </q-page>
</template>

<style>
</style>

<script>
import io from 'socket.io-client';
import * as constants from '../constants/constants';

export default {
  name: 'PageAdmin',
  data() {
    return {
      user: '',
      message: '',
      messages: [],
      socket: io('localhost:3001'),
    };
  },
  methods: {
    send(e) {
      e.preventDefault();

      this.socket.emit('send admin message', {
        name: 'admin',
        user: '',
        admin: '',
        avatar: constants.adminIconPath,
        message: this.message.trim(),
      });

      this.message = '';
    },
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
  beforeDestroy() {
    this.messages = [];
    this.socket.emit('operator logged out');
  },
};
</script>
