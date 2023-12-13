<script lang="ts">
import { defineComponent } from 'vue';
import RenderCanvas from '@/components/RenderCanvas.vue';

export default defineComponent({
  username: 'IndexView',
  components: { RenderCanvas }
});
</script>

<template>
  <render-canvas></render-canvas>
</template>

<style scoped></style>
