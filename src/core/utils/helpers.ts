export const getFirstDefinded = <T extends any>(...args: T[]): T => {
  return args.find((arg) => arg !== undefined) as T;
};
