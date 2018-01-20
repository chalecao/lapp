import { createElement } from './createElement'
import { updateElement, updateTarget } from "./updateElement"


export default function initNode(container, _env) {
    let { node, oldNode, ins } = _env || { node: null, oldNode: null, ins: null };

    //派发更新操作
    let dispatch = effect => effect == "updateAll" && updateAll()
    if (!_env) container.innerHTML = ''
    function create(vnode, context = container) {
        node = createElement(vnode, dispatch)
        context.appendChild(node)
        oldNode = vnode
        return { node, oldNode, ins }
    }

    function update(vnode = oldNode, context = container) {
        updateElement(context, oldNode, vnode)
        oldNode = vnode
        return { node, oldNode, ins }
    }

    function updateAll(vnode = oldNode, context = container) {
        // console.log("updateAll updateAll")
        //add ins to fix bug: update the func element
        try {
            vnode = ins && ins.render()
        } catch (e) {

        }
        updateTarget(context, oldNode, vnode)
        // update oldnode, or may cause diff vdom bug
        oldNode = vnode
    }


    return (_ins) => {
        let vnode = _ins;
        //兼容functional program
        if (vnode.children && !vnode.children.length) {
            let { props, children } = vnode
            let model = {
                children,
                props
            }
            vnode = vnode.fn(model)
        }
        //兼容 class模块
        if ("render" in _ins) {
            vnode = _ins.render()
            ins = _ins;
            _ins.$update = _ins.$update.bind(this, () => {
                dispatch("updateAll")
            })
        }
        return node ? update(vnode) : create(vnode)
    }
}