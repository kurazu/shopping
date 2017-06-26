const express = require('express')
const models = require('../db/models/index')
const router = express.Router()
const { wrapAsyncHandler, HttpError } = require('./utils')
const Sequelize = require('sequelize')

async function listItems (req, res, next) {
  const items = await models.Item.findAll({
    include: [{
      model: models.Product,
      where: Sequelize.where(Sequelize.col('product.id'), Sequelize.col('item.productId'))
    }]
  })
  res.json(items)
}

/* GET products matching name */
router.get('/', wrapAsyncHandler(listItems))

module.exports = router
