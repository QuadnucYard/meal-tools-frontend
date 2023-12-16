import { defineStore } from "pinia";

export const useSettingsStore = defineStore("settings", () => {
  const settings = reactive({
    recentFoodLimit: 15,
  });

  return { settings };
});
