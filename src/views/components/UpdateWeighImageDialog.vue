<template>
  <q-dialog v-if="weigh" v-model="visible">
    <q-card style="width: 400px">
      <q-card-section>
        <div class="text-h6">更新图片</div>
      </q-card-section>
      <q-card-section>
        <image-upload-box ref="uploaderRef" :initial="weigh.image" />
      </q-card-section>
      <q-card-actions align="right">
        <q-btn v-close-popup flat label="取消" color="primary" />
        <q-btn v-close-popup flat label="确认" color="primary" @click="onConfirm" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import ImageUploadBox from "@/components/tool/ImageUploadBox.vue";
import { Weigh } from "@/interfaces";
import { useWeighStore } from "@/stores/weigh";
import Message from "@/utils/message";

const uploaderRef = ref<InstanceType<typeof ImageUploadBox>>();

const visible = ref(false);
const weigh = ref<Weigh>();

const weighStore = useWeighStore();

const show = (data: Weigh) => {
  weigh.value = data;
  visible.value = true;
};

const onConfirm = async () => {
  if (!weigh.value) return;
  const image = await uploaderRef.value?.upload();
  if (image) {
    weigh.value.image = image;
    await weighStore.update(weigh.value);
    Message.success("图片更新成功");
  }
};

defineExpose({ show });
</script>

<style scoped></style>
