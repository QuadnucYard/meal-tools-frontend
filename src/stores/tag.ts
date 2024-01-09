import { defineStore } from "pinia";
import PinyinMatch from "pinyin-match";

import { createTag, deleteTag, getTags, updateTag } from "@/api/tag";

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

  const getMatches = (key: string) => tags.value.filter((tag) => PinyinMatch.match(tag.name, key));

  return { tags, create, get, remove, update, getMatches };
});
