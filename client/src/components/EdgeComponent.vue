<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'EdgeComponent',

  props: {
    edge: {
      type: String,
      required: true,
      validator(value: string) {
        return ['top', 'bottom', 'start', 'end'].includes(value);
      }
    }
  },

  computed: {
    css() {
      let css: string;

      switch (this.edge) {
        case 'top':
          css = `
            top: 0;

            width: 100%;
            left: 0;
            flex-direction: row;
          `;
          break;
        case 'bottom':
          css = `
            bottom: 0;

            width: 100%;
            left: 0;
            flex-direction: row;
          `;
          break;
        case 'start':
          css = `
            left: 0;

            height: 100%;
            top: 0;
            flex-direction: column;
          `;
          break;
        case 'end':
          css = `
            right: 0;

            height: 100%;
            top: 0;
            flex-direction: column;
          `;
          break;
        default:
          css = 'display: none;';
          break;
      }

      return `
        position: fixed;
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1;
        ${css}
      `;
    }
  }
});
</script>

<template>
  <div :style="css">
    <slot></slot>
  </div>
</template>

<style scoped></style>
