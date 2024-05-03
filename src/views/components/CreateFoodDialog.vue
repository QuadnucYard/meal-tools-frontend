<template>
  <q-dialog v-model="visible">
    <q-card style="width: 400px">
      <q-card-section>
        <div class="text-h6">创建食物</div>
      </q-card-section>
      <q-card-section class="q-gutter-md">
        <q-form @submit="onConfirm">
          <q-input v-model="food.name" label="名称" filled :rules="[(val) => val != '' || '请输入名称']" />
          <q-select
            v-model="food.aliases"
            label="别名"
            filled
            use-input
            use-chips
            multiple
            hide-dropdown-icon
            input-debounce="0"
            new-value-mode="add"
          />
          <q-input v-model="food.desc" label="描述" type="textarea" filled />
          <q-item>
            <q-item-section avatar> 标签 </q-item-section>
            <q-item-section>
              <TagSelect v-model="food.tag_ids" />
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section avatar> 价格 </q-item-section>
            <q-item-section>
              <q-slider
                v-model="food.price"
                markers
                label
                label-always
                :label-value="(food.price / 10).toFixed(1)"
                :marker-labels="[
                  { value: 0, label: '0' },
                  { value: 10, label: '1' },
                  { value: 20, label: '2' },
                  { value: 30, label: '3' },
                  { value: 40, label: '4' },
                  { value: 50, label: '5' },
                ]"
                :min="0"
                :max="50"
                :step="1"
                snap
              />
            </q-item-section>
          </q-item>
        </q-form>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn v-close-popup flat label="取消" color="primary" />
        <q-btn v-close-popup flat label="创建" color="primary" @click="onConfirm" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import type { Food, FoodCreate } from "@/interfaces";
import { useFoodStore } from "@/stores/food";
import Message from "@/utils/message";

const foodStore = useFoodStore();

const visible = ref(false);

const food = reactive<FoodCreate>({
  name: "",
  aliases: [],
  price: 20,
  desc: "",
  images: [],
  tag_ids: [] as int[],
});

let promiseStatus: { resolve: any; reject: any } | undefined;

const show = () => {
  visible.value = true;
  return new Promise<Food>((resolve, reject) => {
    promiseStatus = { resolve, reject };
  });
};

const onConfirm = async () => {
  try {
    const result = await foodStore.create(food);
    Message.success("成功创建食物");
    promiseStatus?.resolve(result);
  } catch (e) {
    Message.error("创建失败");
  }
};

defineExpose({ show });
</script>

<style scoped></style>
