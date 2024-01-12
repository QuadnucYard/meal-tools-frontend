<template>
  <q-field dense :standout="`bg-${modelValue} text-${contrastBW(modelHex)}`">
    <template #control>
      <div class="q-gutter-x-xs">
        <q-badge :color="modelValue" :text-color="contrastBW(modelHex)">{{ modelValue }}</q-badge>
        <q-badge :color="modelValue" :text-color="contrastBW(modelHex)">{{ modelHex }}</q-badge>
      </div>
    </template>
    <template #append>
      <q-icon name="colorize" class="cursor-pointer">
        <q-popup-proxy cover transition-show="scale" transition-hide="scale">
          <ColorVariablePicker v-model="modelValue" v-model:hex="modelHex" style="width: 200px" />
        </q-popup-proxy>
      </q-icon>
    </template>
  </q-field>
</template>

<script setup lang="ts">
import { useColorStore } from "@/stores/color";

import ColorVariablePicker from "./ColorVariablePicker.vue";

const { contrastBW } = useColorStore();

const modelValue = defineModel<string>({ default: "primary" });
const modelHex = defineModel<string>("hex", { default: useColorStore().palette[0] });
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
