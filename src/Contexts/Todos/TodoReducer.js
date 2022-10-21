import { ALL_TASKS, SINGLE_TASK } from "../types";

export default (state, action) => {
    switch (action.type) {
        case ALL_TASKS:
            
            return {...state, allTasks : action.data};
    
        case SINGLE_TASK:

            return {...state, singleTask : action.data};

        default:
            return state;
    }
}