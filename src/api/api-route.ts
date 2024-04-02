import type { Indexable } from "@/interfaces";

import api from "./request";

export function createAPIRoute<T extends Indexable, TCreate = T, TUpdate extends Indexable = T>(prefix: string) {
  return {
    async gets() {
      return await api.get<T[], T[]>(prefix);
    },

    async create(payload: TCreate) {
      return await api.post<T, T>(prefix, payload);
    },

    async update(payload: TUpdate) {
      return await api.put<T, T>(`${prefix}/${payload.id}`, payload);
    },

    async remove(id: int) {
      return await api.delete<T, T>(`${prefix}/${id}`);
    },
  };
}
