const db = require('../db/index')
const models = require('../db/models/index')

const ITEMS = {
  'milk': '2',
  'joghurt': '3',
  'bananas': '0.5',
  'cornflakes': '4',
  'raisins': '1'
}

async function getProductIds () {
  const productNames = Object.keys(ITEMS)
  const products = await models.Product.findAll({ where: { name: { $in: productNames } } })
  const result = {}
  products.forEach(product => { result[product.name] = product.id })
  return result
}

async function createSampleItems () {
  let productIds
  try {
    productIds = await getProductIds()
  } catch (err) {
    console.error('Unable to query products', err)
    return db.close()
  }

  const itemPromises = Promise.all(Object.keys(ITEMS).map(
    productName => models.Item.create({
      productId: productIds[productName],
      amount: ITEMS[productName]
    })
  ))
  try {
    await itemPromises
    console.log('Items were created')
  } catch (err) {
    console.error('Unable to create models:', err)
  }
  return db.close()
}

createSampleItems()
