import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import AllTasks from "./Components/AllTasks";
import DeleteTask from "./Components/DeleteTask";
import Home from "./Components/Home.js";
import Login from "./Components/Login.js";
import Register from "./Components/Register.js";
import Task from "./Components/Task";
import TaskID from "./Components/TaskID";
import Update from "./Components/Update";
import UpdateTask from "./Components/UpdateTask";
import Upload from "./Components/Upload.js";
import User from "./Components/User.js";
import PrivateRoute from "./Components/Utils/PrivateRoute.js";
import AlertState from "./Contexts/Alerts/AlertState.js";
import TodoState from "./Contexts/Todos/TodoState";
import UserState from "./Contexts/User/UserState.js";

function App() {
  return (
    <>
      <AlertState>
        <UserState>
          <TodoState>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route element={<PrivateRoute />}>
                  <Route path="/user" element={<User />} />
                  <Route path="/user/upload" element={<Upload />} />
                  <Route path="/user/update" element={<Update />} />
                  <Route path="/user/addTask" element={<Task/>}/>
                  <Route path="/user/allTasks" element={<AllTasks/>}/>
                  <Route path="/user/task_id" element={<TaskID/>}/>
                  <Route path="/user/updateTask" element={<UpdateTask/>}/>
                  <Route path="/user/deleteTask" element={<DeleteTask/>}/>
                </Route>
              </Routes>
            </BrowserRouter>
          </TodoState>
        </UserState>
      </AlertState>
    </>
  );
}

export default App;
