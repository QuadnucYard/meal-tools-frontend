<template>
  <div class="row q-ma-sm">
    <q-card class="col-md-4 col-12">
      <q-card-section>
        <create-weigh-form />
      </q-card-section>
    </q-card>
    <q-card class="col-md-8 col-12">
      <q-card-section>
        <food-table />
      </q-card-section>
      <q-separator />
      <q-card-section>
        <weigh-table />
      </q-card-section>
      <q-separator />
      <q-card-section>
        <tag-table />
      </q-card-section>
    </q-card>
  </div>
</template>

<script setup lang="ts">
import CreateWeighForm from "./components/CreateWeighForm.vue";
import FoodTable from "./components/FoodTable.vue";
import TagTable from "./components/TagTable.vue";
import WeighTable from "./components/WeighTable.vue";
</script>

<style scoped></style>
