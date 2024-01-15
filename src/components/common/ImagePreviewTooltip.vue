<template>
  <q-tooltip
    anchor="top middle"
    self="bottom middle"
    :offset="[0, -10]"
    class="bg-transparent"
    style="overflow: hidden"
  >
    <div class="glass-tooltip">
      <img v-for="(image, index) in images" :key="index" :src="image" :alt="image" class="q-ma-xs mini-image" />
    </div>
  </q-tooltip>
</template>

<script setup lang="ts">
defineProps<{ images: string[] }>();
</script>

<style scoped>
.glass-tooltip {
  background-color: #77777777;
  border: gray;
  border-radius: 4px;
}
.mini-image {
  width: 100px;
  height: 100px;
}
</style>
