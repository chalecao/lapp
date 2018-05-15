import component from '../component'
import l from '../create'
import { deepClone, findChildren } from '../util'
class ifBox extends component {
  render({ props, children }) {
    let _children = deepClone(children)
    let elseBox = findChildren(children, 'else')
    elseBox.index >= 0 && _children.splice(elseBox.index, 1)
    let subprop = deepClone(props)
    delete subprop['cond']
    if (props.cond) {
      return (<div {...subprop}>{_children}</div>)
    } else {
      return (<div {...subprop}>{elseBox.children}</div>)
    }
  }
}

export default ifBox
