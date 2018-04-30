import { isEventProp, extractEventName } from './util'

/**
 * add event handler
 * @param {*}  
 * @param {*} props 
 */
export function addEventListeners($target, props) {
    Object.keys(props).forEach(name => {
        if (isEventProp(name)) {
            $target.addEventListener(
                extractEventName(name),
                props[name]
            );
        }
    });
}

export function removeEventListeners($target, props) {
    Object.keys(props).forEach(name => {
        if (isEventProp(name)) {
            $target.removeEventListener(
                extractEventName(name),
                props[name]
            );
        }
    });
}