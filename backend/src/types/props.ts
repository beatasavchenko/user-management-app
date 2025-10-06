import { SortableColumn } from "@shared/types/sortableColumn";

export type GetAllUsersParams = {
  search?: string;
  sortBy?: SortableColumn;
  order?: "asc" | "desc";
};
