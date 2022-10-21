import { useContext, useEffect, useState } from "react";
import TodoContext from "../Contexts/Todos/TodoContext.js";
import AlertContext from "../Contexts/Alerts/AlertContext.js";
import UserContext from "../Contexts/User/UserContext.js";
import Loading from "./Loading.js";
import Alert from "./Alerts.js";

function TaskID()
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

        } catch (error) {
            
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

export default TaskID;