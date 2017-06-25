function wrapAsyncHandler (asyncFunction) {
  return function (req, res, next) {
    asyncFunction(req, res, next).catch(handleError)

    function handleError (err) {
      console.error('Error in async handler', asyncFunction, err)
      res.sendStatus(500)
    }
  }
}

function renderJsonGenerator (res, generator) {
  res.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'})
  res.write('[')
  let needsComma = false
  while (true) {
    const { done, value } = generator.next()
    if (value === undefined && done) {
      break
    }
    if (needsComma) {
      res.write(',')
    } else {
      needsComma = true
    }
    const json = JSON.stringify(value)
    res.write(json)
    if (done) {
      break
    }
  }
  res.write(']')
  res.end()
}

module.exports = {
  wrapAsyncHandler,
  renderJsonGenerator
}
