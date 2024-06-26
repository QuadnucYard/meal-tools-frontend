import type { QTable } from "quasar";
import type { Ref } from "vue";

import type { Page, Pagination } from "@/interfaces";
import type { TablePagination, TableRequestProps } from "@/types/quasar";

export function addSSP(tableRef: Ref<QTable | undefined>) {
  return () => tableRef.value!.requestServerInteraction();
}

export function makePageScope<T>() {
  const pagination = ref<TablePagination>({
    sortBy: null,
    descending: false,
    page: 1,
    rowsPerPage: 20,
    rowsNumber: 0,
  }); // It MUST be REF!
  const loading = ref(false);
  const filter = ref("");
  const rows = ref<T[]>([]);
  return { rows, pagination, loading, filter };
}

export function makeRequester<T>(
  scope: { rows: Ref<T[]>; pagination: Ref<TablePagination>; loading: Ref<boolean> },
  getter: (pg: Pagination) => Promise<Page<T>>
) {
  return async function (prop: TableRequestProps) {
    scope.loading.value = true;
    const res = await getter(prop.pagination);
    scope.rows.value = res.items;
    scope.pagination.value = {
      rowsNumber: res.total,
      page: res.page,
      rowsPerPage: res.size,
      sortBy: prop.pagination.sortBy,
      descending: prop.pagination.descending,
    };
    scope.loading.value = false;
  };
}

export function castPagination(page: Pagination) {
  return {
    page: page.page,
    size: page.rowsPerPage,
    sort_by: page.sortBy,
    desc: page.descending,
  };
}
