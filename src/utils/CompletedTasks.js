import React from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faTrash, faEdit} from '@fortawesome/free-solid-svg-icons'
import Message from './Message.js'
import axios from 'axios';


const CompletedTasks = ({state, dispatch, setTask}) => {
    const handleDelete = (id)=>{
        const newtasks = state.completedTasks.filter((t)=>{
            if(t.id !== id){
                return t;
            }
        })
        dispatch({type: 'DELETE_COMPLETEDTASK', deleteCompletedTaskPayload: newtasks })
    }
    const handleEdit = (id, index)=>{
        const currentTaskToEdit= document.getElementById(id).children[0].children[2].children[0];
        setTask(currentTaskToEdit.innerHTML);
        dispatch({type: 'EDIT_TASK', payload2:{...currentTaskToEdit, idz: index }})
        const textForm = document.querySelector('#textForm')
        textForm.focus();
        
    }
    const toggleChecked= async (id, index)=>{
        const currentTaskInfo = state.completedTasks[index];
        const currentTaskToEdit = document.getElementById(id);
        const currentCheckbox= currentTaskToEdit.children[0].children[0];
        const completedTasks = state.completedTasks.filter((t)=>{
            if(t.id !== id){
                return t;
            }
        })
        if(!currentCheckbox.checked){
            currentTaskToEdit.className = ' task ';
            try {
                await axios.patch(`/api/v1/tasks/${id}`, {isTaskCompleted: false});

                const {data: {tasks}} = await axios.get('/api/v1/tasks')
                dispatch({type: 'UNCOMPLETED_TASK', completedTaskPayload:  completedTasks, uncompletedTaskPayload: tasks })
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
        <section className='completedTasksContainer'>
            <h2>Completed Tasks</h2>
            {state?.completedTasks?.map((cTask,i)=>{
                const {_id: id, task,timeStamp} = cTask;
                return (
                    <div 
                    key={id} 
                    id={id}
                    className=' task  '
                    >
                        <aside className='ntSection1'>
                            <input type='checkbox' 
                            name={task}
                            id='checkbox'
                            defaultChecked='true'
                            onClick={()=>toggleChecked(id,i)}/>
                            <div className='checkboxContainer'>
                            </div>
                            <div>
                                <h4 className='completedTask'>{task}</h4>
                                <h6>{timeStamp}</h6>
                            </div>
                        </aside>

                        <aside className='nTaskBtnContainer'>
                        <button 
                        className='nTaskBtn'
                        onClick={()=>handleEdit(id,i)}
                        onMouseEnter={()=>handleMessage(`edit${id}`)}
                        onMouseLeave={()=>handleMessage(`edit${id}`)}
                        ><FontAwesomeIcon icon={faEdit}
                        color='darkgreen'
                        size='1x'/></button>

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
                        size='1x'/></button>

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

export default CompletedTasks
