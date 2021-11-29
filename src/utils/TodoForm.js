import React from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPlus, faEdit} from '@fortawesome/free-solid-svg-icons'

const TodoForm = ({handleSubmit, setTask, task, ref, state}) => {

    const placeholder = `Add a task`;
    
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
                
            </form>
        </div>
    )
}

export default TodoForm
