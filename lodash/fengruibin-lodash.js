var fengruibin = function () {

  function chunk(array, size) {
    let result = []
    if (!array || size < 1) return result
    for (let i = 0; i < array.length; i += size) {
      result.push(array.slice(i, i + size))
    }
    return result
  }


  function compact(array) {
    var result = []
    for (let i = 0; i < array.length; i++) {
      if (array[i]) {
        result.push(array[i])
      }
    }
    return result
  }


  function concat(array, ...values) {
    let result = []
    if (!array) {
      for (let i = 0; i < values.length; i++) {
        result.push(values[i])
      }
    } else {
      for (let i = 0; i < values.length; i++) {
        array.push(values[i])
      }
    }
    return
  }


  function difference(array, values) {
    let result = []

  }






  return {
    chunk: chunk,
    compact: compact,
    concat: concat,
    difference: difference,
  }
}()
