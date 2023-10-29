import { Weigh, WeighCreate, createWeigh, getWeighs } from "@/api/weigh";
import { defineStore } from "pinia";

export const useWeighStore = defineStore("weigh", () => {
  const weighs = ref<Weigh[]>([]);

  const create = async (weigh: WeighCreate) => {
    const result = await createWeigh(weigh);
    weighs.value.push(result);
    return result;
  };

  getWeighs().then((v) => (weighs.value = v));

  return { weighs, create };
});
