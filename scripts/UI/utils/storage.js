// @ts-check

import { STORAGEKEY } from "../constants/storage.js";

/**
 * @typedef {{
 *   value: any,
 *   expiry: number,
 *   timestamp: number
 * }} StorageItem
 */

/**
 * @typedef {Object} StorageInterface
 * @property {number} defaultExpiry
 * @property {<T>(key: string, value: T, expiry?: number) => boolean} setItem
 * @property {<T>(key: string) => T | null} getItem
 * @property {(key: string) => boolean} isValidKey
 * @property {() => void} removeExpiredItems
 * @property {() => void} clearCache
 * @property {(id: string) => boolean} setPolicyNumber
 * @property {() => string | null} getPolicyNumber
 */

/** @type {StorageInterface} */
export const Storage = {
  defaultExpiry: 20 * 60 * 1000,

  /**
   * @template T
   * @param {string} key
   * @param {T} value
   * @param {number} [expiry]
   */
  setItem(key, value, expiry = Storage.defaultExpiry) {
    try {
      const item = {
        value,
        expiry: Date.now() + expiry,
        timestamp: Date.now(),
      };
      sessionStorage.setItem(key, JSON.stringify(item));
      return true;
    } catch (error) {
      console.error("Storage Error:", error);
      return false;
    }
  },

  /**
   * @template T
   * @param {string} key
   * @returns {T | null}
   */
  getItem(key) {
    try {
      const itemStr = sessionStorage.getItem(key);
      if (!itemStr) return null;

      const item = /** @type {StorageItem} */ (JSON.parse(itemStr));
      if (Date.now() > item.expiry) {
        sessionStorage.removeItem(key);
        return null;
      }

      return /** @type {T} */ (item.value);
    } catch (error) {
      console.error("Storage Error:", error);
      return null;
    }
  },

  /**
   * @param {string} key
   * @returns {boolean}
   */
  isValidKey(key) {
    return Storage.getItem(key) !== null;
  },

  removeExpiredItems() {
    Object.keys(sessionStorage).forEach(key => {
      Storage.getItem(key);
    });
  },

  clearCache() {
    sessionStorage.clear();
  },

  /**
   * @param {string} id
   * @returns {boolean}
   */
  setPolicyNumber(id) {
    return Storage.setItem(STORAGEKEY.POLICY_NUMBER, id);
  },

  /**
   * @returns {string | null}
   */
  getPolicyNumber() {
    return Storage.getItem(STORAGEKEY.POLICY_NUMBER);
  }
};

// Cleanup timer using private class field (ES2022 feature)
let /** @type {number | undefined} */ cleanupTimer;
setInterval(Storage.removeExpiredItems, 20 * 60 * 1000);

export default Storage;