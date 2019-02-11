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
  </q-page>
</template>

<style>
</style>

<script>
import io from 'socket.io-client';
import * as constants from '../constants/constants';
import createNameFromId from '../utils/createNameFromId';

export default {
  name: 'ChatIndex',
  data() {
    return {
      user: '',
      name: '',
      admin: '',
      message: '',
      messages: [],
      socket: io('localhost:3001'),
    };
  },
  methods: {
    send(e) {
      e.preventDefault();
      const msg = {
        user: this.user,
        name: createNameFromId(this.user),
        admin: this.admin,
        avatar: 'statics/icons/baseline_face_black_18dp.png',
        message: this.message.trim(),
      };
      this.socket.emit(constants.sendMessage, msg);
      this.message = '';
    },
  },
  created() {
    this.messages = [];
  },
  mounted() {
    this.socket.on('send message to client', (data) => {
      this.messages = [...this.messages, data];
    });

    this.socket.on('connect', () => {
      this.name = createNameFromId(this.socket.id);
      this.user = this.socket.id;
    });

    this.socket.on('message', (data) => {
      this.messages = [...this.messages, data];
    });

    this.socket.on('clear all messages', () => {
      this.messages = [];
    });
  },
  beforeDestroy() {
    this.messages = [];
  },
};
</script>
