<template>
  <div class="q-row q-gutter-xs">
    <q-badge v-for="tag in tags" align="middle">{{ tag.name }}</q-badge>
  </div>
</template>

<script setup lang="ts">
import type { Tag } from "@/interfaces";

const props = defineProps<{ tags: Tag[] }>();
</script>

<style scoped></style>
