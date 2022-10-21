import { SET_LOADING, REMOVE_LOADING, SET_USER } from "../types";

export default (state, action) => {
    switch (action.type) {
        case SET_LOADING:
            
            return {...state, loading : true};

        case REMOVE_LOADING:
            
            return {...state, loading : false};

        case  SET_USER:

            return {...state, user : action.user};
            
        default:
            return state;
    }
}