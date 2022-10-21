import { useContext, useEffect, useState } from "react";
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
import { useNavigate } from "react-router-dom";
import Lock from "./Assets/Lock.gif";
import AlertContext from "../Contexts/Alerts/AlertContext";
import Alert from "./Alerts";
import UserContext from "../Contexts/User/UserContext";
import Loading from "./Loading";

function Login() {

  let [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  let alertContext = useContext(AlertContext);
  let { error, setAlert, removeAlert } = alertContext;

  let userContext = useContext(UserContext);
  let {loading, startLoading, stopLoading} = userContext;

  let navigate = useNavigate();

  function onChangeHandler(event) {
    setUserData({ ...userData, [event.target.name]: event.target.value })
  }

  async function onClickHandler(event) {
    try {
      event.preventDefault();
      startLoading();

      var config = {
        method: "post",
        url: "https://api-nodejs-todolist.herokuapp.com/user/login",
        headers: {
          "Content-Type": "application/json",
        },
        data: userData,
      };

      let { data } = await axios(config);

      localStorage.setItem("token", data.token);
      navigate("/user");
      stopLoading();
    } catch (errors) {
      setAlert({type : "danger", msg : errors.response.data});
      stopLoading();
      setTimeout(() => {
        removeAlert();
      }, 3500);
    }
  }

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/user");
    }
  }, []);

  return (
    <div style={{marginTop:"20%"}}>
      <center>
      <Alert/>
    <Loading/>
      <center>
        <form>
          <label htmlFor="email">Email</label>
          <br />
          <input type="email" name="email" onChange={onChangeHandler}/>
          <br />

          <label htmlFor="password">Password</label>
          <br />
          <input type="password" name="password" onChange={onChangeHandler}/>
          <br />
          <br />
          <input onClick={onClickHandler} type="submit" />
        </form>
      </center>
      </center>
    </div>
  );
}

export default Login;
