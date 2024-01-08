<template>
  <q-input borderless dense debounce="300" v-model="filter" placeholder="Search" clearable>
    <template #prepend>
      <q-icon name="search" />
    </template>
  </q-input>
</template>

<script setup lang="ts">
const filter = defineModel<string>();
</script>

<style scoped>
.q-input {
  max-width: 180px;
}
</style>
