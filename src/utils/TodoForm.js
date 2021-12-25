import React from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPlus, faEdit, faCalendarAlt} from '@fortawesome/free-solid-svg-icons';
import {URL} from './initialState';
import Calendar from './Calendar.js';
import Message from './Message.js';
import axios from 'axios';

const TodoForm = ({setTask, task, state, dispatch,timeStamp, setTimeStamp}) => {

    const placeholder = `Add a task`;

    const handleCalendar = ()=>{
        dispatch({type:'TOGGLE_CALENDAR'})
    }
    const handleSubmit = async (e)=>{
        e.preventDefault();
        if(task && !state.isEdit){
            try {
                await axios.post(URL, {task, timeStamp, isTaskCompleted: false})
                const {data: {tasks}} = await axios.get(URL)
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
                    await axios.patch(`${URL}${editedTask?._id}`, {...editedTask, task, timeStamp});

                    const {data: {tasks}} = await axios.get(URL);

                    dispatch({type:'END_EDIT', editedTaskPayload: tasks});
                } catch (error) {
                    dispatch({type: 'ERROR', payload: 'There was an Error  editing your task, please try again'})
                }
            } else if (editedcTask){
                try {
                    await axios.patch(`${URL}${editedcTask?._id}`, {...editedcTask, task, timeStamp});

                    const {data: {completedtasks}} = await axios.get(URL);

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
    const calendarBtnMessage = `add a due date`
    
    return (
        <div className='formContainer'>
        <form 
            onSubmit={handleSubmit}
            className='simpleForm'>
                <button className='taskBtn' >
                    {state.isEdit ? <FontAwesomeIcon icon={faEdit} /> : <FontAwesomeIcon icon={faPlus} />}</button>
                <input 
                id='textForm'
                type="text" 
                value={task} 
                placeholder={placeholder}
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
                msj={calendarBtnMessage}
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
