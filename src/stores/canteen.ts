import { Canteen, getCanteens } from "@/api/canteen";
import { defineStore } from "pinia";

export const useCanteenStore = defineStore("canteen", () => {
  const canteens = ref<Canteen[]>([]);

  getCanteens().then((v) => (canteens.value = v));

  return { canteens };
});
