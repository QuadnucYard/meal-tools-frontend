import _ from "lodash-es";
import { defineStore } from "pinia";

import { Food, FoodCreate, createFood, getFoods, getRecentFoods, updateFood } from "@/api/food";

export const useFoodStore = defineStore("food", () => {
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

  getFoods().then((v) => {
    foods.value = v;
    foodDict.value = _.keyBy(v, "id");
  });

  const fetchRecent = async (limit: int) => {
    recentFoods.value = await getRecentFoods(limit);
  };

  return { foods, recentFoods, options, create, get, update, fetchRecent };
});
