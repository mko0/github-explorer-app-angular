/**
 * The type maps nullable properties to non-nullable properties.
 *
 * @example
 * ```typescript
 * type A = { a: string | null, b: number | null };
 * type B = NonNullableObject<A> // { a: string, b: number };
 * ```
 */
export type NonNullableObject<T> = {
  [P in keyof T]: NonNullable<T[P]>;
};
