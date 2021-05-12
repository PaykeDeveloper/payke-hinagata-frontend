import { formatUtcToZoned, formatZonedToUtc } from 'src/base/dateFormat';

export function notUndefined<T>(item: T | undefined): item is T {
  return item !== undefined;
}

export const joinString = (
  ...values: (string | number | undefined | null)[]
) => {
  return values.join('');
};

export const objectToInputs = <T extends object>(
  obj: T,
  rules: { [K in keyof T]?: 'dateTime' }
) => {
  const inputs = { ...obj };
  for (const [k, rule] of Object.entries(rules)) {
    const key = k as keyof T;
    if (!(key in obj)) {
      continue;
    }
    const value: unknown = inputs[key];
    switch (rule) {
      case 'dateTime': {
        if (typeof value === 'string') {
          inputs[key] = formatUtcToZoned(value, "yyyy-MM-dd'T'HH:mm") as any;
        }
        break;
      }
    }
  }
  return inputs;
};

export const inputsToObject = <T extends object>(
  inputs: T,
  rules: { [K in keyof T]?: 'dateTime' }
) => {
  const obj = { ...inputs };
  for (const [k, rule] of Object.entries(rules)) {
    const key = k as keyof T;
    if (!(key in obj)) {
      continue;
    }
    const value: unknown = obj[key];
    switch (rule) {
      case 'dateTime': {
        if (typeof value === 'string') {
          obj[key] = formatZonedToUtc(value) as any;
        }
        break;
      }
    }
  }
  return obj;
};

export const convertListToObject = <K extends keyof any, T>(
  values: T[],
  key: keyof T
) => {
  const result = {} as any;
  for (const value of values) {
    const k = value[key];
    result[k] = value;
  }
  return result as Record<K, T>;
};
