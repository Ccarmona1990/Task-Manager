import React,{useState, useReducer, useEffect} from 'react'
import Notifications from '../utils/Notifications.js';
import reducer from '../utils/reducer.js';
import {initialState, sessionAPI_URL, serverAPI_URL} from '../utils/initialState.js';
import TodoForm from '../utils/TodoForm.js';
import NewTask from '../utils/NewTask.js';
import NavBar from '../utils/NavBar.js';
import CompletedTasks from '../utils/CompletedTasks.js';
import '../style.scss';
import axios from 'axios';

const Todo = () => {
    const [task, setTask] = useState('');
    const [timeStamp, setTimeStamp] = useState('');
    const [state, dispatch] = useReducer(reducer,initialState);
    
    useEffect(()=>{
        const fetchData = async ()=>{
            try {
                // current user session 
                const {data} = await axios.get(sessionAPI_URL, {withCredentials:true});
                console.log(data);

                // tasks db connection
                const {data: {tasks, completedtasks}} = await axios.get(serverAPI_URL)
                dispatch({type:'DB_CONNECTION', payload: {tasks,completedtasks}})
            } catch (error) {
                dispatch({type: 'ERROR', payload: 'There was an error, please try again later...'})
            }
        }
        fetchData()
        return ()=>{
        }
    },[])

    return (
        <>
        <header>
            <NavBar/>
        </header>

        <main>
            <Notifications 
            state={state}
            dispatch={dispatch}/>

            <TodoForm 
            setTask={setTask}
            task={task}
            state={state}
            dispatch={dispatch}
            timeStamp={timeStamp}
            setTimeStamp={setTimeStamp}
            />

            <NewTask
            state={state}
            dispatch={dispatch}
            setTask={setTask}
            />

            <CompletedTasks 
            state={state}
            dispatch={dispatch}
            setTask={setTask}/> 
            </main>
        </>
    )
}

export default Todo
