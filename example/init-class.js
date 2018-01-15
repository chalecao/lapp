import { creatNode, initNode, component, createDom } from "../src/index"
import main from "./main-class"


// need update the ins data, so pass the ins；if no need update the ins data, so just pass the vdom which return by render func
console.time("render virtual DOM with class")
let renderGlobal = initNode(document.querySelector("#app"))
renderGlobal(new main())

console.timeEnd("render virtual DOM with class")

// console.time("render virtual DOM with class")

// document.body.appendChild(createDom(new main().render()))

// console.timeEnd("render virtual DOM with class")

