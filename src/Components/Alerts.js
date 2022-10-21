import { useContext } from "react";
import AlertContext from "../Contexts/Alerts/AlertContext";

function Alert() {
  let alertContext = useContext(AlertContext);
  let { alert } = alertContext;
  return (<>{alert && <h3 className={`alert-${alert.type}`}>{alert.msg}</h3>}</>);
}

export default Alert;