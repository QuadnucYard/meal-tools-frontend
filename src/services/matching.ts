import PinyinMatch from "pinyin-match";

import { Food, Tag } from "@/interfaces";

export const matchesFood = (terms: string, food: Food) => {
  return Boolean(PinyinMatch.match(food.name, terms)) || food.aliases.some((a) => PinyinMatch.match(a, terms));
};

export const matchesTag = (terms: string, tag: Tag) => {
  return Boolean(PinyinMatch.match(tag.name, terms));
};
