<script lang="ts">
import { defineComponent } from 'vue';
import RenderCanvas from '@/components/RenderCanvas.vue';
import ChatWidget from '@/components/ChatWidget.vue';
import EdgeComponent from '@/components/EdgeComponent.vue';

export default defineComponent({
  name: 'IndexView',
  components: { EdgeComponent, ChatWidget, RenderCanvas }
});
</script>

<template>
  <main>
    <render-canvas></render-canvas>
    <edge-component edge="bottom">
      <chat-widget class="chatbox"></chat-widget>
    </edge-component>
  </main>
</template>

<style scoped>
.chatbox {
  width: 400px;
  height: 250px;
}
</style>
