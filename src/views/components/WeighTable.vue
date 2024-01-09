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
    :pagination="initialPagination"
    :filter="filter"
    :filter-method="filterFn"
    :loading="loading"
  >
    <template #top-right>
      <search-box v-model="filter" />
    </template>
    <template #body-cell-image="props: { row: Weigh }">
      <q-td :props="props" auto-width>
        <q-icon
          :name="props.row.image ? 'camera_alt' : 'o_camera_alt'"
          :color="props.row.image && 'primary'"
          class="cursor-pointer"
          @click="startUpdateImage(props.row)"
        />
        <image-preview-tooltip v-if="props.row.image" :images="['/' + props.row.image]" />
      </q-td>
    </template>
    <template #body-cell-canteen="props: { row: Weigh }">
      <q-td :props="props">
        {{ canteenStore.get(props.row.canteen_id)?.name }}
        <q-popup-edit v-model="props.row.canteen_id" auto-save :cover="false" #="scope">
          <q-select v-model="scope.value" dense options-dense emit-value map-options :options="canteenStore.options" />
        </q-popup-edit>
      </q-td>
    </template>
    <template #body-cell-food="props: { row: Weigh }">
      <q-td :props="props">
        {{ foodStore.get(props.row.food_id)?.name }}
        <q-tooltip v-if="foodStore.get(props.row.food_id)?.desc.length > 0" :offset="[0, 0]">
          {{ foodStore.get(props.row.food_id)?.desc }}
        </q-tooltip>
        <q-popup-edit v-model="props.row.food_id" auto-save :cover="false" #="scope">
          <q-select v-model="scope.value" dense options-dense emit-value map-options :options="foodStore.options" />
        </q-popup-edit>
      </q-td>
    </template>
    <template #body-cell-weight="props: { row: Weigh }">
      <q-td :props="props">
        {{ props.row.weight }}
        <q-popup-edit v-model="props.row.weight" auto-save :cover="false" #="scope">
          <q-input v-model="scope.value" dense autofocus type="number" suffix="g" @keyup.enter="scope.set" />
        </q-popup-edit>
      </q-td>
    </template>
    <template #body-cell-record_date="props: { row: Weigh }">
      <q-td :props="props">
        {{ props.row.record_date }}
        <q-popup-proxy auto-save :cover="false">
          <q-date v-model="props.row.record_date" minimal mask="YYYY-MM-DD" />
        </q-popup-proxy>
      </q-td>
    </template>
    <template #body-cell-handle="props: { row: Weigh }">
      <q-td :props="props" auto-width>
        <q-btn flat dense round color="blue" icon="edit" size="sm" @click="onUpdateRow(props.row)" />
        <q-btn flat dense round color="red" icon="delete" size="sm" @click="onDeleteRow(props.row)" />
      </q-td>
    </template>
  </q-table>
  <weigh-image-update-dialog ref="imageUpdateDialogRef" />
</template>

<script setup lang="ts">
import { QTable } from "quasar";

import type { Weigh } from "@/interfaces";
import { matchesFood } from "@/services/food-match";
import { useCanteenStore } from "@/stores/canteen";
import { useFoodStore } from "@/stores/food";
import { useWeighStore } from "@/stores/weigh";
import { formatDate } from "@/utils/date-utils";
import Message from "@/utils/message";
import { columnDefaults } from "@/utils/table-utils";

import WeighImageUpdateDialog from "./UpdateWeighImageDialog.vue";

const canteenStore = useCanteenStore();
const foodStore = useFoodStore();
const weighStore = useWeighStore();

const columns = columnDefaults(
  [
    { name: "id", label: "ID" },
    { name: "image", label: "图片", sortable: false },
    { name: "canteen", label: "食堂" },
    { name: "food", label: "食物" },
    { name: "weight", label: "重量 (g)" },
    { name: "record_date", label: "记录时间" },
    { name: "create_time", label: "创建时间", format: formatDate },
    { name: "update_time", label: "更新时间", format: formatDate },
    { name: "handle", label: "操作", sortable: false },
  ],
  { sortable: true, align: "center" }
);

const initialPagination = {
  sortBy: "id",
  descending: true,
  page: 1,
  rowsPerPage: 10,
};

const tableRef = ref<QTable>();
const imageUpdateDialogRef = ref<InstanceType<typeof WeighImageUpdateDialog>>();

const loading = ref(false);
const filter = ref("");

const filterFn = (
  rows: readonly Weigh[],
  terms: string,
  cols: readonly any[],
  getCellValue: (col: any, row: any) => any
) => {
  // 参数就是传给table的行列和filter
  return rows.filter((r) => matchesFood(terms, foodStore.get(r.food_id)));
};

const onUpdateRow = async (row: Weigh) => {
  await weighStore.update(row);
  Message.success("成功更新记录");
};
const onDeleteRow = async (row: Weigh) => {
  await weighStore.remove(row);
  Message.success("成功删除记录");
};

const startUpdateImage = (row: Weigh) => {
  imageUpdateDialogRef.value?.show(row);
};
</script>

<style scoped>
.q-table .q-chip {
  font-size: 13px;
}
</style>
