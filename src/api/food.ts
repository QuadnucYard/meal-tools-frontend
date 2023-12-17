import type { Food, FoodCreate } from "@/interfaces";

import api from "./request";

export async function getFoods() {
  return await api.get<Food[], Food[]>("/food");
}

export async function createFood(payload: FoodCreate) {
  return await api.post<Food, Food>("/food", payload);
}

export async function updateFood(payload: Food) {
  return await api.put<Food, Food>(`/food/${payload.id}`, payload);
}

export async function getRecentFoods(limit: int) {
  return await api.get<Food[], Food[]>("/food/rec", { params: { limit } });
}
