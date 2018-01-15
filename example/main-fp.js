/** @jsx creatNode */
import { creatNode, initNode, app, IF, ELSE, FOR } from "../src/index"
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