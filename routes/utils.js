function wrapAsyncHandler (asyncFunction) {
  return function (req, res, next) {
    asyncFunction(req, res, next).catch(handleError)

    function handleError (err) {
      console.error('Error in async handler', asyncFunction, err)
      res.sendStatus(500)
    }
  }
}

module.exports = {
  wrapAsyncHandler
}
