const express = require('express')
const models = require('../db/models/index')
const router = express.Router()
const { escapeLike } = require('../db/utils')
const { wrapAsyncHandler, renderJsonGenerator } = require('./utils')

function validateProductNamePresence (req, res, next) {
  const productNameQuery = req.query.q
  if (!productNameQuery) {
    res.sendStatus(400)
  } else {
    next()
  }
}

function * formatProducts (products) {
  for (let product of products) {
    yield {
      id: product.id,
      name: product.name,
      category: product.category
    }
  }
}

async function findProducts (req, res, next) {
  const productNameQuery = req.query.q
  const matchingProducts = await models.Product.findAll({
    where: {
      name: {
        $iLike: escapeLike(productNameQuery)
      }
    },
    order: [['name', 'ASC']],
    limit: 10
  })
  renderJsonGenerator(res, formatProducts(matchingProducts))
}

/* GET products matching name */
router.get('/', validateProductNamePresence, wrapAsyncHandler(findProducts))

module.exports = router
