import React, {useEffect, useState} from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPlus, faEdit, faCalendarAlt} from '@fortawesome/free-solid-svg-icons';
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
                await axios.post('/api/v1/tasks', {task, timeStamp})
                const {data: {tasks}} = await axios.get('/api/v1/tasks')
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

            let newtasks = [];

            if(editedTask) {
                try {
                    await axios.patch(`/api/v1/tasks/${editedTask?._id}`, {task, timeStamp });

                    const {data: {tasks}} = await axios.get('/api/v1/tasks');

                    dispatch({type:'END_EDIT', editedTaskPayload: tasks});
                } catch (error) {
                    dispatch({type: 'ERROR', payload: 'There was an Error  editing your task, please try again'})
                }
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
