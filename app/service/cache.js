'use strict';
const LRU = require('lru-cache')
const DEFAULT_MAX_AGE = 1 * 1000 * 60
const options = {
  max: 500,
  maxAge: DEFAULT_MAX_AGE
}
const Cache = LRU(options)

const Service = require('egg').Service;

class CacheService extends Service {
  verifyCodeCache(key, length, maxAge=DEFAULT_MAX_AGE) {
    const code = Array.from({ length }, () => Math.ceil(Math.random() * 9)).join('')
    return this.create(key, code, maxAge) && code
  }
  create(key, value, maxAge = DEFAULT_MAX_AGE) {
    return Cache.set(key, value, maxAge)
  }
  get (key) {
    return Cache.get(key)
  }
  del (key) {
    return Cache.del(key)
  }
  has (key) {
    return Cache.has(key)
  }
}

module.exports = CacheService;
