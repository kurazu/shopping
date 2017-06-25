const db = require('../db/index')
require('../db/models/index')

async function syncModels () {
  try {
    await db.sync({ force: true })
    console.log('Models were synchronized')
  } catch (err) {
    console.error('Unable to synchronize models:', err)
  }
  return db.close()
}

syncModels()
