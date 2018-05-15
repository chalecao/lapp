import component from '../component'
import l from '../create'
import { deepClone, findChildren } from '../util'
class elseBox extends component {
  render ({ props, children }) {
    if (props && Object.keys(props).indexOf('cond') >= 0) {
      let elseChildren = findChildren(children, 'else')

      let _children = children
      if (elseChildren.index >= 0) {
        _children = deepClone(children)
        _children.splice(elseChildren.index, 1)
      }
      let subprop = deepClone(props)
      delete subprop['cond']
      if (props.cond) {
        return (<div {...subprop}>{_children}</div>)
      } else {
        return (<div {...subprop}>{elseChildren.children}</div>)
      }
    } else {
      return (<div {...props}>{children}</div>)
    }
  }
}

export default elseBox
