import { isUndefined, isString, isNumber, isFunction, isNull, isArray } from './util'

export default function createNode (type, attributes = {}, ...children) {
  if (!type) return
  children = Array.prototype.reduce.call(children, reduceChildren, [])
  if (isFunction(type)) {
    return createThunk(type, attributes, children, type)
  }
  return {
    type: 'native',
    tagName: type,
    attributes,
    children
  }
}

/**
 * 生成vdom 对象
 * @param fn render 函数
 * @param props
 * @param children
 * @returns {{type: string, fn: *, attributes: *, children: *}}
 */
function createThunk (fn, props, children, options) {
  return {
    type: 'thunk',
    fn,
    props,
    children,
    options
  }
}

function createText (text) {
  return {
    type: text ? 'text' : 'empty',
    nodeValue: text
  }
}

function reduceChildren (children, vnode) {
  if (isString(vnode) || isNumber(vnode)) {
    children.push(createText(vnode))
  } else if (isNull(vnode) || isUndefined(vnode)) {
    // children.push(createText())
  } else if (isArray(vnode)) {
    children = [...children, ...vnode.reduce(reduceChildren, [])]
  } else {
    children.push(vnode)
  }
  return children
}
