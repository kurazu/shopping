const express = require('express')
const models = require('../db/models/index')
const router = express.Router()
const { escapeLike } = require('../db/utils')
const { wrapAsyncHandler, HttpError } = require('./utils')
const Sequelize = require('sequelize')

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
  res.json(matchingProducts)
}

async function createProduct (req, res, next) {
  const name = req.body.name
  if (!name) {
    console.error('Missing product name')
    throw new HttpError(400, 'Missing product name')
  }
  const category = req.body.category
  if (!category) {
    console.error('Missing product category')
    throw new HttpError(400, 'Missing product category')
  }
  if (!models.categories.includes(category)) {
    console.error('Unknown category', category)
    throw new HttpError(400, 'Unknown product category')
  }
  let product
  try {
    product = await models.Product.create({
      name,
      category
    })
  } catch (err) {
    if (err instanceof Sequelize.UniqueConstraintError) {
      throw new HttpError(400, 'Duplicated product name')
    } else {
      throw err
    }
  }
  res.json(product)
}

/* GET products matching name */
router.get('/', validateProductNamePresence, wrapAsyncHandler(findProducts))
router.post('/', wrapAsyncHandler(createProduct))

module.exports = router
