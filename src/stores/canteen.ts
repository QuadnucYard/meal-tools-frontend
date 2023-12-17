import _ from "lodash-es";
import { defineStore } from "pinia";

import { getCanteens } from "@/api/canteen";
import { Canteen } from "@/interfaces";

export const useCanteenStore = defineStore("canteen", () => {
  const canteens = ref<Canteen[]>([]);
  const canteenDict = ref<{ [id: int]: Canteen }>({});

  const options = computed(() =>
    canteens.value.map((opt) => ({
      label: opt.name + (opt.aliases.length > 0 ? ` (${opt.aliases})` : ""),
      value: opt.id,
    }))
  );

  const get = (id: int) => canteenDict.value[id];

  getCanteens().then((v) => {
    canteens.value = v;
    canteenDict.value = _.keyBy(v, "id");
  });

  return { canteens, get, options };
});
