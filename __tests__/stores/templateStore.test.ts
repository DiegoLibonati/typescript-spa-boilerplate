import { TemplateStore, templateStore } from "@/stores/templateStore";

describe("TemplateStore", () => {
  let store: TemplateStore;

  beforeEach(() => {
    store = new TemplateStore({ counter: 0 });
  });

  describe("initial state", () => {
    it("should initialize with a counter of 0", () => {
      expect(store.get("counter")).toBe(0);
    });

    it("should return the full state with getState", () => {
      expect(store.getState()).toEqual({ counter: 0 });
    });
  });

  describe("addCounter", () => {
    it("should increase the counter by the given value", () => {
      store.addCounter(3);
      expect(store.get("counter")).toBe(3);
    });

    it("should accumulate multiple additions", () => {
      store.addCounter(2);
      store.addCounter(5);
      expect(store.get("counter")).toBe(7);
    });

    it("should increase by 1 when called with 1", () => {
      store.addCounter(1);
      expect(store.get("counter")).toBe(1);
    });
  });

  describe("subtractCounter", () => {
    it("should decrease the counter by the given value", () => {
      store.addCounter(10);
      store.subtractCounter(4);
      expect(store.get("counter")).toBe(6);
    });

    it("should allow the counter to go negative", () => {
      store.subtractCounter(5);
      expect(store.get("counter")).toBe(-5);
    });

    it("should accumulate multiple subtractions", () => {
      store.subtractCounter(2);
      store.subtractCounter(3);
      expect(store.get("counter")).toBe(-5);
    });
  });

  describe("restartCounter", () => {
    it("should reset the counter to 0", () => {
      store.addCounter(10);
      store.restartCounter();
      expect(store.get("counter")).toBe(0);
    });

    it("should reset a negative counter to 0", () => {
      store.subtractCounter(7);
      store.restartCounter();
      expect(store.get("counter")).toBe(0);
    });
  });

  describe("cleanup", () => {
    it("should reset the counter to 0", () => {
      store.addCounter(7);
      store.cleanup();
      expect(store.get("counter")).toBe(0);
    });
  });

  describe("subscribe", () => {
    it("should call the listener when the counter changes", () => {
      const mockListener = jest.fn();
      store.subscribe("counter", mockListener);
      store.addCounter(1);
      expect(mockListener).toHaveBeenCalledTimes(1);
      expect(mockListener).toHaveBeenCalledWith(1);
    });

    it("should not call the listener when the counter value does not change", () => {
      const mockListener = jest.fn();
      store.subscribe("counter", mockListener);
      store.setState({ counter: 0 });
      expect(mockListener).not.toHaveBeenCalled();
    });

    it("should call multiple listeners for the same key", () => {
      const mockListener1 = jest.fn();
      const mockListener2 = jest.fn();
      store.subscribe("counter", mockListener1);
      store.subscribe("counter", mockListener2);
      store.addCounter(1);
      expect(mockListener1).toHaveBeenCalledWith(1);
      expect(mockListener2).toHaveBeenCalledWith(1);
    });

    it("should stop calling the listener after unsubscribing", () => {
      const mockListener = jest.fn();
      const unsubscribe = store.subscribe("counter", mockListener);
      unsubscribe();
      store.addCounter(1);
      expect(mockListener).not.toHaveBeenCalled();
    });

    it("should only unsubscribe the correct listener when multiple are registered", () => {
      const mockListener1 = jest.fn();
      const mockListener2 = jest.fn();
      const unsubscribe1 = store.subscribe("counter", mockListener1);
      store.subscribe("counter", mockListener2);
      unsubscribe1();
      store.addCounter(1);
      expect(mockListener1).not.toHaveBeenCalled();
      expect(mockListener2).toHaveBeenCalledWith(1);
    });
  });

  describe("templateStore singleton", () => {
    afterEach(() => {
      templateStore.restartCounter();
    });

    it("should start with a counter of 0", () => {
      expect(templateStore.get("counter")).toBe(0);
    });

    it("should update the counter when addCounter is called", () => {
      templateStore.addCounter(5);
      expect(templateStore.get("counter")).toBe(5);
    });

    it("should reset the counter after cleanup", () => {
      templateStore.addCounter(3);
      templateStore.cleanup();
      expect(templateStore.get("counter")).toBe(0);
    });
  });
});
