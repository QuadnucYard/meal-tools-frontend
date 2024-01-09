interface WeighBase {
  canteen_id: int;
  food_id: int;
  weight: int;
  image?: string;
}

export interface WeighCreate extends WeighBase {
  record_date: string;
}

export interface Weigh extends WeighBase {
  id: int;
  record_date: string;
  create_time: string;
  update_time: string;
}
