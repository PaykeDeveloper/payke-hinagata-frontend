export function notUndefined<T>(item: T | undefined): item is T {
  return item !== undefined;
}

export const joinString = (
  ...values: (string | number | undefined | null)[]
) => {
  return values.join('');
};
