import Buffering from "./Assets/Buffering.gif";
import axios from "axios";
import Work from "./Assets/Work.gif";
import { useNavigate } from "react-router-dom";
import AlertContext from "../Contexts/Alerts/AlertContext.js";
import Alert from "./Alerts.js";
import UserContext from "../Contexts/User/UserContext";
import Loading from "./Loading.js";
import { useContext, useEffect } from "react";
import TodoContext from "../Contexts/Todos/TodoContext";

function AllTasks()
{
    // Errors
  let alertContext = useContext(AlertContext);
  let { error, setAlert, removeAlert } = alertContext;
  
  // Loading
  let userContext = useContext(UserContext);
  let {loading, startLoading, stopLoading, verifyAuth} = userContext;

  let todoContext = useContext(TodoContext);
  let {getAllTasks, allTasks } = todoContext;

  let navigate = useNavigate();

  function goBack()
  {
      navigate("/user");
  }

  useEffect(() => {
    verifyAuth();
    if (!allTasks.data)
    {
        startLoading();
        getAllTasks();
        stopLoading();
    }
  }, []);

    return (
        <>
            <center>
                {!loading && allTasks.data ? allTasks.data.map((ele, index) => {
                    return (
                        <div key={index}>
                            <p>{index + 1}. {ele.description}</p>
                        </div>
                    );
                }) : <Loading/>}

                <button onClick={goBack}>
                    Go back
                </button>
            </center>
        </>
    );
}

export default AllTasks;