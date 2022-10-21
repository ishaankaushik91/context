import {
  SET_LOADING,
  REMOVE_LOADING,
  SET_USER
} from "../types.js";
import { useContext, useReducer } from "react";
import userReducer from "./UserReducer.js";
import axios from "axios";
import UserContext from "./UserContext.js";
import AlertContext from "../Alerts/AlertContext.js";

function UserState(props) {
  let initialState = {
    loading: false,
    user: {},
  };

  let [state, dispatch] = useReducer(userReducer, initialState);

  function startLoading() {
    dispatch({ type: SET_LOADING });
  }

  function stopLoading() {
    dispatch({ type: REMOVE_LOADING });
  }

  async function verifyAuth() {
    try {
      let config = {
        method: "get",
        url: "https://api-nodejs-todolist.herokuapp.com/user/me",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };

      let { data } = await axios(config);

      dispatch({ type: SET_USER, user: data });
    } catch (error) {
      localStorage.removeItem("token");
    }
  }

  // Alerts
  let alertContext = useContext(AlertContext);
  let { setAlert, removeAlert } = alertContext;

  async function LogOut() {
    try {
      startLoading();

      let config = {
        method: 'post',
        url: 'https://api-nodejs-todolist.herokuapp.com/user/logout',
        headers: { 
          'Authorization': `Bearer ${localStorage.getItem("token")}`,
        }
      };
      await axios(config);

      stopLoading();
      localStorage.removeItem("token");
      window.location.reload();

    } catch (error) {
      console.log(error.response.data);
      stopLoading();
      setAlert({ type: "danger", msg: "Unable to logout" });
      stopLoading();
      setTimeout(() => {
        removeAlert();
      }, 3500);
    }
  }

  async function DeleteImage()
  {
    try {

      startLoading();

      let config = {
        method: 'delete',
        url: 'https://api-nodejs-todolist.herokuapp.com/user/me/avatar',
        headers: { 
          'Authorization': `Bearer ${localStorage.getItem("token")}`
        }
      };
      
      await axios(config);

      stopLoading();

    } catch (error) {
      console.log(error.response.data);
      stopLoading();
      setAlert({ type: "danger", msg: "Unable to delete image" });
      stopLoading();
      setTimeout(() => {
        removeAlert();
      }, 3500);
    }
  }

  return (
    <UserContext.Provider
      value={{
        loading: state.loading,
        startLoading,
        stopLoading,
        verifyAuth,
        user: state.user,
        LogOut,
        DeleteImage
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
}

export default UserState;
