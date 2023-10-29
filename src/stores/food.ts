import { Food, FoodCreate, createFood, getFoods } from "@/api/food";
import { defineStore } from "pinia";

export const useFoodStore = defineStore("food", () => {
  const foods = ref<Food[]>([]);

  const create = async (food: FoodCreate) => {
    const result = await createFood(food);
    foods.value.push(result);
    return result;
  };

  getFoods().then((v) => (foods.value = v));

  return { foods, create };
});
