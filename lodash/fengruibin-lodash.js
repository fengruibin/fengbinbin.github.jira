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
  //dropRightWhile
  function dropRightWhile(array, predicate) {
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
  function indexOf(array, value, fromIndex = 0) {
    for (let i = fromIndex; i < array.length; i++) {
      if (array[i] === value) {
        return i
      }
    }
    return -1
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
  function intersection(...arrays) {
    let result = []
    let array = arrays.shift()
    for (let i = 0; i < array.length; i++) {
      let item = array[i]
      let flag = true
      for (let j = 0; j < arrays.length; j++) {
        if (!arrays[j].includes(item)) {
          flag = false
        }
      }
      if (flag) {
        result.push(item)
      }
    }
    return result
  }
  //join
  function join(array, separator) {
    let str = ''
    for (let i = 0; i < array.length - 1; i++) {
      str += array[i].toString() + separator
    }
    str += array[array.length - 1]
    return str
  }
  // last
  function last(array) {
    // for (let i = array.length - 1; i >= 0; i--) {
    //   return array[i]
    // }
    return array[array.length - 1]
  }
  //lastIndexOf
  function lastIndexOf(array, value, fromIndex = array.length - 1) {
    for (let i = fromIndex; i >= 0; i--) {
      if (array[i] === value) {
        return i
      }
    }
    return -1
  }
  //pull
  function pull(array, ...values) {
    for (let i = 0; i < array.length; i++) {
      if (values.includes(array[i])) {
        array.splice(i, 1)
        i--
      }
    }
    return array
  }
  //reverse
  function reverse(array) {
    let result = []
    for (let i = array.length - 1; i >= 0; i--) {
      result.push(array[i])
    }
    array = result
    return array
  }
  //sortedIndex
  function sortedIndex(array, value) {
    for (let i = 0; i < array.length; i++) {
      if (value > array[i]) {
        return i + 1
      }
    }
  }
  //union
  function union(...arrays) {
    let result = []
    for (let i = 0; i < arrays.length; i++) {
      result = result.concat(arrays[i])
    }
    for (let i = 0; i < result.length - 1; i++) {
      for (let j = i + 1; j < result.length; j++) {
        if (result[j] == result[i]) {
          result.splice(j, 1)
        }
      }
    }
    return result
  }
  //unionBy
  function unionBy(...arrays) {
    let result = []
  }
  //uniq
  function uniq(array) {
    let result = []
    for (let i = 0; i < array.length - 1; i++) {
      for (let j = i + 1; j < array.length; j++) {
        if (array[j] == array[i]) {
          array.splice(j, 1)
        }
      }
      result = array
    }
    return result
  }
  //uniqBy
  function uniqBy(array) {

  }
  //unzip
  function unzip(array) {
    let result = []
    for (let i = 0; i < array.length; i++) {
      let item = array[i]
      for (let j = 0; j < item.length; j++) {
        if (!result[j]) {
          result[j] = []
          j--
        } else {
          result[j].push(item[j])
        }
      }
    }
    return result
  }
  //without
  function without(array, ...values) {
    let result = []
    for (let i = 0; i < array.length; i++) {
      if (!values.includes(array[i])) {
        result.push(array[i])
      }
    }
    return result
  }
  //xor
  function xor(...arrays) {
    let result = []
    let array = [].concat(...arrays)
    for (let i = 0; i < array.length; i++) {
      let flag = true
      for (let j = i + 1; j < array.length; j++) {
        if (array[j] == array[i]) {
          array.splice(j, 1)
          j--
          flag = false
        }
      }
      if (flag) {
        result.push(array[i])
      }
    }
    return result
  }
  //zip
  function zip(...arrays) {
    let result = []
    for (let i = 0; i < arrays.length; i++) {
      let array = arrays[i]
      for (let j = 0; j < array.length; j++) {
        if (!result[j]) {
          result[j] = []
        } else {
          result[j].push(array[j])
        }
      }
    }
    return result
  }
  //countBy
  function countBy(collection) {

  }
  //every
  function every(collection, predicate) {

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
    dropRightWhile: dropRightWhile,
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
    join: join,
    last: last,
    lastIndexOf: lastIndexOf,
    pull: pull,
    reverse: reverse,
    sortedIndex: sortedIndex,
    union: union,
    unionBy: unionBy,
    uniq: uniq,
    uniqBy: uniqBy,
    unzip: unzip,
    without: without,
    xor: xor,
    zip: zip,
    countBy: countBy,
    every: every,
  }
}()