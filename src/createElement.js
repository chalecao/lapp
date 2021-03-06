import { isUndefined, isSVG, isString, isNumber, isClass, isNull } from './util'
import { updateAttributes } from './attribute'
import { addEventListeners } from './event'

/**
 * 生成文本节点
 * @param text 节点值
 * @returns {Text}
 */
function createTextNode(text) {
    let value = isString(text) || isNumber(text) ? text : ''
    return document.createTextNode(value)
}

/**
 * thunk => real node
 * @param vnode
 */
function createThunk(vnode, dispatch) {
    let { props = {}, children } = vnode

    let model = {
        children,
        props
    }
    // render model
    let output, ins
    if (isClass(vnode.fn)) {
        ins = new vnode.fn()
        output = ins.render(model)
        ins.$update = ins.$update.bind(this, () => {
            dispatch && dispatch('updateAll')
        })
    } else {
        try {
            output = vnode.fn(model)
            dispatch = () => vnode.fn.$update && vnode.fn.$update();
        } catch (e) {
            // console.log(e)
            // 兼容对于打包工具会把class 打包出一个包裹的function，这时候会误判, 所以fn失败就还是采用new的形式
            ins = new vnode.fn()
            output = ins.render(model)
            ins.$update = ins.$update.bind(this, () => {
                dispatch && dispatch('updateAll')
            })
        }
    }

    if (!output) {
        return ''
    }
    let DOMElement = createElement(output, dispatch)
    addEventListeners(DOMElement, output.attributes)

    //渲染后执行onShow
    output.attributes && output.attributes.onShow && output.attributes.onShow(DOMElement);
    output.props && output.props.onShow && output.props.onShow(DOMElement);

    vnode.state = {
        vnode: output,
        $ins: ins,
        model
    }
    return DOMElement
}

function createSVGElement(name) {
    return document.createElementNS('http://www.w3.org/2000/svg', name)
}

/**
 * html节点
 * @param {*} vnode
 */
function createHTMLElement(vnode, dispatch) {
    let $el = isSVG(vnode.tagName) ? createSVGElement(vnode.tagName) : document.createElement(vnode.tagName)
    vnode.attributes && updateAttributes($el, vnode.attributes)
    vnode.attributes && addEventListeners($el, vnode.attributes)
    vnode.children
        .map(item => {
            let dom = createElement(item, dispatch);
            //把子view的$update绑定到父元素的$update
            if (item.type == "thunk") {
                item.fn.$update = () => dispatch && dispatch();
            }
            return dom
        })
        .forEach($el.appendChild.bind($el))

    return $el
}

/**
 * 生成空dom
 * @returns {Element}
 */
function createEmptyHTMLElement() {
    return document.createElement('noscript')
}

/**
 * virtual dom -> dom
 * @param vnode
 */
export const createElement = (vnode, dispatch) => {
    // console.log(this) //$parent
    // console.log(vnode)
    if (isNull(vnode) || isUndefined(vnode)) return
    switch (vnode.type) {
        case 'text':
            return createTextNode(vnode.nodeValue)
        case 'thunk':
            return createThunk(vnode, dispatch)
        case 'empty':
            return createEmptyHTMLElement()
        case 'native':
            return createHTMLElement(vnode, dispatch)
    }
}
