'use strict'

const bcrypt = require('bcryptjs')

// 加密
exports.bhash = str => {
  return bcrypt.hashSync(str, 10)
}
// 比对
exports.bcompare = (str, hash) => {
  return bcrypt.compareSync(str, hash)
}