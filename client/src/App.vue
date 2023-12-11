<script lang="ts">
import { defineComponent } from 'vue';
import EdgeComponent from "@/components/EdgeComponent.vue";
import ChatBox from "@/components/ChatBox.vue";

export default defineComponent({
  name: 'App',
  components: {ChatBox, EdgeComponent }
});
</script>

<template>
  <edge-component edge="top">
    <header>
      <nav>
        <img src="@/assets/logo.svg" alt="">
        <router-link to="/">Home</router-link>
      </nav>
    </header>
  </edge-component>

  <edge-component edge="bottom">
    <chat-box></chat-box>
  </edge-component>

  <router-view />
</template>

<style scoped></style>
