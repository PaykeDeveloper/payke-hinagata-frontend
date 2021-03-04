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
    const value: unknown = inputs[key];
    switch (rule) {
      case 'dateTime': {
        if (typeof value === 'string') {
          inputs[key] = formatUtcToZoned(value, "yyyy-MM-dd'T'HH:mm") as any;
        }
      }
    }
  }
  return inputs;
};

export const inputsToObject = <T extends object>(
  inputs: T,
  keys: (keyof T)[]
) => {
  const obj = { ...inputs };
  for (const key of keys) {
    if (key in obj) {
      const value: unknown = obj[key];
      if (typeof value === 'string') {
        obj[key] = formatZonedToUtc(value) as any;
      }
    }
  }
  return obj;
};
