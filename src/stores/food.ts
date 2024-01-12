import _ from "lodash-es";
import { defineStore } from "pinia";

import { createFood, getFoods, getRecentFoods, updateFood, updateFoodTags } from "@/api/food";
import type { Food, FoodCreate, Tag } from "@/interfaces";

import { useSettingsStore } from "./settings";

export const useFoodStore = defineStore("food", () => {
  const { settings } = useSettingsStore();

  const foods = ref<Food[]>([]);
  const foodDict = ref<{ [id: int]: Food }>({});
  const recentFoods = ref<Food[]>([]);

  const options = computed(() =>
    foods.value.map((opt) => ({
      label:
        opt.name +
        (opt.aliases.length > 0 ? ` (${opt.aliases})` : "") +
        (opt.price > 0 ? ` [￥${opt.price / 10}]` : ""),
      value: opt.id,
    }))
  );

  const get = (id: int) => foodDict.value[id];

  const create = async (food: FoodCreate) => {
    const result = await createFood(food);
    foods.value.push(result);
    foodDict.value[result.id] = result;
    return result;
  };

  const update = async (food: Food) => {
    const result = await updateFood(food);
    Object.assign(food, result);
    return result;
  };

  const updateTags = async (food: Food, tags: Tag[]) => {
    const result = await updateFoodTags(
      food.id,
      tags.map((t) => t.id)
    );
    Object.assign(food, result);
    return result;
  };

  const fetchRecent = async (limit?: int) => {
    recentFoods.value = await getRecentFoods(limit ?? settings.recentFoodLimit);
  };

  getFoods().then((v) => {
    foods.value = v;
    foodDict.value = _.keyBy(v, "id");
  });

  fetchRecent();

  watch(() => settings.recentFoodLimit, fetchRecent);

  return { foods, recentFoods, options, create, get, update, updateTags, fetchRecent };
});
