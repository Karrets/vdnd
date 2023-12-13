<script lang="ts">
import { defineComponent } from 'vue';

import Two from 'two.js';

// @ts-ignore
import addZUIListeners from '@/models/zuiEventListeners.js';
import { Group } from 'two.js/src/group';

export default defineComponent({
  username: 'RenderCanvas',

  data() {
    return {};
  },

  methods: {},

  mounted() {
    let two = new Two({
      fullscreen: true,
      autostart: true,
      domElement: this.$refs.canvas as HTMLElement
    });
    let stage = new Group();
    let draggable = [];

    draggable.push(new Two.Star(400, 400, 30, 50));
    draggable.push(new Two.Star(300, 300, 30, 50));

    two.add(stage);
    two.add(draggable);

    addZUIListeners(two, stage, draggable);

    stage.add(new Two.Circle(10, 10, 100));
    stage.add(new Two.Rectangle(200, 200, 100, 100));
  }
});
</script>

<template>
  <canvas ref="canvas"></canvas>
</template>

<style scoped></style>
