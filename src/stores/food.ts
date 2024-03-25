import { defineStore } from "pinia";

import { createFood, getFoods, getRecentFoods, removeFood, updateFood, updateFoodTags } from "@/api/food";
import type { Food } from "@/interfaces";

import { useStoreAPI } from "./hook";
import { useSettingsStore } from "./settings";

export const useFoodStore = defineStore("food", () => {
  const { settings } = useSettingsStore();

  const {
    items: foods,
    itemMap: foodMap,
    get,
    create,
    update,
    remove,
    fetchAll,
  } = useStoreAPI(getFoods, createFood, updateFood, removeFood, { prefetch: false });

  const recentFoodIds = ref<int[]>([]);
  const recentFoods = computed(() => recentFoodIds.value.map((i) => foodMap.value.get(i)));

  const options = computed(() =>
    foods.value.map((opt) => ({
      label:
        opt.name +
        (opt.aliases.length > 0 ? ` (${opt.aliases})` : "") +
        (opt.price > 0 ? ` [￥${opt.price / 10}]` : ""),
      value: opt.id,
    }))
  );

  const updateTags = async (food: Food, tags: int[]) => {
    const result = await updateFoodTags(food.id, tags);
    Object.assign(food, result);
    return result;
  };

  const fetchRecent = async (limit?: int) => {
    recentFoodIds.value = await getRecentFoods(limit ?? settings.recentFoodLimit);
  };

  fetchAll().then(() => fetchRecent());

  watch(() => settings.recentFoodLimit, fetchRecent);

  return { foods, recentFoods, options, create, get, remove, update, updateTags, fetchAll, fetchRecent };
});
