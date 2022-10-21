import { useReducer } from "react";
import { SET_ALERTS, REMOVE_ALERTS } from "../types.js";
import AlertContext from "./AlertContext.js";
import alertReducer from "./AlertReducer.js";

function AlertState(props)
{
    let initialState = {
        alert : null
    };

    let [state, dispatch] = useReducer(alertReducer, initialState);

    function setAlert(alert)
    {
        dispatch({type : SET_ALERTS, payload : alert});
    }

    function removeAlert()
    {
        dispatch({type : REMOVE_ALERTS});
    }

    return (
        <AlertContext.Provider value={{
            alert : state.alert,
            setAlert,
            removeAlert
        }}>
            {props.children}
        </AlertContext.Provider>
    )
}

export default  AlertState;