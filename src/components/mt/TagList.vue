<template>
  <div class="q-row q-gutter-xs">
    <color-badge v-for="tag in tags" align="middle" :color="tag.color">{{ tag.name }}</color-badge>
  </div>
</template>

<script setup lang="ts">
import type { Tag } from "@/interfaces";

const props = defineProps<{ tags: Tag[] }>();
</script>

<style scoped></style>
