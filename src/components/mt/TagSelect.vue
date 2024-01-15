<template>
  <q-select
    ref="selectRef"
    v-model="model"
    filled
    options-dense
    use-input
    use-chips
    multiple
    clearable
    input-debounce="0"
    :options="filterOptions"
    option-label="name"
    option-value="id"
    emit-value
    style="width: 250px"
    @new-value="createValue"
    @filter="filterFn"
    @add="selectRef!.updateInputValue('')"
  >
    <template #option="scope">
      <q-item v-bind="scope.itemProps">
        <color-badge :color="scope.opt.color">{{ scope.opt.name }}</color-badge>
      </q-item>
    </template>
    <template #selected-item="scope">
      <q-chip
        removable
        dense
        :tabindex="scope.tabindex"
        :color="tagStore.get(scope.opt).color"
        :text-color="contrastBW(tagStore.get(scope.opt).color)"
        class="q-ma-none"
        @remove="scope.removeAtIndex(scope.index)"
      >
        {{ tagStore.get(scope.opt).name }}
      </q-chip>
    </template>
  </q-select>
</template>

<script setup lang="ts">
import { QSelect } from "quasar";

import { useColorStore } from "@/stores/color";
import { useTagStore } from "@/stores/tag";

const tagStore = useTagStore();
const { contrastBW } = useColorStore();

const model = defineModel<int[]>();

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
    return; // existent
  }
  const tag = await tagStore.create({ name: val, category: undefined, color: "grey" });
  done(tag);
};
</script>

<style scoped></style>
