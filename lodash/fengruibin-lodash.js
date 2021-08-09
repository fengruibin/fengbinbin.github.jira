var fengruibin = function () {

  function chunk(array, [size = 1]) {
    let result = []
    if (!array || size < 1) return result
    for (let i = 0; i < array.length; i += size) {
      result.push(array.slice(i, i + size))
    }
    return result
  }


  function compact(array) {
    var result = []
    for (var i = 0; i < array.length; i++) {
      if (array[i]) {
        result.push(array[i])
      }
    }
    return result
  }


  function concat(array, ...values) {
    var result = []
    if (!array && !values) return result
    if (array) return array
    if (values) {
      for (let i = 0; i < values.length; i++) {
        result.push(values[i])
      }
      return j
    } else {
      for (let i = 0; i < values.length; i++) {
        return array.push(values[i])
      }
    }
  }


  return {
    chunk,
    compact,
    concat,
  }
}()
