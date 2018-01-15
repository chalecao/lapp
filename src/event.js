import { isEventProp, extractEventName } from './util'

/**
 * add event handler
 * @param {*}  
 * @param {*} props 
 */
export function addEventListeners($target, props) {
    props && Object.keys(props).forEach(name => {
        if (isEventProp(name)) {
            $target.addEventListener(
                extractEventName(name),
                props[name]
            );
        }
    });
}