<template>
  <q-dialog v-model="visible">
    <q-card style="max-width: 300px">
      <q-card-section>
        <div class="text-h6">创建食物</div>
      </q-card-section>
      <q-card-section class="q-gutter-md">
        <q-input v-model="food.name" label="名称" filled />
        <q-select
          label="别名"
          filled
          v-model="food.aliases"
          use-input
          use-chips
          multiple
          hide-dropdown-icon
          input-debounce="0"
          new-value-mode="add"
        />
        <q-input v-model="food.desc" label="描述" type="textarea" filled />
        <q-input v-model.number="food.price" label="价格" type="number" :min="0" filled />
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="取消" color="primary" v-close-popup />
        <q-btn flat label="创建" color="primary" v-close-popup @click="onConfirm" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { Food, FoodCreate, createFood } from "@/api/food";
import { useFoodStore } from "@/stores/food";
import Message from "@/utils/message";

const visible = ref(false);

const food = reactive<FoodCreate>({
  name: "",
  aliases: [],
  price: 2,
  desc: "",
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
    const foodStore = useFoodStore();
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
