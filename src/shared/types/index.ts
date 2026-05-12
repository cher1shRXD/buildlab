export type Id = string;

export type Nullable<T> = T | null;

export type PageUrlProps<
  TParams extends Record<string, string> = Record<string, string>,
  TSearch extends Record<string, string> = Record<string, string>,
> = {
  params: Promise<TParams>;
  searchParams: Promise<TSearch>;
};

export type RouteHandlerProps<
  TParams extends Record<string, string> = Record<string, string>,
> = {
  params: Promise<TParams>;
};

export type ErrorResponse = {
  message: string;
  code?: string;
};

export type Pagination<T> = {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
};
