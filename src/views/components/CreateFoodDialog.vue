<template>
  <q-dialog v-model="visible">
    <q-card style="width: 400px">
      <q-card-section>
        <div class="text-h6">创建食物</div>
      </q-card-section>
      <q-card-section class="q-gutter-md">
        <q-input v-model="food.name" label="名称" filled />
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
              marker-labels
              label
              label-always
              :min="0"
              :max="5"
              :step="0.5"
              snap
            />
          </q-item-section>
        </q-item>
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
  price: 2,
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
    food.price = food.price * 10;
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
