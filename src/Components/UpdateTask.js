import { useContext, useEffect, useState } from "react";
import TodoContext from "../Contexts/Todos/TodoContext.js";
import AlertContext from "../Contexts/Alerts/AlertContext.js";
import UserContext from "../Contexts/User/UserContext.js";
import Loading from "./Loading.js";
import Alert from "./Alerts.js";
import { useNavigate } from "react-router";

function UpdateTask()
{
    // Todo
    let todoContext = useContext(TodoContext);
    let {getSingleTask, singleTask} = todoContext;

    // Alerts
  let alertContext = useContext(AlertContext);
  let { setAlert, removeAlert } = alertContext;

  // Loading
  let userContext = useContext(UserContext);
  let {loading, startLoading, stopLoading, verifyAuth} = userContext;
    
  let navigate = useNavigate();
  
    let [id, setId] = useState({
        id : ""
    });

    function onChangeHandler(event)
    {
        setId({id : event.target.value});
    }

    async function onSubmitHandler(event)
    {
        try {
            event.preventDefault();
            
            startLoading();
            await getSingleTask(id);
            stopLoading();

            setTimeout(() => {
                navigate("/user");
            }, 2000);

        } catch (error) {
            console.log(error);
            setAlert({type : "danger", msg : "Unable to update"});
      stopLoading();
      setTimeout(() => {
        removeAlert();
      }, 3500);
        }
    }

    useEffect(() => {
        verifyAuth();
    }, []);

    return (
        <>
        <center>
        <Alert/>
        Task

        <br/>

        <form onSubmit={onSubmitHandler}>
          <label htmlFor="_id">Task_id</label>
          <br />
          <br/>
          <input type="text" name="id" onChange={onChangeHandler} />
          <br />
          <input type="submit" value="add" />
        </form>

        {!loading && singleTask ? singleTask.data : console.log(null)}

        <Loading/>
        </center>
        </>
    );
}

export default UpdateTask;