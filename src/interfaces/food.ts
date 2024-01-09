import { Tag } from "./tag";

export interface Food {
  id: int;
  name: string;
  aliases: string[];
  price: int;
  desc: string;
  tags: Tag[];
  images: string[];
  create_time: string;
  update_time: string;
  weight_cnt: float;
  weight_avg: float;
  weight_std: float;
}

export interface FoodCreate {
  name: string;
  aliases: string[];
  price: int;
  desc: string;
  tags: int[];
  images: string[];
}
