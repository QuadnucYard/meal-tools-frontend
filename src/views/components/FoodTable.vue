<template>
  <q-table
    ref="tableRef"
    title="食物"
    :rows="foodStore.foods"
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
    <!-- <template #body-cell-handle="props">
      <q-td :props="props">
        <q-btn flat dense round color="blue" icon="edit" size="sm" @click="onUpdateEdit(props.row)" />
      </q-td>
    </template> -->
  </q-table>
</template>

<script setup lang="ts">
import { useFoodStore } from "@/stores/food";
import { formatDate } from "@/utils/date-utils";
import { columnDefaults } from "@/utils/table-utils";
import { QTable } from "quasar";

const foodStore = useFoodStore();

const columns = columnDefaults(
  [
    { name: "id", label: "ID" },
    { name: "name", label: "名称" },
    { name: "aliases", label: "别名", format: (val: string[]) => val.join(", ") },
    { name: "price", label: "价格", format: (val: int) => `￥${val / 10}` },
    { name: "desc", label: "描述" },
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
