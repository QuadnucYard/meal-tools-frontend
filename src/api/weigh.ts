import type { Weigh, WeighCreate } from "@/interfaces";

import api from "./request";

export async function getWeighs() {
  return await api.get<Weigh[], Weigh[]>("/weigh");
}

export async function createWeigh(payload: WeighCreate) {
  return await api.post<Weigh, Weigh>("/weigh", payload);
}

export async function updateWeigh(payload: Weigh) {
  return await api.put<Weigh, Weigh>(`/weigh/${payload.id}`, payload);
}

export async function deleteWeigh(id: int) {
  return await api.delete<Weigh, Weigh>(`/weigh/${id}`);
}
