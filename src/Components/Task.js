import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AlertContext from "../Contexts/Alerts/AlertContext.js";
import UserContext from "../Contexts/User/UserContext.js";
import Alert from "./Alerts";
import Loading from "./Loading";

function Task()
{
    // Alerts
  let alertContext = useContext(AlertContext);
  let { setAlert, removeAlert } = alertContext;

  // Loading
  let userContext = useContext(UserContext);
  let {loading, startLoading, stopLoading, verifyAuth} = userContext;

  let navigate = useNavigate();

  let [description, setDescription] = useState({
    description : ""
  });

  function onChangeHandler(event)
  {
    setDescription({...description, description : event.target.value});
  }

  async function onSubmitHandler(event)
    {
        try {

            event.preventDefault();
            
            startLoading();
            let config = {
                method: 'post',
                url: 'https://api-nodejs-todolist.herokuapp.com/task',
                headers: { 
                  'Content-Type': 'application/json', 
                  'Authorization': `Bearer ${localStorage.getItem("token")}`
                },
                data : description
              };

              await axios(config);
              stopLoading();
            setTimeout(() => {
            navigate("/user");
          }, 2000);
            
        } catch (error) {
            console.log(error.response.data);
        setAlert({type : "danger", msg : "Unable to add task"});
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
        <Alert />
        Add Task

        <br/>

        <form onSubmit={onSubmitHandler}>
          <label htmlFor="age">Description</label>
          <br />
          <br/>
          <input type="text" name="description" onChange={onChangeHandler} />
          <br />
          <input type="submit" value="add" />
        </form>

        <Loading/>
        </center>
        </>
    );
}

export default Task;