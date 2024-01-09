<template>
  <q-select
    ref="selectRef"
    filled
    options-dense
    v-model="model"
    use-input
    use-chips
    multiple
    clearable
    input-debounce="0"
    @new-value="createValue"
    :options="filterOptions"
    option-label="name"
    option-value="id"
    @filter="filterFn"
    style="width: 250px"
    @add="selectRef.updateInputValue('')"
  />
</template>

<script setup lang="ts">
import { QSelect } from "quasar";

import { Tag } from "@/interfaces";
import { useTagStore } from "@/stores/tag";

const model = defineModel<Tag[]>();

const tagStore = useTagStore();

const filterOptions = ref(tagStore.tags);
const selectRef = ref<InstanceType<typeof QSelect>>();

onMounted(() => {
  filterOptions.value = tagStore.tags;
});

const filterFn: QSelect["onFilter"] = (val, update) => {
  update(() => {
    filterOptions.value = val === "" ? tagStore.tags : tagStore.getMatches(val);
  });
};

const createValue: QSelect["onNewValue"] = async (val, done) => {
  if (tagStore.tags.some((t) => t.name == val)) {
    // existent
    return;
  }
  const tag = await tagStore.create({ name: val });
  done(tag);
};
</script>

<style scoped></style>
