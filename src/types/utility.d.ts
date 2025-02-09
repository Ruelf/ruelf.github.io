export type Json = string | number | boolean | null | Json[] | Record<string, Json>;

export type FilterByType<T, Allowed> = {
    [K in keyof T as T[K] extends Allowed ? K : never]: T[K];
};
