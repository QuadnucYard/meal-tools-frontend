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
    :filter-method="filterFn"
    :loading="loading"
  >
    <template #top-right>
      <search-box v-model="filter" />
    </template>
    <template #body-cell-images="props: { row: Food }">
      <q-td :props="props">
        <q-icon
          :name="props.row.images.length > 0 ? 'camera_alt' : 'o_camera_alt'"
          :color="props.row.images.length > 0 ? 'primary' : undefined"
          class="cursor-pointer"
          @click="startUpdateImages(props.row)"
        />
        <image-preview-tooltip :images="props.row.images" />
      </q-td>
    </template>
    <template #body-cell-name="props: { row: Food }">
      <q-td :props="props">
        {{ props.row.name }}
        <q-popup-edit v-model="props.row.name" auto-save :cover="false" #="scope">
          <q-input v-model="scope.value" dense autofocus @keyup.enter="scope.set" />
        </q-popup-edit>
      </q-td>
    </template>
    <template #body-cell-price="props: { row: Food }">
      <q-td :props="props">
        ￥{{ props.row.price / 10 }}
        <q-popup-edit v-model="props.row.price" auto-save :cover="false" #="scope">
          <q-input v-model="scope.value" dense autofocus clearable type="number" prefix="￥" @keyup.enter="scope.set" />
        </q-popup-edit>
      </q-td>
    </template>
    <template #body-cell-desc="props: { row: Food }">
      <q-td :props="props">
        {{ props.row.desc }}
        <q-popup-edit v-model="props.row.desc" auto-save :cover="false" #="scope">
          <q-input v-model="scope.value" dense autofocus clearable @keyup.enter="scope.set" />
        </q-popup-edit>
      </q-td>
    </template>
    <template #body-cell-handle="props: { row: Food }">
      <q-td :props="props">
        <q-btn flat dense round color="blue" icon="edit" size="sm" @click="onUpdateRow(props.row)" />
      </q-td>
    </template>
  </q-table>
  <update-food-image-dialog ref="imageUpdateDialogRef" />
</template>

<script setup lang="ts">
import { QTable } from "quasar";

import type { Food } from "@/interfaces";
import { matchesFood } from "@/services/food-match";
import { useFoodStore } from "@/stores/food";
import { formatDate } from "@/utils/date-utils";
import Message from "@/utils/message";
import { columnDefaults } from "@/utils/table-utils";

import UpdateFoodImageDialog from "./UpdateFoodImageDialog.vue";

const foodStore = useFoodStore();

const columns = columnDefaults(
  [
    { name: "id", label: "ID" },
    { name: "images", label: "图片", sortable: false },
    { name: "name", label: "名称" },
    { name: "aliases", label: "别名", format: (val: string[]) => val.join(", ") },
    { name: "price", label: "价格", format: (val: int) => `￥${val / 10}` },
    { name: "desc", label: "描述" },
    { name: "create_time", label: "创建时间", format: formatDate },
    { name: "update_time", label: "更新时间", format: formatDate },
    { name: "weight_cnt", label: "数量" },
    { name: "weight_avg", label: "平均（g）", format: (val: float) => val.toFixed(2) },
    { name: "weight_std", label: "标准差（g）", format: (val: float) => val.toFixed(2) },
    { name: "handle", label: "操作", sortable: false },
  ],
  { sortable: true, align: "center" }
);

const tableRef = ref<QTable>();
const imageUpdateDialogRef = ref<InstanceType<typeof UpdateFoodImageDialog>>();

const loading = ref(false);
const filter = ref("");

const filterFn = (
  rows: readonly Food[],
  terms: string,
  cols: readonly any[],
  getCellValue: (col: any, row: any) => any
) => {
  // 参数就是传给table的行列和filter
  return rows.filter((r) => matchesFood(terms, r));
};

const onUpdateRow = async (row: Food) => {
  await foodStore.update(row);
  Message.success("成功更新食物信息");
};

const startUpdateImages = (row: Food) => {
  imageUpdateDialogRef.value?.show(row);
};
</script>

<style scoped>
.q-table .q-chip {
  font-size: 13px;
}
</style>
