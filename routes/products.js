const express = require('express')
const models = require('../db/models/index')
const router = express.Router()
const { escapeLike } = require('../db/utils')
const { wrapAsyncHandler, renderJsonGenerator, HttpError } = require('./utils')

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

async function createProduct (req, res, next) {
  const name = req.body.name
  if (!name) {
    console.error('Missing product name')
    throw new HttpError(400)
  }
  const category = req.body.category
  if (!category) {
    console.error('Missing product category')
    throw new HttpError(400)
  }
  if (!models.categories.includes(category)) {
    console.error('Unknown category', category)
    throw new HttpError(400)
  }
  const existingProduct = await models.Product.findOne({
    where: {
      name
    }
  })
  // TODO check this on insert!
  if (existingProduct) {
    throw new HttpError(409)
  }
  try {
    debugger
  } catch (err) {
    debugger
  }
  throw new HttpError(501)
}

/* GET products matching name */
router.get('/', validateProductNamePresence, wrapAsyncHandler(findProducts))
router.post('/', wrapAsyncHandler(createProduct))

module.exports = router
