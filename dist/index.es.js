var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};

var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

var toConsumableArray = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  } else {
    return Array.from(arr);
  }
};

var isType = function isType(type) {
  return function (value) {
    return (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === type;
  };
};
var isVType = function isVType(type) {
  return function (vnode) {
    return vnode.type === type;
  };
};
var isUndefined = function isUndefined(name) {
  return isType('undefined')(name) && name == undefined;
};
var isString = isType('string');
var isBool = isType('boolean');
var isNumber = isType('number');
var isFunction = function isFunction(name) {
  return name.toString().match('function');
};
var isClass = function isClass(name) {
  return name.toString().match('class ');
}; // change 2 "class " to avoid match className
var isNull = function isNull(value) {
  return value === null;
};
var isNative = isVType('native');
var isThunk = isVType('thunk');
var isText = isVType('text');
var isArray = Array.isArray;
var isObj = function isObj(name) {
  return Object.prototype.toString.call(name).slice(8, -1) == 'Object';
};
var isSameThunk = function isSameThunk(pre, next) {
  return pre.fn === next.fn;
};

var isSVG = function isSVG(name) {
  return ['svg', 'path', 'animate'].indexOf(name) >= 0;
};
var isEventProp = function isEventProp(name) {
  return (/^on/.test(name)
  );
};
var extractEventName = function extractEventName(name) {
  return name.slice(2).toLowerCase();
};

var JSON2Hash = function JSON2Hash(data, path) {
  var res = {};
  Object.keys(data).forEach(function (key) {
    res[path + '.' + key] = data[key];
    if (_typeof(data[key]) === 'object') {
      res = Object.assign(res, JSON2Hash(data[key], path + '.' + key));
    }
  });
  return res;
};

var findChildren = function findChildren(children, key) {
  var index = -1;
  var _children = children.find(function (item, i) {
    if (item.fn && item.fn.toString().match(key)) {
      index = i;
      return true;
    }
  });
  return { index: index, children: _children };
};

// 深度克隆
var deepClone = function deepClone(obj) {
  var result;
  // 确定result的类型
  if (isObj(obj)) {
    result = {};
  } else if (isArray(obj)) {
    result = [];
  } else {
    return obj;
  }
  for (var key in obj) {
    var copy = obj[key];
    if (isObj(copy)) {
      result[key] = deepClone(copy); // 递归调用
    } else if (isArray(copy)) {
      result[key] = deepClone(copy);
    } else {
      result[key] = obj[key];
    }
  }
  return result;
};

function createNode(type) {
  for (var _len = arguments.length, children = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    children[_key - 2] = arguments[_key];
  }

  var attributes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  if (!type) return;
  children = Array.prototype.reduce.call(children, reduceChildren, []);
  if (isFunction(type)) {
    return createThunk(type, attributes, children, type);
  }
  return {
    type: 'native',
    tagName: type,
    attributes: attributes,
    children: children
  };
}

/**
 * 生成vdom 对象
 * @param fn render 函数
 * @param props
 * @param children
 * @returns {{type: string, fn: *, attributes: *, children: *}}
 */
function createThunk(fn, props, children, options) {
  return {
    type: 'thunk',
    fn: fn,
    props: props,
    children: children,
    options: options
  };
}

function createText(text) {
  return {
    type: text ? 'text' : 'empty',
    nodeValue: text
  };
}

function reduceChildren(children, vnode) {
  if (isString(vnode) || isNumber(vnode)) {
    children.push(createText(vnode));
  } else if (isNull(vnode) || isUndefined(vnode)) ; else if (isArray(vnode)) {
    children = [].concat(toConsumableArray(children), toConsumableArray(vnode.reduce(reduceChildren, [])));
  } else {
    children.push(vnode);
  }
  return children;
}

var component = function () {
  function component() {
    classCallCheck(this, component);
  }

  createClass(component, [{
    key: "$update",
    value: function $update(dispatch) {
      dispatch && dispatch();
    }
  }, {
    key: "render",
    value: function render() {}
  }]);
  return component;
}();

/**
 * add event handler
 * @param {*}
 * @param {*} props
 */
function addEventListeners($target, props) {
  props && Object.keys(props).forEach(function (name) {
    if (isEventProp(name)) {
      $target.addEventListener(extractEventName(name), props[name]);
    }
  });
}

function removeEventListeners($target, props) {
  props && Object.keys(props).forEach(function (name) {
    if (isEventProp(name)) {
      $target.removeEventListener(extractEventName(name), props[name]);
    }
  });
}

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
function operAttribute(node, key, value, oper) {
  if (isEventProp(key)) ; else if (key === 'className') {
    node[oper]('class', value);
  } else if (isBool(value)) {
    operBooleanProp(node, key, value, oper);
  } else {
    // remove attr when no value, fix bug tag a , if have href like <a href>, browser will reload
    if (value != undefined && ('' + value).length) {
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
function updateAttribute(node, name, newVal, oldVal) {
  // console.log(newVal, oldVal)
  if (!newVal) {
    operAttribute(node, name, isBool(newVal) ? newVal : oldVal, 'removeAttribute');
  } else if (!oldVal || newVal !== oldVal) {
    operAttribute(node, name, newVal, 'setAttribute');
  }
}
/**
 * 更新属性值
 * @param {*}
 * @param {*} newProps
 * @param {*} oldProps
 */
function updateAttributes($target, newProps) {
  var oldProps = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  var props = Object.assign({}, oldProps, newProps);
  Object.keys(props).forEach(function (name) {
    if (!isEventProp(name)) {
      updateAttribute($target, name, newProps[name], oldProps[name]);
    } else {
      // 移除事件，重新绑定事件
      removeEventListeners($target, { name: oldProps[name] });
      addEventListeners($target, { name: newProps[name] });
    }
  });
}

/**
 * 生成文本节点
 * @param text 节点值
 * @returns {Text}
 */
function createTextNode(text) {
  var value = isString(text) || isNumber(text) ? text : '';
  return document.createTextNode(value);
}

/**
 * thunk => real node
 * @param vnode
 */
function createThunk$1(vnode, dispatch) {
  var props = vnode.props,
      children = vnode.children;
  var onCreate = vnode.options.onCreate;

  var model = {
    children: children,
    props: props
    // render model
  };var output = void 0,
      ins = void 0;
  if (isClass(vnode.fn)) {
    ins = new vnode.fn();
    output = ins.render(model);
    ins.$update = ins.$update.bind(this, function () {
      dispatch && dispatch('updateAll');
    });
  } else {
    try {
      output = vnode.fn(model);
    } catch (e) {
      // console.log(e)
      // 兼容对于打包工具会把class 打包出一个包裹的function，这时候会误判, 所以fu失败就还是采用new的形式
      ins = new vnode.fn();
      output = ins.render(model);
      ins.$update = ins.$update.bind(this, function () {
        dispatch && dispatch('updateAll');
      });
    }
  }

  if (!output) {
    return '';
  }
  var DOMElement = createElement(output);
  addEventListeners(DOMElement, output.attributes);
  if (onCreate) onCreate(model);
  vnode.state = {
    vnode: output,
    $ins: ins,
    model: model
  };
  return DOMElement;
}

function createSVGElement(name) {
  return document.createElementNS('http://www.w3.org/2000/svg', name);
}

/**
 * html节点
 * @param {*} vnode
 */
function createHTMLElement(vnode, dispatch) {
  var $el = isSVG(vnode.tagName) ? createSVGElement(vnode.tagName) : document.createElement(vnode.tagName);
  vnode.attributes && updateAttributes($el, vnode.attributes);
  vnode.attributes && addEventListeners($el, vnode.attributes);
  vnode.children.map(function (item) {
    return createElement(item, dispatch);
  }).forEach($el.appendChild.bind($el));

  return $el;
}

/**
 * 生成空dom
 * @returns {Element}
 */
function createEmptyHTMLElement() {
  return document.createElement('noscript');
}

/**
 * virtual dom -> dom
 * @param vnode
 */
var createElement = function createElement(vnode, dispatch) {
  // console.log(this) //$parent
  // console.log(vnode)
  if (isNull(vnode) || isUndefined(vnode)) return;
  switch (vnode.type) {
    case 'text':
      return createTextNode(vnode.nodeValue);
    case 'thunk':
      return createThunk$1(vnode, dispatch);
    case 'empty':
      return createEmptyHTMLElement();
    case 'native':
      return createHTMLElement(vnode, dispatch);
  }
};

/**
 * 更新node
 * @param node -dom node,  parent node of vdom
 * @param pre  -pre vnode
 * @param next -next vnode
 * @param index - child index in parent
 * @returns node
 */
function updateElement(node, pre, next) {
  var index = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;

  if (!node) return;
  if (pre === next && pre.type != 'thunk') return node; // fix bug, shou test type after, because pre may undefined when create new node

  if (!isUndefined(pre) && isUndefined(next)) {
    // bug, remove the node in pre with index
    return removeNode(node, pre, next, index);
  }

  if (isUndefined(pre) && !isUndefined(next)) {
    node.appendChild(createElement(next));
    return node;
  }

  if (!isNull(pre) && isNull(next) || isNull(pre) && !isNull(next)) {
    return replaceNode(node, pre, next, index);
  }

  if (pre.type !== next.type) {
    return replaceNode(node, pre, next, index);
  }
  if (next.attributes && next.attributes.forceUpdate) {
    return replaceNode(node, pre, next, index);
  }
  if (isNative(next)) {
    if (pre.tagName !== next.tagName) {
      return replaceNode(node, pre, next, index);
    }

    updateAttributes(node.childNodes[index], next.attributes, pre.attributes);
    return diffChildren(node, pre, next, index);
  }

  if (isText(next)) {
    if (pre.nodeValue !== next.nodeValue) {
      node.childNodes[index].nodeValue = next.nodeValue;
    }
    return node;
  }

  if (isThunk(next)) {
    if (isSameThunk(pre, next)) {
      return updateThunk(node, pre, next, index);
    } else {
      return replaceThunk(node, pre, next, index);
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
  removeThunk(pre);
  node.removeChild(node.childNodes[index]);
}

/**
 * replace节点
 * @param node
 * @param pre
 * @param next
 * @param index
 */
function replaceNode(node, pre, next, index) {
  var newNode = createElement(next);
  removeThunk(pre);
  node.replaceChild(newNode, node.childNodes[index]);
  return newNode;
}

/**
 * thunk元素销毁时处理onRemove
 * @param vnode
 */
function removeThunk(vnode) {
  while (isThunk(vnode)) {
    var onRemove = vnode.options.onRemove;
    var model = vnode.state.model;

    if (onRemove) onRemove(model);
    vnode = vnode.state.vnode;
  }
  if (vnode.children) {
    vnode.children.forEach(removeThunk);
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
  var preChildren = pre.children || [];
  var nextChildren = next.children || [];
  var i = void 0;
  var nodeChildren = Array.prototype.slice.call(node.childNodes);
  var nl = nextChildren.length;
  // fix bug: node.children => node.childNodes, node.childNodes contains text node, but node.children doesn't

  for (i = 0; i < preChildren.length || i < nl; i++) {
    updateElement(nodeChildren[index], preChildren[i], nextChildren[i], i >= nl ? nl : i);
  }

  return node;
}

/**
* 更新thunk
*/
function updateThunk(node, pre, next, index) {
  var props = next.props,
      children = next.children;

  var model = {
    children: children,
    props: props
  };
  var nextNode = void 0;

  if (isClass(next.fn)) {
    nextNode = pre.state.$ins.render(model);
  } else {
    try {
      nextNode = next.fn(model);
    } catch (e) {
      // 兼容对于打包工具会把class 打包出一个包裹的function，这时候会误判
      nextNode = pre.state.$ins.render(model);
    }
  }
  // 更新块
  updateElement(node, pre.state.vnode, nextNode, index);
  next.state = {
    vnode: nextNode,
    $ins: pre.state.$ins,
    model: model
  };
  return node;
}

function replaceThunk() {
  return updateThunk.apply(null, arguments);
}

// import { diff } from './diff'
// import { patch } from './patch'

function initNode(container, _env) {
  var _this = this;

  var _ref = _env || { node: null, oldNode: null, ins: null },
      node = _ref.node,
      oldNode = _ref.oldNode,
      ins = _ref.ins;

  container = typeof container === 'string' ? document.querySelector(container) : container;
  // 派发更新操作
  var dispatch = function dispatch(effect) {
    return effect === 'updateAll' && updateAll();
  };
  if (!_env) container.innerHTML = '';
  function create(vnode) {
    var context = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : container;

    node = createElement(vnode, dispatch);
    context.appendChild(node);
    oldNode = vnode;
    return { node: node, oldNode: oldNode, ins: ins };
  }

  function update() {
    var vnode = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : oldNode;
    var context = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : container;

    // let patches = diff(oldNode, vnode)
    // patch(context.children[0], patches)
    updateElement(context, oldNode, vnode);
    oldNode = vnode;
    return { node: node, oldNode: oldNode, ins: ins };
  }

  function updateAll() {
    var vnode = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : oldNode;
    var context = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : container;

    // console.log("updateAll updateAll")
    // add ins to fix bug: update the func element
    try {
      vnode = ins && ins.render();
    } catch (e) {}
    // let patches = diff(oldNode, vnode)
    // patch(context, patches)
    // updateTarget(context, oldNode, vnode)
    updateElement(context, oldNode, vnode);
    // update oldnode, or may cause diff vdom bug
    oldNode = vnode;
  }

  return function (_ins) {
    var vnode = _ins;
    // 兼容functional program
    if (vnode.children && !vnode.children.length) {
      var _vnode = vnode,
          props = _vnode.props,
          children = _vnode.children;

      var model = {
        children: children,
        props: props
      };
      vnode = vnode.fn(model);
    }
    // 兼容 class模块
    if ('render' in _ins) {
      vnode = _ins.render();
      ins = _ins;
      _ins.$update = _ins.$update.bind(_this, function () {
        dispatch('updateAll');
      });
    }
    return node ? update(vnode) : create(vnode);
  };
}

var ifBox = function (_component) {
  inherits(ifBox, _component);

  function ifBox() {
    classCallCheck(this, ifBox);
    return possibleConstructorReturn(this, (ifBox.__proto__ || Object.getPrototypeOf(ifBox)).apply(this, arguments));
  }

  createClass(ifBox, [{
    key: 'render',
    value: function render(_ref) {
      var props = _ref.props,
          children = _ref.children;

      var _children = deepClone(children);
      var elseBox = findChildren(children, 'else');
      elseBox.index >= 0 && _children.splice(elseBox.index, 1);
      var subprop = deepClone(props);
      delete subprop['cond'];
      if (props.cond) {
        return createNode(
          'div',
          subprop,
          _children
        );
      } else {
        return createNode(
          'div',
          subprop,
          elseBox.children
        );
      }
    }
  }]);
  return ifBox;
}(component);

var forBox = function (_component) {
  inherits(forBox, _component);

  function forBox() {
    classCallCheck(this, forBox);
    return possibleConstructorReturn(this, (forBox.__proto__ || Object.getPrototypeOf(forBox)).apply(this, arguments));
  }

  createClass(forBox, [{
    key: 'handlePath',
    value: function handlePath(item, hashData) {
      var paths = item.match(/__(.*?)__/g);
      var d = '';
      paths && paths.forEach(function (path) {
        d = hashData[path.substring(2, path.length - 2)];
        item = item.replace(path, typeof d === 'undefined' ? '' : d);
      });
      return item;
    }
  }, {
    key: 'handleAttribute',
    value: function handleAttribute(attributes, hashData) {
      var _this2 = this;

      Object.keys(attributes).forEach(function (key) {
        attributes[key] = _this2.handlePath(attributes[key], hashData);
      });
    }
  }, {
    key: 'handleChildren',
    value: function handleChildren(children, hashData) {
      var _this3 = this;

      children.forEach(function (item) {
        if (item.nodeValue) {
          item.nodeValue = _this3.handlePath(item.nodeValue, hashData);
        }
        item.attributes && _this3.handleAttribute(item.attributes, hashData);
        item.children && _this3.handleChildren(item.children, hashData);
      });
      return children;
    }
  }, {
    key: 'render',
    value: function render(_ref) {
      var _this4 = this;

      var props = _ref.props,
          children = _ref.children;

      if (props.data) {
        var hashData = '';
        var allChidren = [];
        props.data.forEach(function (item, i) {
          item.index = i;
          hashData = JSON2Hash(item, props.key || 'item');
          allChidren = allChidren.concat(_this4.handleChildren(deepClone(children), hashData));
        });
        var subprop = deepClone(props);
        delete subprop['data'];
        delete subprop['key'];
        return createNode(
          'div',
          subprop,
          allChidren
        );
      } else {
        return '';
      }
    }
  }]);
  return forBox;
}(component);

var elseBox = function (_component) {
  inherits(elseBox, _component);

  function elseBox() {
    classCallCheck(this, elseBox);
    return possibleConstructorReturn(this, (elseBox.__proto__ || Object.getPrototypeOf(elseBox)).apply(this, arguments));
  }

  createClass(elseBox, [{
    key: 'render',
    value: function render(_ref) {
      var props = _ref.props,
          children = _ref.children;

      if (props && Object.keys(props).indexOf('cond') >= 0) {
        var elseChildren = findChildren(children, 'else');

        var _children = children;
        if (elseChildren.index >= 0) {
          _children = deepClone(children);
          _children.splice(elseChildren.index, 1);
        }
        var subprop = deepClone(props);
        delete subprop['cond'];
        if (props.cond) {
          return createNode(
            'div',
            subprop,
            _children
          );
        } else {
          return createNode(
            'div',
            subprop,
            elseChildren.children
          );
        }
      } else {
        return createNode(
          'div',
          props,
          children
        );
      }
    }
  }]);
  return elseBox;
}(component);

var l = createNode;
var component$1 = component;

var IF = ifBox;
var FOR = forBox;
var ELSE = elseBox;

var app = function app(root) {
  for (var _len = arguments.length, subviews = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    subviews[_key - 1] = arguments[_key];
  }

  return function () {
    if ('render' in subviews[0]) {
      initNode(root)(subviews[0]);
    } else {
      var env = initNode(root)(createNode(subviews[0], null));
      subviews.map(function (item) {
        item.$update = function () {
          env = initNode(root, env)(createNode(subviews[0], null));
        };
      });
    }
  }();
};

export { l, component$1 as component, IF, FOR, ELSE, app };
