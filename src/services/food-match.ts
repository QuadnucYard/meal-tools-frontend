import PinyinMatch from "pinyin-match";

import { Food } from "@/interfaces";

export const matchesFood = (terms: string, food: Food) => {
  return PinyinMatch.match(food.name, terms) || food.aliases.some((a) => PinyinMatch.match(a, terms));
};

// export const
