import React from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPlus, faEdit, faCalendarAlt} from '@fortawesome/free-solid-svg-icons'

const TodoForm = ({handleSubmit, setTask, task, state, dispatch}) => {

    const placeholder = `Add a task`;
    const handleCalendar = ()=>{
        dispatch({type:'TOGGLE_CALENDAR'})
    }
    const handleMessage =()=>{
        const message = document.querySelector('.message')
        message.classList.toggle('hide')
    }
    
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
                <div className='message hide'>add due date</div>
                
            </form>
        </div>
    )
}

export default TodoForm
