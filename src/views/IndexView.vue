<script lang="ts">
import { defineComponent } from 'vue'
import EdgeComponent from '@/components/EdgeComponent.vue'

export default defineComponent({
  name: 'IndexView',
  components: { EdgeComponent }
})
</script>

<template>
  <edge-component edge="top">
    <p>Test</p>
  </edge-component>
  <edge-component edge="bottom">
    <p>Test</p>
  </edge-component>
  <edge-component edge="start">
    <p>Test</p>
  </edge-component>
  <edge-component edge="end">
    <p>Test</p>
  </edge-component>
</template>

<style scoped></style>
