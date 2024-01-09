export type * from "./canteen";
export type * from "./food";
export type * from "./weigh";
export type * from "./page";
export type * from "./tag";

export interface Indexable<T extends int | string = int> {
  id: T;
}

export interface Result<T> {
  message: string;
  data: T;
}
