import { defineStore } from "pinia";

import { createTag, deleteTag, getTags, updateTag } from "@/api/tag";
import { matchesTag } from "@/services/matching";

import { useStoreAPI } from "./hook";

export const useTagStore = defineStore("tag", () => {
  const {
    items: tags,
    itemMap: tagMap,
    get,
    create,
    update,
    remove,
  } = useStoreAPI(getTags, createTag, updateTag, deleteTag);

  const getMatches = (key: string) => tags.value.filter((tag) => matchesTag(key, tag));

  return { tags, create, get, remove, update, getMatches };
});