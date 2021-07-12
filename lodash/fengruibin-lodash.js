var FengRuiBin = function () {

  function chunk(array, size) {
    let result = []
    if (!array || size < 1) {
      return []
    }
    for (let i = 0; i < array.length; i += size) {
      res.push(array.slice(i, i + size))
    }
    return result
  }
}