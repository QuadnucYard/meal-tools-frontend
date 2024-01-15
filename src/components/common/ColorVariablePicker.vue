<template>
  <q-color
    v-model="modelHex"
    no-footer
    default-view="palette"
    class="my-color-picker"
    :palette="paddedPalette"
    @update:model-value="onUpdateModelValue"
  />
</template>

<script setup lang="ts">
import { useColorStore } from "@/stores/color";

const { paddedPalette, hexToPalette } = useColorStore();

const modelValue = defineModel<string>({ default: "primary" });
const modelHex = defineModel<string>("hex", { default: useColorStore().paddedPalette[0] });

const onUpdateModelValue = (val: string | null) => {
  if (val) {
    modelValue.value = hexToPalette[val];
  }
};
</script>

<style lang="scss">
.my-color-picker {
  .q-color-picker__cube {
    padding-bottom: calc(100% / 15);
    width: calc(100% / 15) !important;
    &:not([style]) {
      pointer-events: none;
    }
  }
  input {
    pointer-events: none;
  }
}
</style>
