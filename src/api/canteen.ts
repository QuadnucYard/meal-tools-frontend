import type { Canteen } from "@/interfaces";

import api from "./request";

export async function getCanteens() {
  return (await api.get<Canteen[]>("/canteen")).data;
}
