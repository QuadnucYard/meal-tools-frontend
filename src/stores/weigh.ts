import { defineStore } from "pinia";

import { createWeigh, deleteWeigh, getWeighs, updateWeigh } from "@/api/weigh";

import { useStoreAPI } from "./hook";

export const useWeighStore = defineStore("weigh", () => {
  const {
    items: weighs,
    get,
    create,
    update,
    remove,
    fetchAll,
  } = useStoreAPI(getWeighs, createWeigh, updateWeigh, deleteWeigh);

  return { weighs, create, get, remove, update, fetchAll };
});
