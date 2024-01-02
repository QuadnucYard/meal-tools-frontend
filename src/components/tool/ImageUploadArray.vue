<template>
  <div class="q-gutter-xs">
    <image-upload-box
      v-for="(image, index) in usedImages"
      :key="image"
      :initial="image"
      @add="(img) => onAdd(img, index)"
      @remove="onRemove(index)"
    />
  </div>
</template>

<script setup lang="ts">
import { CutImage } from "vue-img-cutter";

import { uploadImages } from "@/api/upload";

import ImageUploadBox from "./ImageUploadBox.vue";

const props = defineProps<{
  images: string[];
}>();

const usedImages = ref<(string | undefined)[]>([undefined]);
const imagesToUpload = shallowRef<(Blob | undefined)[]>([undefined]);

onMounted(() => {
  usedImages.value = [...props.images, undefined];
  imagesToUpload.value = usedImages.value.map(() => undefined);
});

const onAdd = (img: CutImage, index: int) => {
  imagesToUpload.value[index] = img.blob;
  if (index === usedImages.value.length - 1) {
    usedImages.value.push(undefined);
  }
};

const onRemove = (index: int) => {
  usedImages.value.removeAt(index);
  imagesToUpload.value.removeAt(index);
};

// 上传更新的部分，返回所有
const upload = async () => {
  // 找上传的文件
  const toUpload = imagesToUpload.value.filter((t) => t) as Blob[];
  const urls = toUpload.length > 0 ? await uploadImages(toUpload) : [];
  // 将结果拼回去
  let j = 0;
  const result = usedImages.value.slice(0, -1).map((t, i) => (imagesToUpload.value[i] ? urls[j++] : t!));
  return result;
};

defineExpose({ upload });
</script>

<style scoped></style>
