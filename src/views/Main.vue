<template>
  <div class="row">
    <q-card class="col-6">
      <q-card-section>
        <create-weigh-form />
      </q-card-section>
    </q-card>
    <q-card class="col-6">
      <q-card-section>
        <weigh-table />
      </q-card-section>
    </q-card>
  </div>
</template>

<script setup lang="ts">
import CreateWeighForm from "./components/CreateWeighForm.vue";
import WeighTable from "./components/WeighTable.vue";
</script>

<style scoped></style>
