import type { Weigh, WeighCreate } from "@/interfaces";

import api from "./request";

export async function getWeighs() {
  return (await api.get<Weigh[]>("/weigh")).data;
}

export async function createWeigh(payload: WeighCreate) {
  return (await api.post<Weigh>("/weigh", payload)).data;
}

export async function updateWeigh(payload: Weigh) {
  return (await api.put<Weigh>(`/weigh/${payload.id}`, payload)).data;
}

export async function deleteWeigh(id: int) {
  return (await api.delete<Weigh>(`/weigh/${id}`)).data;
}
