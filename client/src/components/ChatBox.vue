<script lang="ts">
import {defineComponent} from 'vue'
import io from 'socket.io-client';

export default defineComponent({
  name: "ChatBox",
  data() {
    return {
      socket: io(),
      userMessage: '',
      messages: [],
    }
  },

  methods: {
    sendChat() {
      this.socket.emit('chat-message', this.userMessage);
      this.userMessage = '';
    },

    receiveChat(msg) {
      this.messages.push(msg)
    }
  },

  mounted() {
    this.socket.on('chat-message', this.receiveChat)
  }
})
</script>

<template>
  <div>
    <ul>
      <li v-for="message in messages">{{ message }}</li>
    </ul>
    <form @submit.prevent="sendChat">
      <input v-model="userMessage" type="text" autocomplete="off">
      <input type="submit" value="Send">
    </form>
  </div>
</template>

<style scoped>

</style>