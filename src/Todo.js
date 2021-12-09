import React,{useState, useReducer} from 'react'
import Notifications from './utils/Notifications.js';
import reducer from './utils/reducer.js';
import {initialState} from './utils/initialState.js';
import TodoForm from './utils/TodoForm.js';
import NewTask from './utils/NewTask.js';
import NavBar from './utils/NavBar.js';
import CompletedTasks from './utils/CompletedTasks.js';
import Calendar from './utils/Calendar.js';

const Todo = () => {
    const [task, setTask] = useState('');
    const [timeStamp, setTimeStamp] = useState('');
    const [state, dispatch] = useReducer(reducer,initialState);
    
    const newDate = new Date();
    
    const handleSubmit = (e)=>{
        e.preventDefault();
        if(task && !state.isEdit){
            const newTask = {
                id: newDate.getTime().toString(), task,
                timeStamp
            }
            dispatch({type:'ADD_TASK', payload: newTask})
        }
        if (!task){
            dispatch({type:'NO_TASK'})
        }
        if(state.isEdit){
            state.currentTaskToEdit.innerHTML = task;

            const editedTask = state.tasks[state.currentTaskToEdit.idx];
            
            const editedcTask = state.completedTasks[state.currentTaskToEdit.idz];

            let newtasks = [];

            if(editedTask) {
                newtasks = state.tasks.filter((t)=>{
                    if(t.id !== editedTask.id){return t}})
                editedTask.task = task;
                newtasks.push(editedTask)
                dispatch({type:'END_EDIT', editedTaskPayload: newtasks})
            } else if (editedcTask){
                newtasks = state.completedTasks.filter((t)=>{
                    if(t.id !== editedcTask.id){return t}})
                editedcTask.task = task;
                newtasks.push(editedcTask)
                dispatch({type:'END_EDIT', editedTaskPayload: newtasks})
            }
        }
        setTask('');
        setTimeStamp('');
    }
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
            handleSubmit={handleSubmit}
            task={task}
            state={state}
            dispatch={dispatch}/>

            {state.isCalendarShowing && 
            <Calendar 
            setTimeStamp={setTimeStamp}
            dispatch={dispatch}/>}

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
