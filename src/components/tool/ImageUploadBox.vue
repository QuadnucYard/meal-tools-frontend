<template>
  <div class="inline-block">
    <q-btn flat class="upload-box" @click="cutterRef?.handleOpen">
      <template v-if="image || (initial && !ignoreInitial)">
        <q-img :src="image?.dataURL ?? initial" />
        <q-btn round flat size="sm" icon="clear" class="top right" @click.stop="handleClear" />
      </template>
      <q-icon v-else name="add" />
    </q-btn>
    <img-cutter @cutDown="cutDown" ref="cutterRef">
      <template #open> </template>
    </img-cutter>
  </div>
</template>

<script setup lang="ts">
import ImgCutter from "vue-img-cutter";
import type { CutImage } from "vue-img-cutter";

import { uploadImage } from "@/api/upload";
import Message from "@/utils/message";

const props = defineProps<{ initial?: string }>();

const cutterRef = ref<ImgCutter>();
const image = shallowRef<CutImage>();
const ignoreInitial = ref(false);

const emit = defineEmits<{
  add: [image: CutImage];
  remove: [image: CutImage];
}>();

const cutDown = async (img: CutImage) => {
  image.value = img;
  ignoreInitial.value = true;
  emit("add", image.value!);
};

const handleClear = () => {
  emit("remove", image.value!);
  image.value = undefined;
};

const upload = async () => {
  if (image.value) {
    try {
      return await uploadImage(image.value.blob);
    } catch (err) {
      Message.error("图片上传失败");
      return undefined;
    }
  }
  return undefined;
};

defineExpose({ image, upload });
</script>

<style scoped lang="scss">
.upload-box {
  $box-size: 100px;

  width: $box-size;
  height: $box-size;
  border: 2px dashed lightgray;
  border-radius: 8px;
  color: gray;
  padding: 0;

  .top {
    position: absolute;
    top: 0%;
    // left: 0%;
    // margin-left: -50px;
    // margin-top: -50px;

    // margin-left: -50px;
  }
  .right {
    position: absolute;
    right: 0%;
    // left: 0%;
    // margin-left: -50px;
    // margin-top: -50px;

    // margin-left: -50px;
  }
}
</style>
