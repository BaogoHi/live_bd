'use strict'

const LRU = require('lru-cache')

const DEFAULT_MAX_AGE = 1 * 1000 * 60

const options = {
  max: 500,
  maxAge: DEFAULT_MAX_AGE
}

const Cache = LRU(options)

const Service = require('egg').Service

class CacheService extends Service {
  /**
   * 缓存验证码
   * @param {String} key 验证码
   * @param {Int} length 验证码长度
   * @param {Int} maxAge 最长缓存时间
   */
  verifyCodeCache(key, length, maxAge=DEFAULT_MAX_AGE) {
    const code = Array.from({ length }, () => Math.ceil(Math.random() * 9)).join('')
    return this.create(key, code, maxAge) && code
  }

  /**
   * 创建缓存
   * @param {String} key 缓存key
   * @param {String} value 缓存value
   * @param {Int} maxAge 最长缓存时间
   */
  create(key, value, maxAge = DEFAULT_MAX_AGE) {
    return Cache.set(key, value, maxAge)
  }

  /**
   * 获取缓存
   * @param {String} key 缓存key
   */
  get (key) {
    return Cache.get(key)
  }

  /**
   * 删除缓存
   * @param {String} key 缓存key
   */ 
  del (key) {
    return Cache.del(key)
  }

  /**
   * 判断缓存
   * @param {String} key 缓存key
   */
  has (key) {
    return Cache.has(key)
  }
}

module.exports = CacheService
