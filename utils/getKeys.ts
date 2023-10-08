/**
 * Object.keys() の型安全版
 * @param obj オブジェクト
 * @returns `obj` のキーの配列（`string` ではなく `keyof T` の配列）
 */
export const getKeys = <T extends { [key: string]: unknown }>(
  obj: T,
): (keyof T)[] => {
  return Object.keys(obj);
};
