<script lang="ts">
import { defineComponent } from 'vue';
import EdgeComponent from '@/components/EdgeComponent.vue';

export default defineComponent({
  name: 'App',
  components: { EdgeComponent }
});
</script>

<template>
  <edge-component edge="top">
    <header>
      <nav>
        <router-link to="/">Home</router-link>
      </nav>
    </header>
  </edge-component>

  <router-view />
</template>

<style scoped></style>
