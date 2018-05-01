## lapp
lapp = lapp = little app, lapp mainly focus on ui component which can be easily developed with OOP or functional programing!
just 9kb MVVM framework! we provide two versions:
bin/index.js - pure MVVM framework.
bin/all.js - MVVM framework with IF/ELSE/FOR component inside.


## npm module
you can install lapp:
```
npm install lapp --save-dev
```

## how to use
lapp support both functional program and oop!
1. fp example, you can find it in example folder main-fp.js

```
import { l, app, IF, ELSE, FOR } from "../src/all"
import { MyButtonView, actions as MyButtonAction } from "./mybutton-fp"

const state = {
    aa: -1,
    bb: -1,
    data: [{ name: "11", href: "22" }, { name: "33", href: "44" }]
}

const actions = {
    log: (e) => {
        console.log(e.target.value);
        MyButtonAction.addCount()
    },
    handleClick: () => {
        state.data.push({ name: "77", href: "88" })
        BoxView.$update()
    },
    compute: (data) => {
        let dd = [];
        state.data.forEach((item, index) => {
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
}

const BoxView = ({ props, children }) => (<ul style="list-style: none;">
    <li className="item" onClick={() => alert('hi!')}>item 1</li>
    <li className="item">
        <input type="checkbox" checked={true} />
        <input type="text" onInput={actions.log} />
    </li>
    <li onClick={actions.handleClick} forceUpdate={true}>text</li>
    <MyButtonView className="button">hello, button</MyButtonView>
    <IF class="aaa" cond={state.aa > 0}>
        aa 大于 0
            <ELSE cond={state.bb > 0}>
            aa 小于 0
                bb 大于 0
                <ELSE>
                aa 小于 0
                   bb 小于 0
                </ELSE>
        </ELSE>
    </IF>
    <IF cond={state.aa < 0}>
        sdfsdfsfsd
            <FOR  class="bbb" data={state.data} key="item" >
            <div>
                <a href="__item.href__" >__item.name__ -  __item.index__ __item.test__</a>
                <div><span>__item.href__ </span></div>
                <IF cond={state.aa < 0}>
                    aa 小于 0
                    </IF>
            </div>
        </FOR>
    </IF>
    {actions.compute(state.data)}
</ul>
);

//main
console.time("render virtual DOM with FP")
app(document.querySelector("#app"), BoxView, MyButtonView)
console.timeEnd("render virtual DOM with FP")
```
2. oop example, you can find it in example folder main-class.js
```
import { l, component, IF, ELSE, FOR } from "../src/index+"
import MyButton from "./myButton-class"
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
    handleClick(){
        this.data.push({ name: "55", href: "66" })
        this.$update()
    }
    handleClick2(){
        this.data.push({ name: "77", href: "88" })
        this.$update()
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
    render() {
        const aa = [1, 2]
        return (<ul style="list-style: none;">
            <li className="item" onClick={this.handleClick.bind(this)}>item 1</li>
            <li className="item" >
                <input type="checkbox" checked={true} />
                <input type="text" onInput={this.log.bind(this)} />
            </li>
            {/* this node will always be updated */}
            <li onClick={this.handleClick2.bind(this)} forceUpdate={true}>text</li>
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
            <FOR class="sadad" data={this.data} key="item" >
                <div>
                    <a href="__item.href__" >__item.name__ -  __item.index__ __item.test__</a>
                    <div><span>__item.href__ </span></div>
                    <IF cond={this.aa < 0}>
                    aa 小于 0
                    </IF>
                </div>
            </FOR>
            </IF>
            {this.compute(this.data)}
        </ul>)
    }

}
export default main

console.time("render virtual DOM with class")
app(document.querySelector("#app"), new main())
console.timeEnd("render virtual DOM with class")

```

### changelog
1. up to my project experience, i delete APIs that no need, to make lapp as small as possiable.
2. for curry function bind in the view, you should add 'forceUpdate' attribute on the element, to make sure update the function when update dom. if not, may cause the function didn't update.