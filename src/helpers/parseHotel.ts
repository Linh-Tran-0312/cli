// @ts-nocheck
const getNestedValue = (obj, keys) => {
  return keys.reduce((accumulator, key) => {
    return accumulator && typeof accumulator === 'object' && key in accumulator
      ? accumulator[key]
      : undefined;
  }, obj);
};

export function parseHotel(rawData, dataMap) {
  const output = {};

  for (const key in dataMap) {
    const value = dataMap[key];
    if (key === '[supplier]') {
      output[key] = value;

    } else if (typeof value === 'string') {
      output[key] = rawData[value];

    } else if (Array.isArray(value)) {
      output[key] = getNestedValue(rawData, value);

    } else if (typeof value === 'object' && value !== null) {

      if (value.hasOwnProperty('[path]')) {
        const path = value['[path]'];
        const objMap = value['[map]'];
        const nestedValue = Array.isArray(path)
          ? getNestedValue(rawData, path)
          : rawData[path];

        if (Array.isArray(nestedValue)) {
          output[key] = nestedValue.map((item) => {
            return Object.entries(objMap).reduce((acc, [mapKey, mapValue]) => {
              acc[mapKey] = item[mapValue];
              return acc;
            }, {});
          });
        }

      } else {
        output[key] = parseHotel(rawData, value);
      }
    }
  }

  return output;
}
