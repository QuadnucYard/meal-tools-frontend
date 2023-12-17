import type { Food, FoodCreate } from "@/interfaces";

import api from "./request";

export async function getFoods() {
  return (await api.get<Food[]>("/food")).data;
}

export async function createFood(payload: FoodCreate) {
  return (await api.post<Food>("/food", payload)).data;
}

export async function updateFood(payload: Food) {
  return (await api.put<Food>(`/food/${payload.id}`, payload)).data;
}

export async function getRecentFoods(limit: int) {
  return (await api.get<Food[]>("/food/rec", { params: { limit } })).data;
}
