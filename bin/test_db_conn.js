const db = require('../db/index')

async function testConnection () {
  try {
    await db.authenticate()
    console.log('Connection has been established successfully.')
  } catch (err) {
    console.error('Unable to connect to the database:', err)
  }
  db.close()
}

testConnection()
