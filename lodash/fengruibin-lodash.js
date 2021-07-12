var fengruibin = function () {

  function chunk(array, size = 1) {
    var result = []
    if (!array || size < 1) return result
    for (var i = 0; i < array.length; i+=size) {
      result.push(array.slice(i, i + size))
    }
    return result
  }


  function compact(array) {
    
  }

  return {
    chunk,
    compact,
  }
}()



