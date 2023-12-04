<script lang="ts">
import { defineComponent } from 'vue';

import Two from 'two.js';
import Projector from '@/models/Projector';

export default defineComponent({
  name: 'RenderCanvas',

  data() {
    return {
      projector: {} as Projector
    };
  },

  methods: {},

  mounted() {
    this.projector = new Projector([], {
      fullscreen: true,
      autostart: true,
      domElement: this.$refs.canvas as HTMLCanvasElement
    });

    this.projector.add(new Two.Circle(10, 10, 100), true);
    this.projector.add(new Two.Rectangle(200, 200, 100, 100));
    console.log(this.projector);
  }
});
</script>

<template>
  <canvas ref="canvas"></canvas>
</template>

<style scoped></style>
