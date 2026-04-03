const storage = new Map<string, string>();

const mockLocalStorageGetItem = jest.fn(
  (key: string): string | null => storage.get(key) ?? null
);
const mockLocalStorageSetItem = jest.fn((key: string, value: string): void => {
  storage.set(key, value);
});
const mockLocalStorageRemoveItem = jest.fn((key: string): void => {
  storage.delete(key);
});
const mockLocalStorageClear = jest.fn((): void => {
  storage.clear();
});
const mockLocalStorageKey = jest.fn((index: number): string | null => {
  const keys = Array.from(storage.keys());
  return keys[index] ?? null;
});

export const mockLocalStorage = {
  getItem: mockLocalStorageGetItem,
  setItem: mockLocalStorageSetItem,
  removeItem: mockLocalStorageRemoveItem,
  clear: mockLocalStorageClear,
  key: mockLocalStorageKey,
  get length(): number {
    return storage.size;
  },
};
