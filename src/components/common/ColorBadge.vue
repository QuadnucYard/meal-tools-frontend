<template>
  <q-badge :color="color" :text-color="contrastBW(getPaletteColor(color))">
    <slot />
  </q-badge>
</template>

<script setup lang="ts">
import { useColorStore } from "@/stores/color";

const { getPaletteColor, contrastBW } = useColorStore();

defineProps<{ color: string }>();
</script>

<style scoped></style>
