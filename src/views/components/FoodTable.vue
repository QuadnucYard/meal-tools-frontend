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
    :visible-columns="visibleColumns"
  >
    <template #top-left>
      <div class="q-table__title">食物</div>
      <q-btn flat round size="sm" icon="refresh" @click="foodStore.fetchAll()" />
    </template>
    <template #top-right>
      <div>
        <q-toggle v-model="visibleColumns" val="create_time" label="创建时间" />
        <q-toggle v-model="visibleColumns" val="update_time" label="更新时间" />
      </div>
      <q-space />
      <search-box v-model="filter" class="q-ml-md" />
    </template>
    <template #body-cell-images="props: { row: Food }">
      <q-td :props="props" auto-width>
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
    <template #body-cell-tags="props: { row: Food }">
      <q-td :props="props">
        <TagList :tags="props.row.tag_ids" />
        <q-popup-edit
          v-model="props.row.tag_ids"
          buttons
          #="scope"
          @save="(val: int[]) => handleUpdateFoodTags(props.row, val)"
        >
          <TagSelect v-model="scope.value" autofocus />
          <!-- 这里如果加了keyup.enter会响应属于内层的事件 -->
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
      <q-td :props="props" auto-width>
        <q-btn flat dense round color="blue" icon="edit" size="sm" @click="onUpdateRow(props.row)" />
        <q-btn flat dense round color="red" icon="delete" size="sm" @click="onDeleteRow(props.row)" />
      </q-td>
    </template>
  </q-table>
  <update-food-image-dialog ref="imageUpdateDialogRef" />
</template>

<script setup lang="ts">
import { QTable } from "quasar";

import { getFoodRc } from "@/api/food";
import type { Food } from "@/interfaces";
import { matchesFood } from "@/services/matching";
import { useFoodStore } from "@/stores/food";
import { formatDate } from "@/utils/date-utils";
import Message from "@/utils/message";
import { columnDefaults } from "@/utils/table-utils";

import UpdateFoodImageDialog from "./UpdateFoodImageDialog.vue";

const $q = useQuasar();

const foodStore = useFoodStore();

const columns = columnDefaults(
  [
    { name: "id", label: "ID" },
    { name: "images", label: "图片", sortable: false },
    { name: "name", label: "名称" },
    { name: "aliases", label: "别名", format: (val: string[]) => val.join(", "), sortable: false },
    { name: "price", label: "价格", format: (val: int) => `￥${val / 10}` },
    { name: "tags", label: "标签" },
    { name: "desc", label: "描述", sortable: false },
    { name: "create_time", label: "创建时间", format: formatDate, required: false },
    { name: "update_time", label: "更新时间", format: formatDate, required: false },
    { name: "weight_cnt", label: "数量" },
    { name: "weight_avg", label: "平均（g）", format: (val?: float) => val?.toFixed(2) },
    { name: "weight_std", label: "标准差（g）", format: (val?: float) => val?.toFixed(2) },
    { name: "handle", label: "操作", sortable: false },
  ],
  { sortable: true, align: "center", required: true }
);

const visibleColumns = ref<string[]>([]);

const tableRef = ref<QTable>();
const imageUpdateDialogRef = ref<InstanceType<typeof UpdateFoodImageDialog>>();

const loading = ref(false);
const filter = ref("");

const filterFn = (rows: readonly Food[], terms: string) => {
  return rows.filter((r) => matchesFood(terms, r));
};

const onUpdateRow = async (row: Food) => {
  await foodStore.update(row);
  Message.success("成功更新食物信息");
};

const onDeleteRow = async (row: Food) => {
  const rc = await getFoodRc(row.id);
  const hint = rc === 0 ? "可以安全删除" : "";
  $q.dialog({
    title: "删除食物",
    message: `<p>确定要删除 <span class="text-primary text-bold">[${row.name}] (id: ${row.id})</span> 吗？</p>
              <p class="${rc > 0 ? "text-red" : "text-green"}">引用次数：${rc} ${hint}</p>`,
    html: true,
    cancel: true,
  }).onOk(async () => {
    await foodStore.remove(row);
    Message.success("成功删除食物");
  });
};

const startUpdateImages = (row: Food) => {
  imageUpdateDialogRef.value?.show(row);
};

const handleUpdateFoodTags = async (row: Food, tags: int[]) => {
  await foodStore.updateTags(row, tags);
  Message.success("成功更新食物标签");
};
</script>

<style scoped>
.q-table .q-chip {
  font-size: 13px;
}
</style>
