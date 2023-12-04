<script lang="ts">
import { defineComponent } from 'vue';
import { io } from 'socket.io-client';

export default defineComponent({
  name: 'ChatWidget',

  data() {
    return {
      messages: []
    };
  },

  mounted() {
    let socket = io('wss://localhost:7155/api/messages/ws', {
      transports: ['websocket'],
      path: '/api/messages/ws'
    });

    socket.emit('test', 'again');

    socket.on('connect', () => {
      console.log('We connected!!!');
      socket.emit('test', 'again');
    });
  }
});
</script>

<template>
  <div>
    <div v-for="(i, message) in messages" :key="`message-${i}`">{{ message }}</div>
  </div>
</template>

<style scoped></style>
