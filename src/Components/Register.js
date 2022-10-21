import { useContext, useState } from "react";
import {
  CImage,
  CButton,
  CContainer,
  CRow,
  CCol,
  CForm,
  CFormInput,
} from "@coreui/react";
import Buffering from "./Assets/Buffering.gif";
import axios from "axios";
import Work from "./Assets/Work.gif";
import { useNavigate } from "react-router-dom";
import AlertContext from "../Contexts/Alerts/AlertContext.js";
import Alert from "./Alerts.js";
import UserContext from "../Contexts/User/UserContext";
import Loading from "./Loading.js";

function Register() {
  // Errors
  let alertContext = useContext(AlertContext);
  let { error, setAlert, removeAlert } = alertContext;
  

  // Loading
  let userContext = useContext(UserContext);
  let {loading, startLoading, stopLoading} = userContext;

  let [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    age: 0,
  });

  let navigate = useNavigate();

  function onChangeHandler(event) {
    setUserData({ ...userData, [event.target.name]: event.target.value });
  }

  async function onSubmitHandler(event) {
    try {
      event.preventDefault();
      startLoading();
      const config = {
        method: "post",
        url: "https://api-nodejs-todolist.herokuapp.com/user/register",
        headers: {
          "Content-Type": "application/json",
        },
        data: userData,
      };

      await axios(config);
      navigate("/");
      stopLoading();
    } catch (errors) {
      setAlert({type : "danger", msg : errors.response.data});
      stopLoading();
      setTimeout(() => {
        removeAlert();
      }, 3500);
    }
  }

  return (
    <div style={{marginTop:"20%"}}>
      <center>
        <Alert/>
        <Loading/>
        <form onSubmit={onSubmitHandler}>
          <label htmlFor="name">Name</label>
          <br />
          <input type="text" name="name" onChange={onChangeHandler} />
          <br />

          <label htmlFor="email">Email</label>
          <br />
          <input type="email" name="email" onChange={onChangeHandler} />
          <br />

          <label htmlFor="password">Password</label>
          <br />
          <input type="password" name="password" onChange={onChangeHandler} />
          <br />

          <label htmlFor="number">Age</label>
          <br />
          <input type="number" name="age" onChange={onChangeHandler} />
          <br />
          <br/>
          <input type="submit" value="Register"/>
        </form>
      </center>
    </div>
  );
}

export default Register;
