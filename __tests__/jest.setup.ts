import "@testing-library/jest-dom";

import { mockLocalStorage } from "@tests/__mocks__/localStorage.mock";

const mockFetch = jest.fn();

Object.defineProperty(global, "localStorage", {
  value: {
    getItem: mockLocalStorage.getItem,
    setItem: mockLocalStorage.setItem,
    removeItem: mockLocalStorage.removeItem,
    clear: mockLocalStorage.clear,
    key: mockLocalStorage.key,
    length: mockLocalStorage.length,
  },
  writable: true,
});

global.fetch = mockFetch;
