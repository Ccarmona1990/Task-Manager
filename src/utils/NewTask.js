import React from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faTrash, faEdit} from '@fortawesome/free-solid-svg-icons'
import Message from './Message'
import axios from 'axios';

const NewTask = ({state, dispatch, setTask}) => {
    
    const handleDelete = async (id)=>{
        try {
            await axios.delete(`/api/v1/tasks/${id}`)
            const {data: {tasks}} = await axios.get('/api/v1/tasks')
            dispatch({type: 'DELETE_TASK', deleteUncompletedTaskPayload: tasks })
        } catch (error) {
            dispatch({type: 'ERROR', payload: 'There was an Error, please try again later'})
        }
    }
    const handleEdit = async (id, index, task)=>{
        const currentTaskToEdit= document.getElementById(id).children[0].children[2].children[0];
        setTask(currentTaskToEdit.innerHTML);

        dispatch({type: 'EDIT_TASK', payload2:{...currentTaskToEdit, idx: index, task}})
        const textForm = document.querySelector('#textForm')
        textForm.focus();
    }
    const toggleChecked= async (id, index)=>{
        const currentTaskInfo = state.tasks[index];
        const currentTaskToEdit = document.getElementById(id);
        const currentCheckbox= currentTaskToEdit.children[0].children[0];
        const uncompletedTasks = state.tasks.filter((t)=>{
            if(t.id !== id){
                return t;
            }
        })
        if(currentCheckbox.checked){
            currentTaskToEdit.className += ' completedTask ';

            try {
                await axios.patch(`/api/v1/tasks/${id}`, {isTaskCompleted: true});

                const {data: {tasks}} = await axios.get('/api/v1/tasks')

                dispatch({type:'COMPLETED_TASK', completedTaskPayload: currentTaskInfo, uncompletedTaskPayload: tasks })
            } catch (error) {
                dispatch({type: 'ERROR', payload: 'There was an Error, please try again later'})
            }
        } 
    }
    const handleMessage =(classname)=>{
        const message = document.querySelector(`.${classname}`)
        message.classList.toggle('hide')
    }

    return (
        <section className='tasksContainer'>
            {state?.tasks?.map((newTask,i)=>{
                const {_id: id, task, timeStamp} = newTask;
                return (
                    <div 
                    key={id} 
                    id={id}
                    className='task'
                    >
                        <aside className='ntSection1'>
                            <input type='checkbox'
                            name={task}
                            id='checkbox'
                            onClick={()=>toggleChecked(id,i)}/>
                            <div className='checkboxContainer'>
                            </div>
                            <div>
                                <h4>{task}</h4>
                                <h6>{timeStamp}</h6>
                            </div>
                        </aside>
                        <aside className='nTaskBtnContainer'>
                        <button 
                        className='nTaskBtn'
                        onClick={()=>handleEdit(id, i, task)}
                        onMouseEnter={()=>handleMessage(`edit${id}`)}
                        onMouseLeave={()=>handleMessage(`edit${id}`)}
                        ><FontAwesomeIcon icon={faEdit}
                        color='darkgreen'
                        size='1x'
                        /></button>
                        
                        <Message
                        link={`edit${id}`}
                        msj={'edit Task'}/>

                        <button 
                        className='nTaskBtn'
                        onClick={()=>handleDelete(id)}
                        onMouseEnter={()=>handleMessage(`delete${id}`)}
                        onMouseLeave={()=>handleMessage(`delete${id}`)}
                        ><FontAwesomeIcon icon={faTrash}
                        color='red'
                        size='1x'
                        /></button>

                        <Message
                        link={`delete${id}`}
                        msj={'delete Task'}/>
                        </aside>
                    </div>
                )
            })}
            </section>
    )
}

export default NewTask
