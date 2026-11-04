/** Project-wide shared TypeScript types live here. */

export type Nullable<T> = T | null;

export type AsyncResult<T> =
  { status: "success"; data: T } | { status: "error"; error: string };
