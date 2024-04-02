<template>
  <q-dialog v-if="food" v-model="visible">
    <q-card style="width: 400px">
      <q-card-section>
        <div class="text-h6">更新食物图片</div>
      </q-card-section>
      <q-card-section>
        <image-upload-array ref="uploaderRef" :images="food.images" />
      </q-card-section>
      <q-card-actions align="right">
        <q-btn v-close-popup flat label="取消" color="primary" />
        <q-btn v-close-popup flat label="确认" color="primary" @click="onConfirm" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import ImageUploadArray from "@/components/tool/ImageUploadArray.vue";
import type { Food } from "@/interfaces";
import { useFoodStore } from "@/stores/food";
import Message from "@/utils/message";

const uploaderRef = ref<InstanceType<typeof ImageUploadArray>>();

const visible = ref(false);
const food = ref<Food>();

const foodStore = useFoodStore();

const show = (data: Food) => {
  food.value = data;
  visible.value = true;
};

const onConfirm = async () => {
  if (!food.value) return;
  const images = await uploaderRef.value?.upload();
  if (images) {
    food.value.images = images;
    await foodStore.update(food.value);
    Message.success("图片更新成功");
  }
};

defineExpose({ show });
</script>

<style scoped></style>
