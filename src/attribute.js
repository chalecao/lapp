import { isEventProp, isBool, extractEventName } from './util'

/**
 * 设置bool类型属性
 * @param {*} node 节点
 * @param {*} name 
 * @param {*} value 
 */
function operBooleanProp(node, name, value, oper) {
    if (value) {
        node[oper](name, value);
        node[name] = true;
    } else {
        node[oper](name);
        node[name] = false;
    }
}

/**
 * 设置dom attribute
 * @param node dom
 * @param key  attribute key
 * @param value attribue value
 */
export function operAttribute(node, key, value, oper) {
    if (isEventProp(key)) {
        return;
    } else if (key === 'className') {
        node[oper]('class', value);
    } else if (isBool(value)) {
        operBooleanProp(node, key, value, oper);
    } else {
        //remove attr when no value, fix bug tag a , if have href like <a href>, browser will reload
        if (value != undefined && value.length) {
            node[oper](key, value);
        } else {
            node.removeAttribute(key);
        }
    }
}

/**
 * 更新属性值
 * @param {*} node 
 * @param {*} name 
 * @param {*} newVal 
 * @param {*} oldVal 
 */
export function updateAttribute(node, name, newVal, oldVal) {
    // console.log(newVal, oldVal)
    if (!newVal) {
        operAttribute(node, name, isBool(newVal) ? newVal : oldVal, "removeAttribute");
    } else if (!oldVal || newVal !== oldVal) {
        operAttribute(node, name, newVal, "setAttribute");
    }
}
/**
 * 更新属性值
 * @param {*}  
 * @param {*} newProps 
 * @param {*} oldProps 
 */
export function updateAttributes($target, newProps, oldProps = {}) {
    const props = Object.assign({}, oldProps, newProps);
    Object.keys(props).forEach(name => {
        !isEventProp(name) && updateAttribute($target, name, newProps[name], oldProps[name]);
    });
}