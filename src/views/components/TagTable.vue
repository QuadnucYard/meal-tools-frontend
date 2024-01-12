<template>
  <q-table
    ref="tableRef"
    title="标签"
    :rows="tagStore.tags"
    :columns="columns"
    row-key="id"
    binary-state-sort
    square
    flat
    dense
    class="my-sticky-table-handle"
    :pagination="initialPagination"
    :filter="filter"
    :filter-method="filterFn"
    :loading="loading"
  >
    <template #top-right>
      <search-box v-model="filter" />
    </template>
    <template #body-cell-category="props: { row: Tag }">
      <q-td :props="props">
        {{ props.row.category }}
        <q-popup-edit v-model="props.row.category" auto-save :cover="false" #="scope">
          <q-input v-model="scope.value" dense autofocus @keyup.enter="scope.set" />
        </q-popup-edit>
      </q-td>
    </template>
    <template #body-cell-name="props: { row: Tag }">
      <q-td :props="props">
        <color-badge :color="props.row.color">{{ props.row.name }}</color-badge>
        <q-popup-edit v-model="props.row.name" auto-save :cover="false" #="scope">
          <q-input v-model="scope.value" dense autofocus @keyup.enter="scope.set" />
        </q-popup-edit>
      </q-td>
    </template>
    <template #body-cell-color="props: { row: Tag }">
      <q-td :props="props">
        <color-badge :color="props.row.color">{{ props.row.color }}</color-badge>
        <q-popup-edit v-model="props.row.color" auto-save :cover="false" #="scope">
          <ColorVariablePicker v-model="scope.value" style="width: 200px" />
        </q-popup-edit>
      </q-td>
    </template>
    <template #body-cell-handle="props: { row: Tag }">
      <q-td :props="props" auto-width>
        <q-btn flat dense round color="blue" icon="edit" size="sm" @click="onUpdateRow(props.row)" />
        <q-btn flat dense round color="red" icon="delete" size="sm" @click="onDeleteRow(props.row)" />
      </q-td>
    </template>
  </q-table>
</template>

<script setup lang="ts">
import { QTable } from "quasar";

import type { Tag } from "@/interfaces";
import { useTagStore } from "@/stores/tag";
import { formatDate } from "@/utils/date-utils";
import Message from "@/utils/message";
import { columnDefaults } from "@/utils/table-utils";

const tagStore = useTagStore();

const columns = columnDefaults(
  [
    { name: "id", label: "ID" },
    { name: "name", label: "名称" },
    { name: "category", label: "类别" },
    { name: "color", label: "颜色", sortable: false },
    { name: "create_time", label: "创建时间", format: formatDate },
    { name: "update_time", label: "更新时间", format: formatDate },
    { name: "handle", label: "操作", sortable: false },
  ],
  { sortable: true, align: "center" }
);

const initialPagination = {
  sortBy: "id",
  descending: false,
  page: 1,
  rowsPerPage: 10,
};

const tableRef = ref<QTable>();
const loading = ref(false);
const filter = ref("");

const filterFn = (
  rows: readonly Tag[],
  terms: string,
  cols: readonly any[],
  getCellValue: (col: any, row: any) => any
) => {
  return rows;
  // return rows.filter((r) => matchesFood(terms, foodStore.get(r.food_id)));
};

const onUpdateRow = async (row: Tag) => {
  await tagStore.update(row);
  Message.success("成功更新标签");
};
const onDeleteRow = async (row: Tag) => {
  await tagStore.remove(row);
  Message.success("成功删除标签");
};
</script>

<style scoped>
.q-table .q-chip {
  font-size: 13px;
}
</style>
