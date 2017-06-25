const db = require('./index')
const Sequelize = require('sequelize')

function escapeLike (input) {
  const inputRaw = input.replace(/(_|%|\\)/g, '\\$1')
  const inputSec = db.getQueryInterface().escape(`%${inputRaw}%`)
  return Sequelize.literal(`${inputSec} ESCAPE '\\'`)
}

module.exports = {
  escapeLike
}
