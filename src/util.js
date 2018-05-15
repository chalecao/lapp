const isType = (type) => (value) => typeof value === type
const isVType = (type) => (vnode) => vnode.type === type
export const isUndefined = (name) => isType('undefined')(name) && name == undefined
export const isString = isType('string')
export const isBool = isType('boolean')
export const isNumber = isType('number')
export const isFunction = (name) => name.toString().match('function')
export const isClass = (name) => name.toString().match('class ') // change 2 "class " to avoid match className
export const isNull = (value) => value === null
export const isNative = isVType('native')
export const isThunk = isVType('thunk')
export const isText = isVType('text')
export const isArray = Array.isArray
export const isObj = (name) => Object.prototype.toString.call(name).slice(8, -1) == 'Object'
export const isSameThunk = (pre, next) => pre.fn === next.fn

export const isSVG = (name) => ['svg', 'path', 'animate'].indexOf(name) >= 0
export const isEventProp = (name) => /^on/.test(name)
export const extractEventName = (name) => name.slice(2).toLowerCase()
export const isCustomProp = (name) => isEventProp(name) || name === 'forceUpdate'

export const JSON2Hash = (data, path) => {
  let res = {}
  Object.keys(data).forEach(key => {
    res[path + '.' + key] = data[key]
    if (typeof data[key] === 'object') {
      res = Object.assign(res, JSON2Hash(data[key], path + '.' + key))
    }
  })
  return res
}

export const findChildren = (children, key) => {
  let index = -1
  let _children = children.find((item, i) => {
    if (item.fn && item.fn.toString().match(key)) {
      index = i
      return true
    }
  })
  return { index, children: _children }
}

// 深度克隆
export const deepClone = (obj) => {
  var result
  // 确定result的类型
  if (isObj(obj)) {
    result = {}
  } else if (isArray(obj)) {
    result = []
  } else {
    return obj
  }
  for (var key in obj) {
    var copy = obj[key]
    if (isObj(copy)) {
      result[key] = deepClone(copy)// 递归调用
    } else if (isArray(copy)) {
      result[key] = deepClone(copy)
    } else {
      result[key] = obj[key]
    }
  }
  return result
}

export function toArray (listLike) {
  if (!listLike) {
    return []
  }

  var list = []

  for (var i = 0, len = listLike.length; i < len; i++) {
    list.push(listLike[i])
  }

  return list
}
