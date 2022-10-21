import axios from "axios";
import { useReducer } from "react";
import TodoContext from "../Todos/TodoContext.js";
import todoReducer from "../Todos/TodoReducer.js";
import { ALL_TASKS, SINGLE_TASK } from "../types";

function TodoState(props)
{
    let initialState = {
        allTasks : [],
        singleTask : {}
    };

    let [state, dispatch] = useReducer(todoReducer, initialState);

    async function getAllTasks()
    {
        try {

            let config = {
                method: 'get',
                url: 'https://api-nodejs-todolist.herokuapp.com/task',
                headers: { 
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                  'Content-Type': 'application/json'
                }
              };

              let {data} = await axios(config);

              dispatch({type : ALL_TASKS, data});
            
        } catch (error) {
            console.log(error.response.data);
        }
    }

    async function getSingleTask(id)
    {
        try {
            
            let config = {
                method: 'get',
                url: `https://api-nodejs-todolist.herokuapp.com/task/${id}`,
                headers: { 
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                  'Content-Type': 'application/json'
                }
              };

              let {data} = await axios(config);

              dispatch({type : SINGLE_TASK, data});

        } catch (error) {
            console.log(error.response.data);
        }
    }

    async function updateTask(id)
    {
        try {
            
            let config = {
                method: 'put',
                url: `https://api-nodejs-todolist.herokuapp.com/task/${id}`,
                headers: { 
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                  'Content-Type': 'application/json'
                }
              };

              await axios(config);

              setTimeout(() => {
                window.location.replace("/user");
              }, 2500);

        } catch (error) {
            console.log(error.response.data);
        }
    }

    async function deleteTask(id)
    {
        try {
            
            let config = {
                method: 'delete',
                url: `https://api-nodejs-todolist.herokuapp.com/task/${id}`,
                headers: { 
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                  'Content-Type': 'application/json'
                }
              };

              await axios(config);

              setTimeout(() => {
                window.location.replace("/user");
              }, 2500);

        } catch (error) {
            console.log(error.response.data);
        }
    }

    return (
        <TodoContext.Provider value={{
            getSingleTask,
            getAllTasks,
            allTasks : state.allTasks,
            singleTask : state.singleTask,
            updateTask,
            deleteTask
        }}>
            {props.children}
        </TodoContext.Provider>
    )
}

export default TodoState;