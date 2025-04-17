// cached-fetch.js
export class HttpHandlers {
    constructor(options = {}) {
      this.defaultOptions = {
        ttl: 10 * 60 * 1000, // 1 hour default
        cacheKeyPrefix: 'appCache_',
        allowStale: false,
        ...options
      };
      
      // Initialize cache versioning
      this.cacheVersion = 'v1';
    }
  
    async fetch(url, options = {}) {
      const cacheKey = this._getCacheKey(url);
      const cachedData = this._getFromCache(cacheKey);
      const now = Date.now();
  
      if (cachedData && !this._isExpired(cachedData, now)) {
        return cachedData.data;
      }
  
      try {
        const response = await fetch(url, options);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        
        const data = await response.json();
        this._saveToCache(cacheKey, data, options.ttl || this.defaultOptions.ttl);
        return data;
      } catch (error) {
        if (cachedData && this.defaultOptions.allowStale) {
          return cachedData.data;
        }
        throw error;
      }
    }
  
    _getCacheKey(url) {
      return `${this.defaultOptions.cacheKeyPrefix}${this.cacheVersion}_${btoa(url)}`;
    }
  
    _getFromCache(key) {
      const item = sessionStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    }
  
    _saveToCache(key, data, ttl) {
      const cacheData = {
        data,
        expires: Date.now() + ttl,
        timestamp: Date.now()
      };
      sessionStorage.setItem(key, JSON.stringify(cacheData));
    }
  
    _isExpired(cacheEntry, currentTime) {
      return currentTime > cacheEntry.expires;
    }
  
    // Clear all cached items for this application
    clearCache() {
      Object.keys(sessionStorage).forEach(key => {
        if (key.startsWith(this.defaultOptions.cacheKeyPrefix)) {
            sessionStorage.removeItem(key);
        }
      });
    }
  
    // Clear cache for specific URL
    clearCacheForUrl(url) {
      const key = this._getCacheKey(url);
      sessionStorage.removeItem(key);
    }
  }