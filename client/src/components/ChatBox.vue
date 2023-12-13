<script lang="ts">
import { defineComponent, nextTick } from 'vue';
import io from 'socket.io-client';
import Message from '#/models/Message';
import {
  IButton,
  ICard,
  IForm,
  IInput,
  ITable,
  useToast
} from '@inkline/inkline';
import axios from 'axios';

const toast = useToast();

export default defineComponent({
  username: 'ChatBox',
  components: { IForm, ITable, IInput, IButton, ICard },
  data() {
    return {
      socket: io(),
      sending: false,
      userMessage: new Message(),
      messages: [] as Message[]
    };
  },

  props: {
    username: String
  },

  methods: {
    sendChat() {
      if (this.userMessage.content.length > 0 && this.username) {
        this.sending = true;
        this.socket.emit(
          'chat-message',
          this.userMessage.withSender(this.username)
        );
      }
    },

    receiveChat(message: Message) {
      this.messages.push(message);
    }
  },

  mounted() {
    axios
      .get('/api/chat/get')
      .catch((err) => console.error(err))
      .then((value) => {
        value.data.forEach((m) => this.messages.push(new Message(m)));
      });

    this.socket.on('chat-message', (data) => {
      this.receiveChat(new Message(data));

      nextTick(() => {
        let newMessage = this.$refs[
          `message-${data.id}`
        ] as HTMLTableRowElement[];
        if (newMessage) newMessage.forEach((r) => r.scrollIntoView());
      });
    });

    this.socket.on('send-failed', (data) => {
      toast.show({
        title: 'Oh Snap!',
        message: 'Something went wrong, please try again in a moment...',
        color: 'danger'
      });
      console.error(data.err);
      this.userMessage = new Message(data.msg);
      this.sending = false;
    });
    this.socket.on('send-succeed', (_) => {
      console.log(this.userMessage);
      this.userMessage = new Message();
      this.sending = false;
    });
  }
});
</script>

<template>
  <i-card class="_border-bottom-radius:0 chatCard">
    <i-table class="messages" striped condensed>
      <tbody ref="scrollbox" class="_overflow:auto">
        <tr
          v-for="message in messages"
          :ref="`message-${message.id}`"
          class="_display:flex chatMessage">
          <td>{{ message.sender }}:</td>
          <td class="_flex-grow:1 messageContent">{{ message.content }}</td>
        </tr>
      </tbody>
    </i-table>
    <i-form id="chatEntry" class="entry" @submit.prevent="sendChat">
      <i-form-group>
        <i-input
          v-model="userMessage.content"
          type="text"
          placeholder="Say something..."
          autocomplete="off"
          :readonly="sending">
          <template #append>
            <i-button
              tag="input"
              type="submit"
              value="Send"
              :loading="sending"
              :color="userMessage.content.length === 0 ? '' : 'primary'"
              :disabled="userMessage.content.length === 0">
            </i-button>
          </template>
        </i-input>
      </i-form-group>
    </i-form>
  </i-card>
</template>

<style scoped lang="scss">
.chatMessage {
  .messageContent {
    overflow-wrap: anywhere;
  }
}

.chatCard {
  width: 20vw;
}

.messages {
  max-height: 60vh;
  overflow-y: scroll;
  overscroll-behavior-y: contain;
  scroll-snap-type: y proximity;

  > * {
    scroll-snap-align: end;
  }
}
</style>
