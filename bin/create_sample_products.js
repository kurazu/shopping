const db = require('../db/index')
const models = require('../db/models/index')

const PRODUCTS = {
  'milk': 'dairy',
  'joghurt': 'dairy',
  'bananas': 'fruit&veg',
  'apples': 'fruit&veg',
  'paprika': 'fruit&veg',
  'cornflakes': 'bio',
  'dried mango': 'bio',
  'rice': 'cereal',
  'soap': 'cosmetics',
  'cashews': 'nuts',
  'apricots': 'nuts',
  'raisins': 'nuts'
}

async function createSampleProducts () {
  const productPromises = Promise.all(Object.keys(PRODUCTS).map(
    productName => models.Product.create({
      name: productName,
      category: PRODUCTS[productName]
    })
  ))
  try {
    await productPromises
    console.log('Products were created')
  } catch (err) {
    console.error('Unable to create models:', err)
  }
  return db.close()
}

createSampleProducts()
