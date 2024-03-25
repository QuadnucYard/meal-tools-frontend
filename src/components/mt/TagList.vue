<template>
  <div class="q-row q-gutter-xs">
    <color-badge v-for="tag in tagObjs" :key="tag.id" align="middle" :color="tag.color">{{ tag.name }}</color-badge>
  </div>
</template>

<script setup lang="ts">
import { useTagStore } from "@/stores/tag";

const props = defineProps<{ tags: int[] }>();

const tagStore = useTagStore();

const tagObjs = computed(() => props.tags.map(tagStore.get).filter(Boolean));
</script>

<style scoped></style>
