import React from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPlus, faEdit, faCalendarAlt} from '@fortawesome/free-solid-svg-icons';
import Calendar from './Calendar.js';
import Message from './Message.js';


const TodoForm = ({handleSubmit, setTask, task, state, dispatch, setTimeStamp}) => {

    const placeholder = `Add a task`;
    const handleCalendar = ()=>{
        dispatch({type:'TOGGLE_CALENDAR'})
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
