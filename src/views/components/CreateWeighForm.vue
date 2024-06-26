<template>
  <div style="padding: 40px">
    <q-form ref="formRef" class="q-gutter-md" style="max-width: 500px" @submit="onSubmit">
      <q-btn-toggle v-model="form.canteen" label="食堂" toggle-color="primary" :options="canteenStore.options" />
      <q-select
        v-model="form.food"
        clearable
        options-dense
        label="食物"
        :options="form.foodOptions"
        :option-label="(opt) => `${opt.name} (${opt.aliases}) [￥${opt.price / 10}]`"
        use-input
        map-options
        filled
        style="max-width: 300px"
        :rules="[(val) => val || '请选择食物']"
        @filter="foodFilterFn"
      >
        <template #option="scope">
          <q-item v-bind="scope.itemProps">
            <q-item-section avatar>
              {{ scope.opt.name }}
            </q-item-section>
            <div class="q-gutter-x-xs">
              <TagList v-if="scope.opt.tag_ids.length > 0" :tags="scope.opt.tag_ids" class="inline-block" />
              <span> &#65509;{{ scope.opt.price / 10 }} </span>
              <span>{{ scope.opt.aliases.join(", ") }}</span>
            </div>
          </q-item>
        </template>
        <template #after>
          <q-btn round dense flat icon="add" @click="onAddFood" />
        </template>
        <template #hint>
          <TagList v-if="form.food" :tags="form.food.tag_ids" />
        </template>
      </q-select>
      <div style="display: flex">
        <span class="text-grey" style="width: 5em; min-width: 3em">最近</span>
        <span class="q-gutter-x-md">
          <template v-for="food in foodStore.recentFoods">
            <span
              v-if="food"
              :key="food.id"
              class="text-blue cursor-pointer inline-block"
              @click="onSelectRecentFood(food)"
            >
              {{ food.name }}
              <q-tooltip v-if="food.desc.length > 0">
                {{ food.desc }}
              </q-tooltip>
            </span>
          </template>
        </span>
      </div>
      <q-input
        ref="weightInputRef"
        v-model="form.weight"
        clearable
        label="重量"
        filled
        lazy-rules
        :rules="[(val) => (val != '' && !Number.isNaN(Number(val))) || '请输入重量']"
        style="max-width: 300px"
        @blur="onWeightBlur"
      >
        <template #hint>
          <div class="text-sm">
            <span class="text-grey">上一个：</span>
            <span v-if="form.prevWeight" class="text-blue cursor-pointer inline-block" @click="onPickWeight">
              {{ form.prevWeight }}
            </span>
          </div>
        </template>
      </q-input>
      <q-input v-model="form.record_date" label="日期" filled mask="####-##-##" style="max-width: 300px">
        <template #append>
          <q-icon name="event" class="cursor-pointer">
            <q-popup-proxy cover transition-show="scale" transition-hide="scale">
              <q-date v-model="form.record_date" minimal mask="YYYY-MM-DD" />
            </q-popup-proxy>
          </q-icon>
        </template>
        <template #before>
          <q-btn
            round
            dense
            flat
            icon="arrow_back"
            @click="form.record_date = formatDateToDay(date.subtractFromDate(form.record_date, { days: 1 }))"
          />
        </template>
        <template #after>
          <q-btn
            round
            dense
            flat
            icon="arrow_forward"
            @click="form.record_date = formatDateToDay(date.addToDate(form.record_date, { days: 1 }))"
          />
          <q-btn round dense flat icon="access_time" @click="autoDate" />
        </template>
      </q-input>
      <image-upload-box ref="uploaderRef" />
      <q-btn color="primary" type="submit">创建</q-btn>
      <ColorPickerField style="width: 220px" />
    </q-form>
  </div>
  <create-food-dialog ref="createFoodDialogRef" />
</template>

<script setup lang="ts">
import * as _ from "lodash-es";
import { QForm, QInput, date } from "quasar";

import ImageUploadBox from "@/components/tool/ImageUploadBox.vue";
import type { Food } from "@/interfaces";
import { matchesFood } from "@/services/matching";
import { useCanteenStore } from "@/stores/canteen";
import { useFoodStore } from "@/stores/food";
import { useWeighStore } from "@/stores/weigh";
import { formatDateToDay } from "@/utils/date-utils";
import Message from "@/utils/message";

import CreateFoodDialog from "./CreateFoodDialog.vue";

const canteenStore = useCanteenStore();
const foodStore = useFoodStore();
const weighStore = useWeighStore();

const formRef = ref<InstanceType<typeof QForm>>();
const weightInputRef = ref<InstanceType<typeof QInput>>();
const createFoodDialogRef = ref<InstanceType<typeof CreateFoodDialog>>();
const uploaderRef = ref<InstanceType<typeof ImageUploadBox>>();

const form = reactive({
  foodOptions: [] as Food[],
  canteen: undefined as int | undefined,
  food: undefined as Food | undefined,
  weight: "",
  prevWeight: undefined as int | undefined,
  record_date: formatDateToDay(new Date()),
});

watchEffect(() => {
  form.canteen ??= canteenStore.canteens[0]?.id;
});

const foodFilterFn = (val: string, update: any) => {
  update(() => {
    form.foodOptions = val ? foodStore.foods.filter((c) => matchesFood(val, c)) : foodStore.foods;
  });
};

const onSelectRecentFood = (food: Food) => {
  form.food = food;
};

const onPickWeight = () => {
  if (form.prevWeight) {
    form.weight! += form.prevWeight;
    weightInputRef.value?.focus();
    weightInputRef.value?.blur();
  }
};

const autoDate = () => {
  form.record_date = formatDateToDay(
    date.addToDate(_.maxBy(weighStore.weighs, (w) => w.record_date)!.record_date, { days: 1 })
  );
};

const onWeightBlur = () => {
  try {
    if (form.weight.endsWith("-")) {
      form.weight += form.prevWeight;
    }
    form.weight = eval(form.weight);
  } catch {
    // do-nothing
  }
};

const onAddFood = () => {
  createFoodDialogRef.value?.show().then((food) => {
    form.food = food;
  });
};

const onSubmit = async () => {
  try {
    const weight = parseInt(form.weight);
    const image = await uploaderRef.value!.upload();
    await weighStore.create({
      canteen_id: form.canteen!,
      food_id: form.food!.id,
      weight,
      record_date: form.record_date,
      image,
    });
    Message.success("成功创建记录");
    form.food = undefined;
    form.prevWeight = weight;
    form.weight = "";
    formRef.value?.reset();
    await foodStore.fetchRecent();
  } catch (e) {
    Message.error("创建失败");
  }
};
</script>

<style scoped></style>
