import { getLocalStorage } from "@/helpers/getLocalStorage";

import { mockLocalStorage } from "@tests/__mocks__/localStorage.mock";

describe("getLocalStorage", () => {
  beforeEach(() => {
    mockLocalStorage.clear();
  });

  afterEach(() => {
    mockLocalStorage.clear();
  });

  it("should return parsed data when key exists", () => {
    const testData = { name: "test", value: 123 };
    mockLocalStorage.setItem("test-key", JSON.stringify(testData));

    const result = getLocalStorage("test-key");

    expect(result).toEqual(testData);
  });

  it("should return null when key does not exist", () => {
    const result = getLocalStorage("non-existent-key");

    expect(result).toBeNull();
  });

  it("should parse arrays correctly", () => {
    const testArray = [1, 2, 3, 4, 5];
    mockLocalStorage.setItem("test-array", JSON.stringify(testArray));

    const result = getLocalStorage("test-array");

    expect(result).toEqual(testArray);
  });

  it("should parse strings correctly", () => {
    const testString = "hello world";
    mockLocalStorage.setItem("test-string", JSON.stringify(testString));

    const result = getLocalStorage("test-string");

    expect(result).toBe(testString);
  });

  it("should parse boolean values correctly", () => {
    mockLocalStorage.setItem("test-bool", JSON.stringify(true));

    const result = getLocalStorage("test-bool");

    expect(result).toBe(true);
  });
});
