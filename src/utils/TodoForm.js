import React from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPlus, faEdit, faCalendarAlt} from '@fortawesome/free-solid-svg-icons';
import {serverAPI_URL, sessionAPI_URL} from './initialState';
import Calendar from './Calendar.js';
import Message from './Message.js';
import axios from 'axios';

const TodoForm = ({setTask, task, state, dispatch,timeStamp, setTimeStamp}) => {

    const handleCalendar = ()=>{
        dispatch({type:'TOGGLE_CALENDAR'})
    }
    const handleSubmit = async (e)=>{
        e.preventDefault();
        if(task && !state.isEdit){
            try {
                const username = localStorage.getItem('username');

                await axios.post(serverAPI_URL, {task, timeStamp, isTaskCompleted: false, username})

                const {data: {tasks}} = await axios.get(`${serverAPI_URL}${username}`)

                dispatch({type:'ADD_TASK', payload: tasks})
            } catch (error) {
                dispatch({type: 'ERROR', payload: 'There was an Error, please try again'})
            }
        }
        if (!task){
            dispatch({type:'NO_TASK'})
        }
        if(state.isEdit){
            state.currentTaskToEdit.innerHTML = task;

            const editedTask = state.tasks[state.currentTaskToEdit.idx];
            
            const editedcTask = state.completedTasks[state.currentTaskToEdit.idz];

            if(editedTask) {
                try {
                    const {data:{currentTask:{username}}} = await axios.patch(`${serverAPI_URL}${editedTask?._id}`, {...editedTask, task, timeStamp});

                    const {data: {tasks}} = await axios.get(`${serverAPI_URL}${username}`);

                    dispatch({type:'END_EDIT', editedTaskPayload: tasks});
                } catch (error) {
                    dispatch({type: 'ERROR', payload: 'There was an Error  editing your task, please try again'})
                }
            } else if (editedcTask){
                try {
                    const {data:{currentTask:{username}}} = await axios.patch(`${serverAPI_URL}${editedcTask?._id}`, {...editedcTask, task, timeStamp});

                    const {data: {completedtasks}} = await axios.get(`${serverAPI_URL}${username}`);

                    dispatch({type:'END_EDIT', editedTaskPayload: completedtasks});
                } catch (error) {
                    dispatch({type: 'ERROR', payload: 'There was an Error  editing your task, please try again'})
                }
            }
        }
        setTask('');
        setTimeStamp('');
    }

    const handleMessage =()=>{
        const message = document.querySelector('.message')
        message.classList.toggle('hide')
    }
    
    return (
        <div className='formContainer0'>
        <form 
            onSubmit={handleSubmit}
            className='simpleForm'>
                <button className='taskBtn' >
                    {state.isEdit ? <FontAwesomeIcon icon={faEdit} /> : <FontAwesomeIcon icon={faPlus} />}
                </button>

                <input 
                id='textForm'
                type="text" 
                value={task}
                required
                placeholder={'Add a task'}
                onChange={(e)=>{setTask(e.target.value)}}>
                </input>

                <button 
                type='button'
                className='calendarBtn '
                onClick={handleCalendar}
                onMouseEnter={handleMessage}
                onMouseLeave={handleMessage}>
                    <FontAwesomeIcon icon={faCalendarAlt} size='2x'></FontAwesomeIcon>
                </button>

                <Message
                msj={'add a due date'}
                />
                
                {state.isCalendarShowing && 
                <Calendar 
                setTimeStamp={setTimeStamp}
                dispatch={dispatch}/>}
            </form>
        </div>
    )
}

export default TodoForm
