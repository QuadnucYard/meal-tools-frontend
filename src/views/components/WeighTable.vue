<template>
  <q-table
    ref="tableRef"
    title="称饭记录"
    :rows="weighStore.weighs"
    :columns="columns"
    row-key="id"
    binary-state-sort
    square
    flat
    dense
    class="my-sticky-table-handle"
    :filter="filter"
    :loading="loading"
  >
    <template v-slot:top-right>
      <q-input borderless dense debounce="300" v-model="filter" placeholder="Search">
        <template v-slot:append>
          <q-icon name="search" />
        </template>
      </q-input>
    </template>
    <template #body-cell-is_superuser="props">
      <q-td :props="props">
        <q-checkbox
          dense
          v-model="props.row.is_superuser"
          checked-icon="star"
          unchecked-icon="star_border"
          indeterminate-icon="help"
          color="red"
          :disable="true"
        />
      </q-td>
    </template>
    <!-- <template #body-cell-handle="props">
      <q-td :props="props">
        <q-btn flat dense round color="blue" icon="edit" size="sm" @click="onUpdateEdit(props.row)" />
      </q-td>
    </template> -->
  </q-table>
</template>

<script setup lang="ts">
import { Weigh } from "@/api/weigh";
import { useCanteenStore } from "@/stores/canteen";
import { useFoodStore } from "@/stores/food";
import { useWeighStore } from "@/stores/weigh";
import { formatDate } from "@/utils/date-utils";
import { columnDefaults } from "@/utils/table-utils";
import { QTable } from "quasar";

const canteenStore = useCanteenStore();
const foodStore = useFoodStore();
const weighStore = useWeighStore();

const columns = columnDefaults(
  [
    { name: "id", label: "ID" },
    { name: "canteen", label: "食堂", field: (row: Weigh) => canteenStore.get(row.canteen_id)?.name },
    { name: "food", label: "食物", field: (row: Weigh) => foodStore.get(row.food_id)?.name },
    { name: "weight", label: "重量 (g)" },
    { name: "record_date", label: "记录时间" },
    { name: "create_time", label: "创建时间", format: formatDate },
    { name: "handle", label: "操作", sortable: false },
  ],
  { sortable: true, align: "center" }
);

const tableRef = ref<QTable>();

const loading = ref(false);
const filter = ref("");
</script>

<style scoped>
.q-table .q-chip {
  font-size: 13px;
}
</style>
