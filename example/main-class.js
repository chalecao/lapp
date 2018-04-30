import { l, app, component, IF, ELSE, FOR } from "../src/all"
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
    handleClick() {
        this.data.push({ name: "55", href: "66" })
        this.$update()
    }
    handleClick2() {
        this.data.push({ name: "77", href: "88" })
        this.$update()
    }
    compute(data) {
        let dd = [];
        data.forEach((item, index) => {
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
                <input type="text" style="border:1px solid #f40000;" onInput={this.log.bind(this)} />
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

console.time("render virtual DOM with class")
app(document.querySelector("#app"), new main())
console.timeEnd("render virtual DOM with class")
