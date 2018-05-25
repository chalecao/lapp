var e="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},n=function(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")},t=function(){function e(e,n){for(var t=0;t<n.length;t++){var r=n[t];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(n,t,r){return t&&e(n.prototype,t),r&&e(n,r),n}}(),r=function(e,n){if("function"!=typeof n&&null!==n)throw new TypeError("Super expression must either be null or a function, not "+typeof n);e.prototype=Object.create(n&&n.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),n&&(Object.setPrototypeOf?Object.setPrototypeOf(e,n):e.__proto__=n)},o=function(e,n){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!n||"object"!=typeof n&&"function"!=typeof n?e:n},i=function(e){if(Array.isArray(e)){for(var n=0,t=Array(e.length);n<e.length;n++)t[n]=e[n];return t}return Array.from(e)},u=function(n){return function(t){return(void 0===t?"undefined":e(t))===n}},a=function(e){return function(n){return n.type===e}},c=function(e){return u("undefined")(e)&&void 0==e},f=u("string"),d=u("boolean"),l=u("number"),s=function(e){return e.toString().match("function")},p=function(e){return e.toString().match("class ")},h=function(e){return null===e},v=a("native"),y=a("thunk"),b=a("text"),m=Array.isArray,g=function(e){return"Object"==Object.prototype.toString.call(e).slice(8,-1)},k=function(e,n){return e.fn===n.fn},O=function(e){return["svg","path","animate"].indexOf(e)>=0},_=function(e){return/^on/.test(e)},j=function(e){return e.slice(2).toLowerCase()},A=function n(t,r){var o={};return Object.keys(t).forEach(function(i){o[r+"."+i]=t[i],"object"===e(t[i])&&(o=Object.assign(o,n(t[i],r+"."+i)))}),o},w=function(e,n){var t=-1,r=e.find(function(e,r){if(e.fn&&e.fn.toString().match(n))return t=r,!0});return{index:t,children:r}},E=function e(n){var t;if(g(n))t={};else{if(!m(n))return n;t=[]}for(var r in n){var o=n[r];g(o)?t[r]=e(o):m(o)?t[r]=e(o):t[r]=n[r]}return t};function N(e){for(var n=arguments,t=arguments.length,r=Array(t>2?t-2:0),o=2;o<t;o++)r[o-2]=n[o];var i=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};if(e)return r=Array.prototype.reduce.call(r,S,[]),s(e)?$(e,i,r,e):{type:"native",tagName:e,attributes:i,children:r}}function $(e,n,t,r){return{type:"thunk",fn:e,props:n,children:t,options:r}}function x(e){return{type:e?"text":"empty",nodeValue:e}}function S(e,n){return f(n)||l(n)?e.push(x(n)):h(n)||c(n)||(m(n)?e=[].concat(i(e),i(n.reduce(S,[]))):e.push(n)),e}var C=function(){function e(){n(this,e)}return t(e,[{key:"$update",value:function(e){e&&e()}},{key:"render",value:function(){}}]),e}();function P(e,n){n&&Object.keys(n).forEach(function(t){_(t)&&e.addEventListener(j(t),n[t])})}function V(e,n){n&&Object.keys(n).forEach(function(t){_(t)&&e.removeEventListener(j(t),n[t])})}function L(e,n,t,r){t?(e[r](n,t),e[n]=!0):(e[r](n),e[n]=!1)}function T(e,n,t,r){_(n)||("className"===n?e[r]("class",t):d(t)?L(e,n,t,r):void 0!=t&&(""+t).length?e[r](n,t):e.removeAttribute(n))}function R(e,n,t,r){t?r&&t===r||T(e,n,t,"setAttribute"):T(e,n,d(t)?t:r,"removeAttribute")}function q(e,n){var t=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},r=Object.assign({},t,n);Object.keys(r).forEach(function(r){_(r)?(V(e,{name:t[r]}),P(e,{name:n[r]})):R(e,r,n[r],t[r])})}function H(e){var n=f(e)||l(e)?e:"";return document.createTextNode(n)}function M(e,n){var t=e.props,r={children:e.children,props:t},o=void 0,i=void 0;if(p(e.fn))o=(i=new e.fn).render(r),i.$update=i.$update.bind(this,function(){n&&n("updateAll")});else try{o=e.fn(r)}catch(t){o=(i=new e.fn).render(r),i.$update=i.$update.bind(this,function(){n&&n("updateAll")})}if(!o)return"";var u=D(o);return P(u,o.attributes),o.attributes.onShow&&o.attributes.onShow(),e.state={vnode:o,$ins:i,model:r},u}function U(e){return document.createElementNS("http://www.w3.org/2000/svg",e)}function z(e,n){var t=O(e.tagName)?U(e.tagName):document.createElement(e.tagName);return e.attributes&&q(t,e.attributes),e.attributes&&P(t,e.attributes),e.children.map(function(t){return"thunk"==t.type&&(t.fn.$update=function(){return e.fn.$update&&e.fn.$update()}),D(t,n)}).forEach(t.appendChild.bind(t)),t}function B(){return document.createElement("noscript")}var D=function(e,n){if(!h(e)&&!c(e))switch(e.type){case"text":return H(e.nodeValue);case"thunk":return M(e,n);case"empty":return B();case"native":return z(e,n)}};function F(e,n,t){var r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:0;if(e&&(n!==t||"thunk"==n.type))if(c(n)||!c(t))if(!c(n)||c(t))if(!h(n)&&h(t)||h(n)&&!h(t))I(e,n,t,r);else if(n.type===t.type)if(t.attributes&&t.attributes.forceUpdate)I(e,n,t,r);else{if(v(t))return n.tagName!==t.tagName?void I(e,n,t,r):(q(e.childNodes[r],t.attributes,n.attributes),void K(e,n,t,r));if(b(t))n.nodeValue!==t.nodeValue&&(e.childNodes[r].nodeValue=t.nodeValue);else if(y(t)){if(!k(n,t))return void W(e,n,t,r);if(!n.props.key||n.props.key!=t.props.key)return void Q(e,n,t,r)}}else I(e,n,t,r);else e.appendChild(D(t));else G(e,n,t,r)}function G(e,n,t,r){J(n),e.removeChild(e.childNodes[r])}function I(e,n,t,r){var o=D(t);return J(n),e.replaceChild(o,e.childNodes[r]),o}function J(e){for(;y(e);){var n=e.options.onRemove,t=e.state.model;n&&n(t),e=e.state.vnode}e.children&&e.children.forEach(J)}function K(e,n,t,r){var o=n.children||[],i=t.children||[],u=void 0,a=Array.prototype.slice.call(e.childNodes),c=i.length;for(u=0;u<o.length||u<c;u++)F(a[r],o[u],i[u],u>=c?c:u);return e}function Q(e,n,t,r){var o=t.props,i={children:t.children,props:o},u=void 0;if(p(t.fn))u=n.state.$ins.render(i);else try{u=t.fn(i)}catch(e){u=n.state.$ins.render(i)}return F(e,n.state.vnode,u,r),t.state={vnode:u,$ins:n.state.$ins,model:i},e}function W(){return Q.apply(null,arguments)}function X(e,n){var t=this,r=n||{node:null,oldNode:null,ins:null},o=r.node,i=r.oldNode,u=r.ins;e="string"==typeof e?document.querySelector(e):e;var a=function(n){return"updateAll"===n&&function(){var n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:i,t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:e;try{n=u&&u.render()}catch(e){}F(t,i,n),i=n}()};return n||(e.innerHTML=""),function(n){var r=n;if(r.children&&!r.children.length){var c=r,f=c.props,d=c.children,l=c.fn,s={children:d,props:f};(r=r.fn(s)).fn=l}return"render"in n&&(r=n.render(),u=n,n.$update=n.$update.bind(t,function(){a("updateAll")})),o?function(){var n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:i;return F(arguments.length>1&&void 0!==arguments[1]?arguments[1]:e,i,n),{node:o,oldNode:i=n,ins:u}}(r):function(n){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:e;return o=D(n,a),t.appendChild(o),{node:o,oldNode:i=n,ins:u}}(r)}}var Y=function(e){function i(){return n(this,i),o(this,(i.__proto__||Object.getPrototypeOf(i)).apply(this,arguments))}return r(i,C),t(i,[{key:"render",value:function(e){var n=e.props,t=e.children,r=E(t),o=w(t,"else");o.index>=0&&r.splice(o.index,1);var i=E(n);return delete i.cond,n.cond?N("div",i,r):N("div",i,o.children)}}]),i}(),Z=function(e){function i(){return n(this,i),o(this,(i.__proto__||Object.getPrototypeOf(i)).apply(this,arguments))}return r(i,C),t(i,[{key:"handlePath",value:function(e,n){var t=e.match(/__(.*?)__/g),r="";return t&&t.forEach(function(t){r=n[t.substring(2,t.length-2)],e=e.replace(t,void 0===r?"":r)}),e}},{key:"handleAttribute",value:function(e,n){var t=this;Object.keys(e).forEach(function(r){e[r]=t.handlePath(e[r],n)})}},{key:"handleChildren",value:function(e,n){var t=this;return e.forEach(function(e){e.nodeValue&&(e.nodeValue=t.handlePath(e.nodeValue,n)),e.attributes&&t.handleAttribute(e.attributes,n),e.children&&t.handleChildren(e.children,n)}),e}},{key:"render",value:function(e){var n=this,t=e.props,r=e.children;if(t.data){var o="",i=[];t.data.forEach(function(e,u){e.index=u,o=A(e,t.key||"item"),i=i.concat(n.handleChildren(E(r),o))});var u=E(t);return delete u.data,delete u.key,N("div",u,i)}return""}}]),i}(),ee=function(e){function i(){return n(this,i),o(this,(i.__proto__||Object.getPrototypeOf(i)).apply(this,arguments))}return r(i,C),t(i,[{key:"render",value:function(e){var n=e.props,t=e.children;if(n&&Object.keys(n).indexOf("cond")>=0){var r=w(t,"else"),o=t;r.index>=0&&(o=E(t)).splice(r.index,1);var i=E(n);return delete i.cond,n.cond?N("div",i,o):N("div",i,r.children)}return N("div",n,t)}}]),i}(),ne=N,te=C,re=Y,oe=Z,ie=ee,ue=function(e){for(var n=arguments,t=arguments.length,r=Array(t>1?t-1:0),o=1;o<t;o++)r[o-1]=n[o];return function(){if("render"in r[0])X(e)(r[0]);else{var n=X(e)(N(r[0],null));r.map(function(t){t.$update=function(){n=X(e,n)(N(r[0],null))}})}}()};export{ne as l,te as component,re as IF,oe as FOR,ie as ELSE,ue as app};
