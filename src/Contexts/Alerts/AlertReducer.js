import { SET_ALERTS, REMOVE_ALERTS } from "../types.js";


export default (state, action) => {
    switch (action.type) {
        case SET_ALERTS:
            
            return {alert : action.payload};
        
        case REMOVE_ALERTS:
            
            return {alert : null};
            
        default:
            return state;
    }
}