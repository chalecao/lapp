import component from '../component'
import l from '../create'
import { JSON2Hash, deepClone } from '../util'

class forBox extends component {
  handlePath (item, hashData) {
    let paths = item.match(/__(.*?)__/g)
    let d = ''
    paths && paths.forEach(path => {
      d = hashData[path.substring(2, path.length - 2)]
      item = item.replace(path, typeof d === 'undefined' ? '' : d)
    })
    return item
  }
  handleAttribute (attributes, hashData) {
    Object.keys(attributes).forEach(key => {
      attributes[key] = this.handlePath(attributes[key], hashData)
    })
  }
  handleChildren (children, hashData) {
    children.forEach(item => {
      if (item.nodeValue) {
        item.nodeValue = this.handlePath(item.nodeValue, hashData)
      }
      item.attributes && this.handleAttribute(item.attributes, hashData)
      item.children && this.handleChildren(item.children, hashData)
    })
    return children
  }
  render ({ props, children }) {
    if (props.data) {
      let hashData = ''
      let allChidren = []
      props.data.forEach((item, i) => {
        item.index = i
        hashData = JSON2Hash(item, props.key || 'item')
        allChidren = allChidren.concat(this.handleChildren(deepClone(children), hashData))
      })
      let subprop = deepClone(props)
      delete subprop['data']
      delete subprop['key']
      return (<div {...subprop}>{allChidren}</div>)
    } else {
      return ('')
    }
  }
}

export default forBox
