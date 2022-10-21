import {
  CButton,
  CContainer,
  CRow,
  CCol,
  CNavLink,
  CNav,
  CNavItem,
  CImage,
} from "@coreui/react";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Logo from "./Assets/Logo.webp";
import axios from "axios";
import Buffering from "./Assets/Buffering.gif";
import Default from "./Assets/Default.png";
import UserContext from "../Contexts/User/UserContext";
import AlertContext from "../Contexts/Alerts/AlertContext";
import Alert from "./Alerts";
import Loading from "./Loading";
import TodoContext from "../Contexts/Todos/TodoContext";
import { Link } from "react-router-dom";

function User() {
  // User profile data
  let userContext = useContext(UserContext);
  let { verifyAuth, user, startLoading, stopLoading, loading, LogOut, DeleteImage } = userContext;

  // Alerts
  let alertContext = useContext(AlertContext);
  let { setAlert, removeAlert } = alertContext;

  // Todos
  let todoContext = useContext(TodoContext);
  let {getAllTasks, getSingleTask, allTasks, singleTask } = todoContext;

  // For image
  let [image, setImage] = useState(null);

  let navigate = useNavigate();

  async function DeleteUser(event) {
    try {

      event.preventDefault();

      startLoading();

      let config = {
        method: "delete",
        url: "https://api-nodejs-todolist.herokuapp.com/user/me",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };

      await axios(config);

      stopLoading();
      //removeUser();
      localStorage.removeItem("token");
      navigate("/");
    } catch (error) {
      console.log(error.response.data);
      stopLoading();
      setAlert({ type: "danger", msg: "Unable to delete" });
      stopLoading();
      setTimeout(() => {
        removeAlert();
      }, 3500);
    }
  }

  useEffect(() => {

    async function getImage(id)
  {
    try {

      startLoading();

      let config = {
        method: 'get',
        url: `https://api-nodejs-todolist.herokuapp.com/user/${id}/avatar`,
        headers: { }
      };

      let {data} = await axios(config);
      setImage(data);
      stopLoading();
      
    } catch (error) {
      stopLoading();
      setAlert({ type: "danger", msg: "Unable to get image" });
      stopLoading();
      setTimeout(() => {
        removeAlert();
      }, 3500);
    }
  }
    verifyAuth();
  }, []);

  return (
    <>
      <center>
        <h1>User profile {user.name}</h1>
        
        {
          !image? <img src={Default} width={100} alt="Profile Pic"></img> : <img src={image} width={100} alt="Profile Pic"></img>
        }

        <h4>{user.name}</h4>
        <p>{user.email}</p>
        <p>Age: {user.age}</p>

        <Alert />
      

        <button onClick={LogOut}>Logout</button>

        <button onClick={DeleteUser} style={{ marginLeft: "5px" }}>
          Delete user
        </button>

        <Link to="/user/update">
        <button style={{ marginLeft: "5px" }}>Update User</button>
        </Link>
        
        <Link to="/user/upload">
        <button style={{ marginLeft: "5px" }}>Upload Image</button>
        </Link>

        <button onClick={DeleteImage} style={{ marginLeft: "5px" }}>Delete Image</button>

        <Link to="/user/addTask">
        <button style={{ marginLeft: "5px" }}>Add Task</button>
        </Link>

        <Link to="/user/allTasks">
        <button style={{ marginLeft: "5px" }}>Get All Tasks</button>
        </Link>

        <Link to="/user/task_id">
        <button style={{ marginLeft: "5px" }}>Get Task by ID</button>
        </Link>

        <Link to="/user/updateTask">
        <button style={{ marginLeft: "5px" }}>Update Task by ID</button>
        </Link>

        <Link to="/user/deleteTask">
        <button style={{ marginLeft: "5px" }}>Delete Task by ID</button>
        </Link>

        {loading && <Loading />}

      </center>
    </>
  );
}

export default User;
