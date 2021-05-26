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

  getItem(key: string) {
    return this.store[key] || null;
  }

  setItem(key: string, value) {
    this.store[key] = value.toString();
  }

  removeItem(key: string) {
    delete this.store[key];
  }
}

const mockLocalStorage = (): void => {
  global.localStorage = new LocalStorageMock();
};

export default mockLocalStorage;
