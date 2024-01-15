<template>
  <q-select
    v-model="modelValue"
    filled
    options-dense
    :label="label"
    use-input
    use-chips
    multiple
    input-debounce="0"
    new-value-mode="add-unique"
    :options="options"
    :option-label="labelFn"
    filter
  />
</template>

<script setup lang="ts" generic="T">
import { defineModel } from "vue";

defineProps<{
  label: string;
  options: T[];
  labelFn: (t: T) => string;
}>();

const modelValue = defineModel<T[]>({ required: true });
</script>

<style scoped></style>
