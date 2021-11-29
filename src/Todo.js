import React,{useRef, useState, useReducer, useEffect} from 'react'
import Notifications from './utils/Notifications.js';
import reducer from './utils/reducer.js';
import {initialState} from './utils/initialState.js';
import TodoForm from './utils/TodoForm.js';
import NewTask from './utils/NewTask.js';
import NavBar from './utils/NavBar.js';


const Todo = () => {
    const [task, setTask] = useState('');
    const [state, dispatch] = useReducer(reducer,initialState);
    const ref = useRef();
    
    const newDate = new Date();
    const handleSubmit = (e)=>{
        e.preventDefault();
        if(task && !state.isEdit){
            const newTask = {id:newDate.getTime().toString(), task}
            dispatch({type:'ADD_TASK', payload: newTask})
        }
        if (!task){
            dispatch({type:'NO_TASK'})
        }
        if(state.isEdit){
            state.currentTaskToEdit.innerHTML = task;
            dispatch({type:'END_EDIT'})
        }
        setTask('');
    }
    const closeNotification = ()=>dispatch({type: 'CLOSE_NOTIFICATION'});
    //

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
            handleSubmit={handleSubmit}
            task={task}
            state={state}/>
            
            <NewTask
            state={state}
            dispatch={dispatch}
            setTask={setTask}/>
            </main>
        </>
    )
}

export default Todo
