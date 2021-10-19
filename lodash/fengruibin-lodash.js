//Lodash
var fengruibin = function () {
  //chunk
  function chunk(array, size) {
    let res = []
    if (!array || size < 1) return result
    for (let i = 0; i < array.length; i += size) {
      res.push(array.slice(i, i + size))
    }
    return res
  }
  //compact
  function compact(array) {
    var res = []
    for (let i = 0; i < array.length; i++) {
      if (array[i]) {
        res.push(array[i])
      }
    }
    return res
  }
  //concat
  function concat(array, ...values) {
    let res = []
    for (let i = 0; i < array.length; i++) {
      res.push(array[i])
    }
    for (let j = 0; j < values.length; j++) {
      if (Array.isArray(values[j])) {
        for (let k = 0; k < values[j].length; k++) {
          res.push(values[j][k])
        }
      } else {
        res.push(values[j])
      }
    }
    return res
  }
  //difference
  function difference(array, ...values) {
    let result = []
    let val = [].concat(...values)
    for (let i = 0; i < array.length; i++) {
      if (!val.includes(array[i])) {
        result.push(array[i])
      }
    }
    return result
  }
  //differenceBy
  function differenceBy(array, ...values) {

  }
  //drop
  function drop(array, n = 1) {
    let res = []
    for (let i = n; i < array.length; i++) {
      res.push(array[i])
    }
    return res
  }
  //dropRight
  function dropRight(array, n = 1) {
    let res = []
    if (n > array.length) return res
    for (let i = 0; i < array.length - n; i++) {
      res.push(array[i])
    }
    return res
  }
  //dropRightWhilte
  function dropRightWhilte(array, predicate) {
    let result = []
  }
  //dropWhile
  function dropWhile(array, predicate) {

  }
  //fill
  function fill(array, value, start = 0, end = array.length) {
    for (let i = start; i < end; i++) {
      array[i] = value
    }
    return array
  }
  //findIndex
  function findIndex(array, predicate, fromIndex) {

  }
  //findLastIndex
  function findLastIndex(array, predicate, fromIndex) {

  }
  //flatten
  function flatten(array) {
    let result = []
    for (let i = 0; i < array.length; i++) {
      let item = array[i]
      if (Array.isArray(item)) {
        for (let j = 0; j < item.length; j++) {
          result.push(item[j])
        }
      } else {
        result.push(item)
      }
    }
    return result
  }
  //flattenDeep
  function flattenDeep(array) {
    let result = []
    for (let i = 0; i < array.length; i++) {
      let item = array[i]
      if (Array.isArray(item)) {
        item = flattenDeep(item)
        for (let j = 0; j < item.length; j++) {
          result.push(item[j])
        }
      } else {
        result.push(item)
      }
    }
    return result
  }
  //flattenDepth
  function flattenDepth(array, depth) {
    if (depth == 0) return array
    let result = []
    for (let i = 0; i < array.length; i++) {
      let item = array[i]
      if (Array.isArray(item)) {
        item = flattenDepth(item, depth - 1)
        for (let j = 0; j < item.length; j++) {
          result.push(item[j])
        }
      } else {
        result.push(item)
      }
    }
    return result
  }
  //fromPairs
  function fromPairs(pairs) {
    let result = {}
    for (let pair of pairs) {
      result[pair[0]] = pair[1]
    }
    return result
  }
  //head
  function head(array) {
    if (array.length === 0) {
      return undefined
    } else {
      return array[0]
    }
  }
  //indexOf
  function indexOf(array, value, fromIndex) {
    for (let i = fromIndex; i < array.length; i++) {
      if (array[i] === value) {
        return i
      } else {
        return -1
      }
    }
  }
  //initia
  function initial(array) {
    // let result = []
    // for (let i = 0; i < array.length - 1; i++) {
    //   result.push(array[i])
    // }
    // return result
    return array.slice(0, array.length - 1)
  }
  //intersection
  function intersection(arrays) {
    let result = []
    for (let i = 0; i < arrays[0].length; i++) {
      for (let j = 1; j < arrays.length; j++) {
        if (arrays[0][i] == arrays[j][i]) {
          result.push(arrays[0][i])
        }
      }
    }
    return result
  }




  //调用函数
  return {
    chunk: chunk,
    compact: compact,
    concat: concat,
    difference: difference,
    differenceBy: differenceBy,
    drop: drop,
    dropRight: dropRight,
    dropRightWhilte: dropRightWhilte,
    dropWhile: dropWhile,
    fill: fill,
    findIndex: findIndex,
    findLastIndex: findLastIndex,
    flatten: flatten,
    flattenDeep: flattenDeep,
    flattenDepth: flattenDepth,
    fromPairs: fromPairs,
    head: head,
    indexOf: indexOf,
    initial: initial,
    intersection: intersection,
  }
}()
