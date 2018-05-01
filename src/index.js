import creat from './create'
import init from './init'
import comp from './component'

export const l = creat
export const component = comp

export const app = (root, ...subviews) => (() => {
  if ('render' in subviews[0]) {
    init(root)(subviews[0])
  } else {
    let env = init(root)(creat(subviews[0], null))
    subviews.map(item => {
      item.$update = () => {
        env = init(root, env)(creat(subviews[0], null))
      }
    })
    return subviews
  }
})()
