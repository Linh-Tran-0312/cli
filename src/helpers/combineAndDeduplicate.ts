const getValidArray = (arr: any) => {
  if (Array.isArray(arr)) return arr;
  return [];
};

export const mergeStringArray = (
  arrA: string[],
  arrB: string[],
  processStringFn?: (str: string) => string
) => {
  const combinedArray = [...getValidArray(arrA), ...getValidArray(arrB)];
  return [...new Set(combinedArray.map((str) => processStringFn ? processStringFn(str) : str))];
};

export const mergeObjectArray = <T extends Record<string, any>>(
  arrA: T[],
  arrB: T[],
  key: keyof T
): T[] => {
    const combinedArray = [...getValidArray(arrA), ...getValidArray(arrB)];
  return [...new Map(combinedArray.map((item) => [item[key], item])).values()];
};
