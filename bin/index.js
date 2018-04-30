var n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(n){return typeof n}:function(n){return n&&"function"==typeof Symbol&&n.constructor===Symbol&&n!==Symbol.prototype?"symbol":typeof n},e=function(e){return function(t){return(void 0===t?"undefined":n(t))===e}},t=function(n){return function(e){return e.type===n}},r=function(n){return e("undefined")(n)&&void 0==n},o=e("string"),i=e("boolean"),u=e("number"),a=function(n){return n.toString().match("function")},c=function(n){return n.toString().match("class ")},d=function(n){return null===n},l=t("native"),f=t("thunk"),s=t("text"),p=Array.isArray,h=function(n,e){return n.fn===e.fn},v=function(n){return["svg","path","animate"].indexOf(n)>=0},y=function(n){return/^on/.test(n)},m=function(n){return n.slice(2).toLowerCase()};function g(n){if(Array.isArray(n)){for(var e=0,t=Array(n.length);e<n.length;e++)t[e]=n[e];return t}return Array.from(n)}function b(n){for(var e=arguments,t=arguments.length,r=Array(t>2?t-2:0),o=2;o<t;o++)r[o-2]=e[o];var i=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};if(n)return r=Array.prototype.reduce.call(r,$,[]),a(n)?N(n,i,r,n):{type:"native",tagName:n,attributes:i,children:r}}function N(n,e,t,r){return{type:"thunk",fn:n,props:e,children:t,options:r}}function A(n){return{type:n?"text":"empty",nodeValue:n}}function $(n,e){return o(e)||u(e)?n.push(A(e)):d(e)||r(e)?n.push(A()):p(e)?n=[].concat(g(n),g(e.reduce($,[]))):n.push(e),n}function w(n,e,t,r){t?(n[r](e,t),n[e]=!0):(n[r](e),n[e]=!1)}function V(n,e,t,r){y(e)||("className"===e?n[r]("class",t):i(t)?w(n,e,t,r):void 0!=t&&(""+t).length?n[r](e,t):n.removeAttribute(e))}function k(n,e,t,r){t?r&&t===r||V(n,e,t,"setAttribute"):V(n,e,i(t)?t:r,"removeAttribute")}function C(n,e){var t=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},r=Object.assign({},t,e);Object.keys(r).forEach(function(r){!y(r)&&k(n,r,e[r],t[r])})}function E(n,e){e&&Object.keys(e).forEach(function(t){y(t)&&n.addEventListener(m(t),e[t])})}function S(n){var e=o(n)||u(n)?n:"";return document.createTextNode(e)}function x(n,e){var t=n.props,r=n.children,o=n.options.onCreate,i={children:r,props:t},u=void 0,a=void 0;if(c(n.fn))u=(a=new n.fn).render(i),a.$update=a.$update.bind(this,function(){e&&e("updateAll")});else try{u=n.fn(i)}catch(t){u=(a=new n.fn).render(i),a.$update=a.$update.bind(this,function(){e&&e("updateAll")})}if(!u)return"";var d=T(u);return E(d,u.attributes),o&&o(i),n.state={vnode:u,$ins:a,model:i},d}function O(n){return document.createElementNS("http://www.w3.org/2000/svg",n)}function j(n,e){var t=v(n.tagName)?O(n.tagName):document.createElement(n.tagName);return n.attributes&&C(t,n.attributes),n.attributes&&E(t,n.attributes),n.children.map(function(n){return T(n,e)}).forEach(t.appendChild.bind(t)),t}function L(){return document.createElement("noscript")}function T(n,e){if(!d(n)&&!r(n))switch(n.type){case"text":return S(n.nodeValue);case"thunk":return x(n,e);case"empty":return L();case"native":return j(n,e)}}function q(n,e,t){var o=arguments.length>3&&void 0!==arguments[3]?arguments[3]:0;if(n)return e===t&&"thunk"!=e.type?n:!r(e)&&r(t)?M(n,e,t,o):r(e)&&!r(t)?(n.appendChild(T(t)),n):!d(e)&&d(t)||d(e)&&!d(t)?P(n,e,t,o):e.type!==t.type?P(n,e,t,o):l(t)?e.tagName!==t.tagName?P(n,e,t,o):(C(n.childNodes[o],t.attributes,e.attributes),z(n,e,t,o)):s(t)?(e.nodeValue!==t.nodeValue&&(n.childNodes[o].nodeValue=t.nodeValue),n):f(t)?h(e,t)?B(n,e,t,o):D(n,e,t,o):void 0}function H(n,e,t){var o=arguments.length>3&&void 0!==arguments[3]?arguments[3]:0;return!r(e)&&r(t)?M(n,e,t,o):r(e)&&!r(t)?(n.appendChild(T(t)),n):!d(e)&&d(t)||d(e)&&!d(t)||e.type!==t.type?P(n,e,t,o):l(t)?e.tagName!==t.tagName?P(n,e,t,o):(C(n.childNodes[o],t.attributes,e.attributes),z(n,e,t,o)):s(t)?(e.nodeValue!==t.nodeValue&&(n.childNodes[o].nodeValue=t.nodeValue),n):f(t)?h(e,t)?B(n,e,t,o):D(n,e,t,o):void 0}function M(n,e,t,r){R(e),n.removeChild(n.childNodes[r])}function P(n,e,t,r){var o=T(t);return R(e),n.replaceChild(o,n.childNodes[r]),o}function R(n){for(;f(n);){var e=n.options.onRemove,t=n.state.model;e&&e(t),n=n.state.vnode}n.children&&n.children.forEach(R)}function z(n,e,t,r){var o=e.children||[],i=t.children||[],u=void 0,a=Array.prototype.slice.call(n.childNodes);for(u=0;u<o.length||u<i.length;u++)q(a[r],o[u],i[u],u);return n}function B(n,e,t,r){var o=t.props,i={children:t.children,props:o},u=void 0;if(c(t.fn))u=e.state.$ins.render(i);else try{u=t.fn(i)}catch(n){u=e.state.$ins.render(i)}return q(n,e.state.vnode,u,r),t.state={vnode:u,$ins:e.state.$ins,model:i},n}function D(){return B.apply(null,arguments)}function F(n,e){var t=this,r=e||{node:null,oldNode:null,ins:null},o=r.node,i=r.oldNode,u=r.ins;n="string"==typeof n?document.querySelector(n):n;var a=function(e){return"updateAll"==e&&function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:i,t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:n;try{e=u&&u.render()}catch(n){}H(t,i,e),i=e}()};return e||(n.innerHTML=""),function(e){var r=e;if(r.children&&!r.children.length){var c=r,d=c.props,l={children:c.children,props:d};r=r.fn(l)}return"render"in e&&(r=e.render(),u=e,e.$update=e.$update.bind(t,function(){a("updateAll")})),o?function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:i;return q(arguments.length>1&&void 0!==arguments[1]?arguments[1]:n,i,e),{node:o,oldNode:i=e,ins:u}}(r):function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:n;return o=T(e,a),t.appendChild(o),{node:o,oldNode:i=e,ins:u}}(r)}}var G=function(){function n(n,e){for(var t=0;t<e.length;t++){var r=e[t];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(n,r.key,r)}}return function(e,t,r){return t&&n(e.prototype,t),r&&n(e,r),e}}();function I(n,e){if(!(n instanceof e))throw new TypeError("Cannot call a class as a function")}var J=function(){function n(){I(this,n)}return G(n,[{key:"$update",value:function(n){n&&n()}},{key:"render",value:function(){}}]),n}(),K=b,Q=J,U=function(n){for(var e=arguments,t=arguments.length,r=Array(t>1?t-1:0),o=1;o<t;o++)r[o-1]=e[o];return function(){if("render"in r[0])F(n)(r[0]);else{var e=F(n)(b(r[0],null));r.map(function(t){t.$update=function(){e=F(n,e)(b(r[0],null))}})}}()};export{K as l,Q as component,U as app};
