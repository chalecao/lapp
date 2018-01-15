/** @jsx creatNode */
import { creatNode, initNode } from "../src/index"


const state = {
    count: 0
}

export const actions = {
    addCount: () => {
        state.count++;
        MyButtonView.update()
    }
}

export const MyButtonView = ({props, children}) =>(
    <button onClick={actions.addCount} {...props}>{children}{state.count}</button>
)
