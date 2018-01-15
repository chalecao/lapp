## lapp
lapp = function & class virtual dom, it's pure, simlpe and fast to render JSX tpl. Now it's depend on babel to transform jsx tpl to the func, but lapp extend self template grama. you can see the detail below.

## npm module
you can install lapp:
```
npm install lapp --save-dev
```

## how to use

lapp support function component and class component, typeof class = function.

for the function component example, the code as follows, you can also see the example folder: 
```
/** @jsx creatNode */
import {creatNode, initNode}  from "../src/index"
let count = 0
let MyButton = {
    render: ({ props, children }) =>{
        return (<button onClick={addCount} {...props}>{children}{count}</button>)
    }
}

let Box ={
    render: ({ props, children }) => <ul style="list-style: none;">
        <li className="item" onClick={() => alert('hi!')}>item 1</li>
        <li className="item">
            <input type="checkbox" checked={true} />
            <input type="text" onInput={log} />
        </li>
        {/* this node will always be updated */}
        <li forceUpdate={true}>text</li>
        <MyButton className="button">hello, button</MyButton>
    </ul>
};


function log(e) {
    console.log(e.target.value);
}

function addCount() {
    count++
    app()
}

let render = initNode(document.body)
let app = () => {
    render(<Box></Box>)
}
app()

```

for the class component, see as follows:
```
/** @jsx creatNode */
import { creatNode, initNode, component } from "../src/index"
class myButton  extends component{
    constructor(){
        super()
        this.count = 0;
    }
    addCount() {
        this.count++;
        this.$update();
    }
    render({ props, children}) {
        return (<button onClick={this.addCount.bind(this)} {...props}>{children}{this.count}</button>)
    }
}

export default myButton
```

you can run the example with:
```
npm run run:example
```
you can use it freely!

## template
lapp define it's own template through  component provided default in the tpl. to keep template simple, it doesn't support compute the data with context variables.

you you can also see the example, a little complicated as follows:
```
/** @jsx creatNode */
import { creatNode, initNode, component } from "../src/index"
import MyButton from "./myButton"
import {IF, ELSE, FOR} from "../src/tpl"
class main extends component {
    constructor() {
        super()
        this.aa = -1;
        this.bb = -1;
        this.data = [{ name: "11", href: "22" }, { name: "33", href: "44" }]
    }
    log(e) {
        console.log(e.target.value);
    }
    compute(data){
        let dd = [];
        data.forEach((item,index)=>{
            dd.push(<div>
                <div class="title">
                    {item.name}
                </div>
                <IF cond={item.href == "22"}>
                    <div class="spin">{item.href}</div>
                </IF>
                </div>
            )
        })
        return dd;
    }
    render({ props, children }) {
        const aa = [1, 2]
        return (<ul style="list-style: none;">
            <li className="item" onClick={() => alert('hi!')}>item 1</li>
            <li className="item">
                <input type="checkbox" checked={true} />
                <input type="text" onInput={this.log.bind(this)} />
            </li>
            {/* this node will always be updated */}
            <li forceUpdate={true}>text</li>
            <MyButton className="button">hello, button</MyButton>
            <IF cond={this.aa > 0}>
                aa 大于 0
            <ELSE cond={this.bb > 0}>
                    aa 小于 0
                bb 大于 0
                <ELSE>
                        aa 小于 0
                   bb 小于 0
                </ELSE>
                </ELSE>
            </IF>
            <IF cond={this.aa < 0}>
            sdfsdfsfsd
            <FOR data={this.data} key="item" >
                <a href="__item.href__" >__item.name__ -  __item.index__</a>
                <div><span>__item.href__ </span></div>
                <IF cond={this.aa < 0}>
                aa 小于 0
                </IF>
            </FOR>
            </IF>
            {this.compute(this.data)}
        </ul>)
    }

}

let renderGlobal = initNode(document.body)
renderGlobal(new main().render({ props: {}, children: [] }))

//simple usage, just create DOM with virtual DOM
document.body.appendChild(createDom(new main().render()))

```
## release
* v1.1.0 fix many bugs;
    * add ins to fix bug: update the func element
    * fix bug, shou test type after, because pre may undefined when create new node