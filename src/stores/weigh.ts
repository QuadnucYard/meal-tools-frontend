import { Weigh, WeighCreate, createWeigh, getWeighs } from "@/api/weigh";
import _ from "lodash-es";
import { defineStore } from "pinia";

export const useWeighStore = defineStore("weigh", () => {
  const weighs = ref<Weigh[]>([]);
  const weighDict = ref<{ [id: int]: Weigh }>({});

  const get = (id: int) => weighDict.value[id];

  const create = async (weigh: WeighCreate) => {
    const result = await createWeigh(weigh);
    weighs.value.push(result);
    weighDict.value[result.id] = result;
    return result;
  };

  getWeighs().then((v) => {
    weighs.value = v;
    weighDict.value = _.keyBy(v, "id");
  });

  return { weighs, create, get };
});
