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
  remover: (id: Id) => Promise<T>
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

  getter().then((v) => {
    items.value = v;
    itemMap.value = new Map(v.map((item) => [item.id, item]));
  });

  return { items, itemMap, get, create, update, remove };
}
