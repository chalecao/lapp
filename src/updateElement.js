import { createElement } from './createElement'
import { isUndefined, isString, isNumber, isClass, isNull, isNative, isThunk, isText, isSameThunk } from './util'
import { updateAttributes } from './attribute'
/**
 * 更新node
 * @param node -dom node,  parent node of vdom
 * @param pre  -pre vnode
 * @param next -next vnode
 * @param index - child index in parent
 * @returns node
 */
export function updateElement(node, pre, next, index = 0) {
    if (!node) return
    if (pre === next && pre.type != 'thunk') return; // fix bug, shou test type after, because pre may undefined when create new node

    if (!isUndefined(pre) && isUndefined(next)) {
        // bug, remove the node in pre with index
        removeNode(node, pre, next, index);
        return;
    }

    if (isUndefined(pre) && !isUndefined(next)) {
        node.appendChild(createElement(next))
        return;
    }

    if (!isNull(pre) && isNull(next) || isNull(pre) && !isNull(next)) {
        replaceNode(node, pre, next, index); return;
    }

    if (pre.type !== next.type) {
        replaceNode(node, pre, next, index); return;
    }
    if (next.attributes && next.attributes.forceUpdate) {
        replaceNode(node, pre, next, index); return;
    }
    if (isNative(next)) {
        if (pre.tagName !== next.tagName) {
            replaceNode(node, pre, next, index); return;
        }

        updateAttributes(
            node.childNodes[index],
            next.attributes,
            pre.attributes
        )
        diffChildren(node, pre, next, index); return;
    }

    if (isText(next)) {
        if (pre.nodeValue !== next.nodeValue) {
            node.childNodes[index].nodeValue = next.nodeValue
        }
        return;
    }

    if (isThunk(next)) {
        if (isSameThunk(pre, next)) {
            if (!pre.props.key || (pre.props.key != next.props.key)) {
                updateThunk(node, pre, next, index); return;
            } else {
                next.state = pre.state
            }
        } else {
            replaceThunk(node, pre, next, index); return;
        }
    }
}


/**
 * 删除节点
 * @param node
 * @param pre
 * @param next
 * @param index
 */
function removeNode(node, pre, next, index) {
    removeThunk(pre)
    node.removeChild(node.childNodes[index])
}

/**
 * replace节点
 * @param node
 * @param pre
 * @param next
 * @param index
 */
function replaceNode(node, pre, next, index) {
    let newNode = createElement(next)
    removeThunk(pre)
    node.replaceChild(newNode, node.childNodes[index])
    return newNode
}

/**
 * thunk元素销毁时处理onRemove
 * @param vnode
 */
function removeThunk(vnode) {
    while (isThunk(vnode)) {
        let { onRemove } = vnode.options
        let { model } = vnode.state
        if (onRemove) onRemove(model)
        vnode = vnode.state.vnode
    }
    if (vnode.children) {
        vnode.children.forEach(removeThunk)
    }
}

/**
 * 更新子节点
 * @param node
 * @param pre
 * @param next
 * @param index
 */
function diffChildren(node, pre, next, index) {
    let preChildren = pre.children || []
    let nextChildren = next.children || []
    let i
    let nodeChildren = Array.prototype.slice.call(node.childNodes)
    let nl = nextChildren.length
    // fix bug: node.children => node.childNodes, node.childNodes contains text node, but node.children doesn't

    for (i = 0; i < preChildren.length || i < nl; i++) {
        updateElement(nodeChildren[index], preChildren[i], nextChildren[i], i >= nl ? nl : i)
    }

    return node
}

/**
* 更新thunk
*/
function updateThunk(node, pre, next, index) {
    let { props, children } = next
    let model = {
        children,
        props
    }
    let nextNode

    if (isClass(next.fn)) {
        nextNode = pre.state.$ins.render(model)
    } else {
        try {
            nextNode = next.fn(model)
        } catch (e) {
            // 兼容对于打包工具会把class 打包出一个包裹的function，这时候会误判
            nextNode = pre.state.$ins.render(model)
        }
    }
    // 更新块
    updateElement(node, pre.state.vnode, nextNode, index)
    next.state = {
        vnode: nextNode,
        $ins: pre.state.$ins,
        model
    }
    return node
}

function replaceThunk() {
    return updateThunk.apply(null, arguments)
}
