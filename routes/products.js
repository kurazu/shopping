const express = require('express')
const models = require('../db/models/index')
const router = express.Router()
const { escapeLike } = require('../db/utils')
const { wrapAsyncHandler } = require('./utils')

function validateProductNamePresence (req, res, next) {
  const productNameQuery = req.query.q
  if (!productNameQuery) {
    res.sendStatus(400)
  } else {
    next()
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
  const productsData = matchingProducts.map(
    product => ({ id: product.id, name: product.name, category: product.category })
  )
  res.send(productsData)
}

/* GET products matching name */
router.get('/', validateProductNamePresence, wrapAsyncHandler(findProducts))

module.exports = router
