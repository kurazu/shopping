class HttpError extends Error {
  constructor (code, message) {
    super(message)
    this.code = code
  }
}

function wrapAsyncHandler (asyncFunction) {
  return function (req, res, next) {
    asyncFunction(req, res, next).catch(handleError)

    function handleError (err) {
      console.error('Error in async handler', asyncFunction, err)
      let errorCode, errorMsg
      if (err instanceof HttpError) {
        errorCode = err.code
        errorMsg = err.message
      } else {
        errorCode = 500
        errorMsg = 'Internal server error'
      }
      res.status(errorCode).json({error: errorMsg})
    }
  }
}

function renderJsonGenerator (res, generator) {
  res.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'})
  res.write('[')
  let needsComma = false
  for (let item of generator) {
    if (needsComma) {
      res.write(',')
    } else {
      needsComma = true
    }
    const json = JSON.stringify(item)
    res.write(json)
  }
  res.write(']')
  res.end()
}

module.exports = {
  wrapAsyncHandler,
  renderJsonGenerator,
  HttpError
}
