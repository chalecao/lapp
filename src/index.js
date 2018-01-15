import creat from "./create"
import init from "./init"
import comp from "./component"
import * as uti from "./util"
import { createElement } from './createElement'

import ifBlock from "./tpl/if"
import forBlock from "./tpl/for"
import elseBlock from "./tpl/else"

export const creatNode = creat;
export const initNode = init;
export const component = comp;
export const createDom = createElement;
export const util = uti;

export const IF = ifBlock;
export const FOR = forBlock;
export const ELSE = elseBlock;

export const app = (root, ...subviews) => (() => {
    
    let env = initNode(root)(creat(subviews[0], null))
    subviews.map(item =>{
        item.$update = ()=>{
            initNode(root, env)(creat(subviews[0], null))
        }
    })
})()