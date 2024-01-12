interface FoodBase {
  name: string;
  aliases: string[];
  price: int;
  desc: string;
  tag_ids: int[];
  images: string[];
}

export interface Food extends FoodBase {
  id: int;
  create_time: string;
  update_time: string;
  weight_cnt: float;
  weight_avg: float;
  weight_std: float;
}

export interface FoodCreate extends FoodBase {}
