import creat from "./create"
import comp from "./component"
import init from "./init"

import ifBlock from "./tpl/if"
import forBlock from "./tpl/for"
import elseBlock from "./tpl/else"

export const l = creat;
export const component = comp;

export const IF = ifBlock;
export const FOR = forBlock;
export const ELSE = elseBlock;

export const app = (root, ...subviews) => (() => {
    if ("render" in subviews[0]) {
        init(root)(subviews[0])
    } else {
        let env = init(root)(creat(subviews[0], null))
        subviews.map(item => {
            item.$update = () => {
                env = init(root, env)(creat(subviews[0], null))
            }
        })
    }
})()