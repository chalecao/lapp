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