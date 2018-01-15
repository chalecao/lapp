import { isBool, isCustomProp, extractEventName } from './util'

/**
 * 设置bool类型属性
 * @param {*} node 节点
 * @param {*} name 
 * @param {*} value 
 */
function setBooleanProp(node, name, value) {
    if (value) {
        node.setAttribute(name, value);
        node[name] = true;
    } else {
        node[name] = false;
    }
}

/**
 * 删除bool类型属性
 * @param {*} node 
 * @param {*} name 
 */
function removeBooleanProp(node, name) {
    node.removeAttribute(name);
    node[name] = false;
}

/**
 * 设置dom attribute
 * @param node dom
 * @param key  attribute key
 * @param value attribue value
 */
export function setAttribute(node, key, value) {
    if (isCustomProp(key)) {
        return;
    } else if (key === 'className') {
        node.setAttribute('class', value);
    } else if (typeof value === 'boolean') {
        setBooleanProp(node, key, value);
    } else {
        //remove attr when no value, fix bug tag a , if have href like <a href>, browser will reload
        if (value !== "" && value != undefined) {
            node.setAttribute(key, value);
        }else{
            node.removeAttribute(key);
        }
    }
}

/**
 * set all attributes
 * @param {*} node 
 * @param {*} props 
 */
export function setAttributes(node, props) {
    Object.keys(props).forEach(name => {
        setAttribute(node, name, props[name]);
    });
}



/**
 * 删除attribute
 * @param node
 * @param key
 * @param previousValue
 */
export function removeAttribute(node, key, previousValue) {

    if (isCustomProp(key)) {
        return;
    } else if (name === 'className') {
        node.removeAttribute('class ');
    } else if (typeof previousValue === 'boolean') {
        removeBooleanProp(node, key);
    } else {
        node.removeAttribute(key);
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
    if (!newVal) {
        removeAttribute(node, name, oldVal);
    } else if (!oldVal || newVal !== oldVal) {
        setAttribute(node, name, newVal);
    }
}
/**
 * 更新属性值
 * @param {*}  
 * @param {*} newProps 
 * @param {*} oldProps 
 */
export function updateAttributes($target, newProps, oldProps = {}) {
    const props = Object.assign({}, newProps, oldProps);
    Object.keys(props).forEach(name => {
        updateAttribute($target, name, newProps[name], oldProps[name]);
    });
}