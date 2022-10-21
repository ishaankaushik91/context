import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AlertContext from "../Contexts/Alerts/AlertContext.js";
import UserContext from "../Contexts/User/UserContext.js";
import Alert from "./Alerts";
import Loading from "./Loading";

function Update()
{
  // Alerts
  let alertContext = useContext(AlertContext);
  let { setAlert, removeAlert } = alertContext;

  // Loading
  let userContext = useContext(UserContext);
  let {loading, startLoading, stopLoading, verifyAuth} = userContext;

  let navigate = useNavigate();

  let [age, setAge] = useState(
      {
          age : 0
      });

    function onChangeHandler(event)
    {
        setAge({...age, age : event.target.value});
    }

    async function onSubmitHandler(event)
    {
        try {

            event.preventDefault();
            
            startLoading();
            let config = {
                method: 'put',
                url: 'https://api-nodejs-todolist.herokuapp.com/user/me',
                headers: { 
                  'Content-Type': 'application/json', 
                  'Authorization': `Bearer ${localStorage.getItem("token")}`
                },
                data : age
              };

              await axios(config);
              stopLoading();
            setTimeout(() => {
            navigate("/user");
          }, 2000);
            
        } catch (error) {
            console.log(error.response.data);
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
        <Alert />
        Update Proifle

        <br/>

        <form onSubmit={onSubmitHandler}>
          <label htmlFor="age">Age</label>
          <br />
          <br/>
          <input type="number" name="age" onChange={onChangeHandler} />
          <br />
          <input type="submit" value="update" />
        </form>

        <Loading/>
        </center>
        </>
    );
}

export default Update;