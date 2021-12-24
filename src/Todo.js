import React,{useState, useReducer, useEffect} from 'react'
import Notifications from './utils/Notifications.js';
import reducer from './utils/reducer.js';
import {initialState} from './utils/initialState.js';
import TodoForm from './utils/TodoForm.js';
import NewTask from './utils/NewTask.js';
import NavBar from './utils/NavBar.js';
import CompletedTasks from './utils/CompletedTasks.js';
import axios from 'axios';

const Todo = () => {
    const [task, setTask] = useState('');
    const [timeStamp, setTimeStamp] = useState('');
    const [state, dispatch] = useReducer(reducer,initialState);

    useEffect(()=>{
        const fetchData = async ()=>{
            try {
                const {data: {tasks}} = await axios.get('/api/v1/tasks')
                dispatch({type:'DB_CONNECTION', payload: tasks})
            } catch (error) {
                dispatch({type: 'ERROR', payload: 'There was an error, please try again later...'})
            }
        }
        fetchData()
    },[])

    const closeNotification = ()=>dispatch({type: 'CLOSE_NOTIFICATION'});

    return (
        <>
        <header>
            <NavBar/>
        </header>

        <main>
            <Notifications 
            state={state}
            notification={state.notificationMessage}
            closeNotification={closeNotification}
            />

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

/**
{state.isCalendarShowing && 
            <Calendar 
            setTimeStamp={setTimeStamp}
            dispatch={dispatch}/>}
 */