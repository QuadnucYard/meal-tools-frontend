export interface Result<T> {
  message: string;
  data: T;
}

export interface Page<T> {
  /** Items in the requested page */
  items: T[];
  /** Total items */
  total: int;
  /** Page number, from 1 */
  page: int;
  /** Page size */
  size: int;
  /** Total pages */
  pages: int;
}

export interface Pagination {
  sortBy: string;
  descending: boolean;
  page: number;
  rowsPerPage: number;
}

export interface Canteen {
  id: int;
  name: string;
  aliases: string[];
}

export interface Food {
  id: int;
  name: string;
  aliases: string[];
  price: int;
  desc: string;
  images: string[];
  create_time: string;
  update_time: string;
  weight_cnt: float;
  weight_avg: float;
  weight_std: float;
}

export type FoodCreate = Pick<Food, "name" | "aliases" | "price" | "desc" | "images">;

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
