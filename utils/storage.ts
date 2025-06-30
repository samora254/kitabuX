
let AsyncStorage: any;

try {
  // Try to import AsyncStorage
  AsyncStorage = require('@react-native-async-storage/async-storage').default;
} catch (error) {
  console.warn('AsyncStorage not available, using fallback');
  // Fallback for web/development
  AsyncStorage = {
    async getItem(key: string): Promise<string | null> {
      if (typeof window !== 'undefined') {
        return localStorage.getItem(key);
      }
      return null;
    },
    async setItem(key: string, value: string): Promise<void> {
      if (typeof window !== 'undefined') {
        localStorage.setItem(key, value);
      }
    },
    async removeItem(key: string): Promise<void> {
      if (typeof window !== 'undefined') {
        localStorage.removeItem(key);
      }
    },
  };
}

export { AsyncStorage };
