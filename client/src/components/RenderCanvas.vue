<script lang="ts">
import { defineComponent } from 'vue';

import Two from 'two.js';
import ZUIfy from '@/models/ZUI';

export default defineComponent({
  name: 'RenderCanvas',

  data() {
    return {
      two: new Two({
        fullscreen: true,
        autostart: true,
        type: Two.Types.canvas
      }),

      canvas: {} as HTMLCanvasElement,
      stage: {} as any,
      shapes: {} as any
    };
  },

  methods: {
    mouseMoved(e: MouseEvent) {
      let rect = this.canvas.getBoundingClientRect();
      let pos = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
      this.shapes['myCircle'].position.set(pos.x, pos.y);
    }
  },

  mounted() {
    this.two.appendTo(this.$refs.canvasContainer as HTMLDivElement);

    this.canvas = this.two.renderer.domElement;
    this.stage = new Two.Group([(this.shapes['myCircle'] = new Two.Circle(0, 0, 10))]);

    for (let i = 0; i < 100; i++) {
      this.stage.add(new Two.Line(10 * i, 0, 10 * i, 100));
    }

    this.two.add(this.stage);
    ZUIfy(this.two, this.stage);
  }
});
</script>

<template>
  <div @mousemove="mouseMoved" ref="canvasContainer"></div>
</template>

<style scoped></style>
