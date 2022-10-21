import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AlertContext from "../Contexts/Alerts/AlertContext.js";
import UserContext from "../Contexts/User/UserContext.js";
import Alert from "./Alerts";
import Loading from "./Loading";

function Upload() {
  // Alerts
  let alertContext = useContext(AlertContext);
  let { setAlert, removeAlert } = alertContext;

  // Loading
  let userContext = useContext(UserContext);
  let {loading, startLoading, stopLoading, verifyAuth} = userContext;

  // Image
  let [avatar, setAvatar] = useState({
    avatar: null,
  });

  let navigate = useNavigate();

  function onChangeHandler(event) {
    setAvatar({ avatar : event.target.files[0] });
  }

  async function onSubmitHandler(event) 
  {
    try 
    {
        event.preventDefault();
        startLoading();

        let config = {
            method: 'post',
            url: 'https://api-nodejs-todolist.herokuapp.com/user/me/avatar',
            headers: { 
              'Authorization': `Bearer ${localStorage.getItem("token")}`,
              'Content-Type': 'multipart/form-data'
            },
            data : avatar
          };
          
          await axios(config);

          setTimeout(() => {
            navigate("/user");
          }, 2000);

    } catch (error)
    {
        console.log(error.response.data);
        setAlert({type : "danger", msg : "Unable to upload"});
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
        Upload Proifle Picture

        <form onSubmit={onSubmitHandler}>
          <label htmlFor="profile">Picture</label>
          <br />
          <input type="file" name="avatar" onChange={onChangeHandler} />
          <br />

          <input type="submit" value="upload" />
        </form>

        <Loading/>
      </center>
    </>
  );
}

export default Upload;
