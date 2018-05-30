import { createElement } from './createElement'
import { updateElement } from './updateElement'
// import { diff } from './diff'
// import { patch } from './patch'

export default function initNode(container, _env) {
    let { node, oldNode, ins } = _env || { node: null, oldNode: null, ins: null }
    container = typeof container === 'string' ? document.querySelector(container) : container
    // 派发更新操作
    let dispatch = effect => effect === 'updateAll' && updateAll()
    if (!_env) container.innerHTML = ''
    function create(vnode, context = container) {
        node = createElement(vnode, dispatch)
        context.appendChild(node)
        oldNode = vnode
        return { node, oldNode, ins }
    }

    function update(vnode = oldNode, context = container) {
        // let patches = diff(oldNode, vnode)
        // patch(context.children[0], patches)
        updateElement(context, oldNode, vnode)
        oldNode = vnode
        return { node, oldNode, ins }
    }

    function updateAll(vnode = oldNode, context = container) {
        // console.log("updateAll updateAll")
        // add ins to fix bug: update the func element
        try {
            if ('render' in _ins) {
                vnode = ins && ins.render()
            } else {
                vnode = Object.assign(vnode.fn({
                    children: vnode.children,
                    props: vnode.props || {}
                }), { fn: vnode.fn })
                dispatch = () => vnode.fn.$update && vnode.fn.$update();
            }
        } catch (e) {

        }
        // let patches = diff(oldNode, vnode)
        // patch(context, patches)
        // updateTarget(context, oldNode, vnode)
        updateElement(context, oldNode, vnode)
        // update oldnode, or may cause diff vdom bug
        oldNode = vnode
    }

    return (_ins) => {
        let vnode = _ins
        // 兼容functional program
        if (vnode.children && !vnode.children.length) {
            vnode = Object.assign(vnode.fn({
                children: vnode.children,
                props: vnode.props || {}
            }), { fn: vnode.fn })
            dispatch = () => vnode.fn.$update && vnode.fn.$update();
        }
        // 兼容 class模块
        if ('render' in _ins) {
            vnode = _ins.render()
            ins = _ins
            _ins.$update = _ins.$update.bind(this, () => {
                dispatch('updateAll')
            })
        }
        return node ? update(vnode) : create(vnode)
    }
}
