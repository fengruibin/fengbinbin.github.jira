var FengRuiBin = function () {

  function chunk(array, size) {
    var result = []
    if (!array || size < 1) {
      return []
    }
    for (var i = 0; i < array.length; i += size) {
      res.push(array.slice(i, i + size))
    }
    return result
  }
}
