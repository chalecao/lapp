"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},n=function(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")},t=function(){function e(e,n){for(var t=0;t<n.length;t++){var r=n[t];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(n,t,r){return t&&e(n.prototype,t),r&&e(n,r),n}}(),r=function(e,n){if("function"!=typeof n&&null!==n)throw new TypeError("Super expression must either be null or a function, not "+typeof n);e.prototype=Object.create(n&&n.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),n&&(Object.setPrototypeOf?Object.setPrototypeOf(e,n):e.__proto__=n)},o=function(e,n){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!n||"object"!=typeof n&&"function"!=typeof n?e:n},i=function(e){if(Array.isArray(e)){for(var n=0,t=Array(e.length);n<e.length;n++)t[n]=e[n];return t}return Array.from(e)},u=function(n){return function(t){return(void 0===t?"undefined":e(t))===n}},a=function(e){return function(n){return n.type===e}},c=function(e){return u("undefined")(e)&&void 0==e},f=u("string"),d=u("boolean"),l=u("number"),s=function(e){return e.toString().match("function")},p=function(e){return e.toString().match("class ")},h=function(e){return null===e},v=a("native"),y=a("thunk"),b=a("text"),m=Array.isArray,g=function(e){return"Object"==Object.prototype.toString.call(e).slice(8,-1)},O=function(e,n){return e.fn===n.fn},k=function(e){return["svg","path","animate"].indexOf(e)>=0},_=function(e){return/^on/.test(e)},j=function(e){return e.slice(2).toLowerCase()},x=function n(t,r){var o={};return Object.keys(t).forEach(function(i){o[r+"."+i]=t[i],"object"===e(t[i])&&(o=Object.assign(o,n(t[i],r+"."+i)))}),o},E=function(e,n){var t=-1,r=e.find(function(e,r){if(e.fn&&e.fn.toString().match(n))return t=r,!0});return{index:t,children:r}},A=function e(n){var t;if(g(n))t={};else{if(!m(n))return n;t=[]}for(var r in n){var o=n[r];g(o)?t[r]=e(o):m(o)?t[r]=e(o):t[r]=n[r]}return t};function N(e){for(var n=arguments,t=arguments.length,r=Array(t>2?t-2:0),o=2;o<t;o++)r[o-2]=n[o];var i=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};if(e)return r=Array.prototype.reduce.call(r,S,[]),s(e)?w(e,i,r,e):{type:"native",tagName:e,attributes:i,children:r}}function w(e,n,t,r){return{type:"thunk",fn:e,props:n,children:t,options:r}}function $(e){return{type:e?"text":"empty",nodeValue:e}}function S(e,n){return f(n)||l(n)?e.push($(n)):h(n)||c(n)||(m(n)?e=[].concat(i(e),i(n.reduce(S,[]))):e.push(n)),e}var C=function(){function e(){n(this,e)}return t(e,[{key:"$update",value:function(e){e&&e()}},{key:"render",value:function(){}}]),e}();function P(e,n){n&&Object.keys(n).forEach(function(t){_(t)&&e.addEventListener(j(t),n[t])})}function V(e,n){n&&Object.keys(n).forEach(function(t){_(t)&&e.removeEventListener(j(t),n[t])})}function M(e,n,t,r){t?(e[r](n,t),e[n]=!0):(e[r](n),e[n]=!1)}function L(e,n,t,r){_(n)||("className"===n?e[r]("class",t):d(t)?M(e,n,t,r):void 0!=t&&(""+t).length?e[r](n,t):e.removeAttribute(n))}function T(e,n,t,r){t?r&&t===r||L(e,n,t,"setAttribute"):L(e,n,d(t)?t:r,"removeAttribute")}function R(e,n){var t=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},r=Object.assign({},t,n);Object.keys(r).forEach(function(r){_(r)?(V(e,{name:t[r]}),P(e,{name:n[r]})):T(e,r,n[r],t[r])})}function U(e){var n=f(e)||l(e)?e:"";return document.createTextNode(n)}function F(e,n){var t=e.props,r=e.children,o=e.options.onCreate,i={children:r,props:t},u=void 0,a=void 0;if(p(e.fn))u=(a=new e.fn).render(i),a.$update=a.$update.bind(this,function(){n&&n("updateAll")});else try{u=e.fn(i)}catch(t){u=(a=new e.fn).render(i),a.$update=a.$update.bind(this,function(){n&&n("updateAll")})}if(!u)return"";var c=z(u);return P(c,u.attributes),o&&o(i),e.state={vnode:u,$ins:a,model:i},c}function q(e){return document.createElementNS("http://www.w3.org/2000/svg",e)}function H(e,n){var t=k(e.tagName)?q(e.tagName):document.createElement(e.tagName);return e.attributes&&R(t,e.attributes),e.attributes&&P(t,e.attributes),e.children.map(function(e){return{item:e,el:z(e,n)}}).forEach(function(n){var r=n.item,o=n.el;"thunk"==r.type&&(r.fn.$update=function(){return e.fn.$update&&e.fn.$update()},r.props.onMount&&r.props.onMount()),t.appendChild(o),"thunk"==r.type&&r.props.afterMount&&r.props.afterMount()}),t}function I(){return document.createElement("noscript")}var z=function(e,n){if(!h(e)&&!c(e))switch(e.type){case"text":return U(e.nodeValue);case"thunk":return F(e,n);case"empty":return I();case"native":return H(e,n)}};function B(e,n,t){var r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:0;if(e)return n===t&&"thunk"!=n.type?e:!c(n)&&c(t)?D(e,n,t,r):c(n)&&!c(t)?(e.appendChild(z(t)),e):!h(n)&&h(t)||h(n)&&!h(t)?G(e,n,t,r):n.type!==t.type?G(e,n,t,r):t.attributes&&t.attributes.forceUpdate?G(e,n,t,r):v(t)?n.tagName!==t.tagName?G(e,n,t,r):(R(e.childNodes[r],t.attributes,n.attributes),K(e,n,t,r)):b(t)?(n.nodeValue!==t.nodeValue&&(e.childNodes[r].nodeValue=t.nodeValue),e):y(t)?O(n,t)?Q(e,n,t,r):W(e,n,t,r):void 0}function D(e,n,t,r){J(n),e.removeChild(e.childNodes[r])}function G(e,n,t,r){var o=z(t);return J(n),e.replaceChild(o,e.childNodes[r]),o}function J(e){for(;y(e);){var n=e.options.onRemove,t=e.state.model;n&&n(t),e=e.state.vnode}e.children&&e.children.forEach(J)}function K(e,n,t,r){var o=n.children||[],i=t.children||[],u=void 0,a=Array.prototype.slice.call(e.childNodes),c=i.length;for(u=0;u<o.length||u<c;u++)B(a[r],o[u],i[u],u>=c?c:u);return e}function Q(e,n,t,r){var o=t.props,i={children:t.children,props:o},u=void 0;if(p(t.fn))u=n.state.$ins.render(i);else try{u=t.fn(i)}catch(e){u=n.state.$ins.render(i)}return o.onUpdate&&o.onUpdate(),B(e,n.state.vnode,u,r),t.state={vnode:u,$ins:n.state.$ins,model:i},e}function W(){return Q.apply(null,arguments)}function X(e,n){var t=this,r=n||{node:null,oldNode:null,ins:null},o=r.node,i=r.oldNode,u=r.ins;e="string"==typeof e?document.querySelector(e):e;var a=function(n){return"updateAll"===n&&function(){var n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:i,t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:e;try{n=u&&u.render()}catch(e){}B(t,i,n),i=n}()};return n||(e.innerHTML=""),function(n){var r=n;if(r.children&&!r.children.length){var c=r,f=c.props,d=c.children,l=c.fn,s={children:d,props:f};(r=r.fn(s)).fn=l}return"render"in n&&(r=n.render(),u=n,n.$update=n.$update.bind(t,function(){a("updateAll")})),o?function(){var n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:i;return B(arguments.length>1&&void 0!==arguments[1]?arguments[1]:e,i,n),{node:o,oldNode:i=n,ins:u}}(r):function(n){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:e;return o=z(n,a),t.appendChild(o),{node:o,oldNode:i=n,ins:u}}(r)}}var Y=function(e){function i(){return n(this,i),o(this,(i.__proto__||Object.getPrototypeOf(i)).apply(this,arguments))}return r(i,C),t(i,[{key:"render",value:function(e){var n=e.props,t=e.children,r=A(t),o=E(t,"else");o.index>=0&&r.splice(o.index,1);var i=A(n);return delete i.cond,n.cond?N("div",i,r):N("div",i,o.children)}}]),i}(),Z=function(e){function i(){return n(this,i),o(this,(i.__proto__||Object.getPrototypeOf(i)).apply(this,arguments))}return r(i,C),t(i,[{key:"handlePath",value:function(e,n){var t=e.match(/__(.*?)__/g),r="";return t&&t.forEach(function(t){r=n[t.substring(2,t.length-2)],e=e.replace(t,void 0===r?"":r)}),e}},{key:"handleAttribute",value:function(e,n){var t=this;Object.keys(e).forEach(function(r){e[r]=t.handlePath(e[r],n)})}},{key:"handleChildren",value:function(e,n){var t=this;return e.forEach(function(e){e.nodeValue&&(e.nodeValue=t.handlePath(e.nodeValue,n)),e.attributes&&t.handleAttribute(e.attributes,n),e.children&&t.handleChildren(e.children,n)}),e}},{key:"render",value:function(e){var n=this,t=e.props,r=e.children;if(t.data){var o="",i=[];t.data.forEach(function(e,u){e.index=u,o=x(e,t.key||"item"),i=i.concat(n.handleChildren(A(r),o))});var u=A(t);return delete u.data,delete u.key,N("div",u,i)}return""}}]),i}(),ee=function(e){function i(){return n(this,i),o(this,(i.__proto__||Object.getPrototypeOf(i)).apply(this,arguments))}return r(i,C),t(i,[{key:"render",value:function(e){var n=e.props,t=e.children;if(n&&Object.keys(n).indexOf("cond")>=0){var r=E(t,"else"),o=t;r.index>=0&&(o=A(t)).splice(r.index,1);var i=A(n);return delete i.cond,n.cond?N("div",i,o):N("div",i,r.children)}return N("div",n,t)}}]),i}(),ne=N,te=C,re=Y,oe=Z,ie=ee,ue=function(e){for(var n=arguments,t=arguments.length,r=Array(t>1?t-1:0),o=1;o<t;o++)r[o-1]=n[o];return function(){if("render"in r[0])X(e)(r[0]);else{var n=X(e)(N(r[0],null));r.map(function(t){t.$update=function(){n=X(e,n)(N(r[0],null))}})}}()};exports.l=ne,exports.component=te,exports.IF=re,exports.FOR=oe,exports.ELSE=ie,exports.app=ue;
