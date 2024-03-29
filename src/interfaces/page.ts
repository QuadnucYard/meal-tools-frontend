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
