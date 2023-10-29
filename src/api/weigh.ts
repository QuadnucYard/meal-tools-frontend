import api from "./request";

interface WeighBase {
  canteen_id: int;
  food_id: int;
  weight: int;
}

export interface WeighCreate extends WeighBase {
  record_date: string;
}

export interface Weigh extends WeighBase {
  id: int;
  record_date: string;
  create_time: string;
}

export async function createWeigh(payload: WeighCreate) {
  return (await api.post<Weigh>("/weigh", payload)).data;
}
