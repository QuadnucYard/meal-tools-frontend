import { Indexable } from "@/interfaces";

export function useStoreAPI<
  Id extends number | string,
  T extends Indexable<Id>,
  TCreate,
  TUpdate extends Indexable<Id>,
>(
  getter: () => Promise<T[]>,
  creator: (item: TCreate) => Promise<T>,
  updater: (item: TUpdate) => Promise<T>,
  remover: (id: Id) => Promise<T>,
  options: { prefetch: boolean } = { prefetch: true }
) {
  const items = ref([]) as Ref<T[]>;
  const itemMap = ref(new Map()) as Ref<Map<Id, T>>;

  const get = (id: Id) => itemMap.value.get(id)!;

  const create = async (item: TCreate) => {
    const result = await creator(item);
    items.value.push(result);
    itemMap.value.set(result.id, result);
    return result;
  };

  const update = async (item: TUpdate) => {
    const result = await updater(item);
    Object.assign(item, result);
    return result;
  };

  const remove = async (item: T) => {
    const result = await remover(item.id);
    items.value.removeOne(item);
    itemMap.value.delete(item.id);
    return result;
  };

  const fetchAll = async () => {
    const results = await getter();
    items.value = results;
    itemMap.value = new Map(results.map((item) => [item.id, item]));
  };

  if (options?.prefetch) {
    fetchAll();
  }

  return { items, itemMap, get, create, update, remove, fetchAll };
}
