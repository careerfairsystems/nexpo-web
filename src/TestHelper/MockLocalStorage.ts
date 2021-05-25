/**
 * Mocks localStorage so we can use it in testing
 */
class LocalStorageMock {
  store: Record<string, unknown>;

  constructor() {
    this.store = {};
  }

  clear() {
    this.store = {};
  }

  getItem(key) {
    return this.store[key] || null;
  }

  setItem(key, value) {
    this.store[key] = value.toString();
  }

  removeItem(key) {
    delete this.store[key];
  }
}

export const mockLocalStorage = () => {
  global.localStorage = new LocalStorageMock();
};
