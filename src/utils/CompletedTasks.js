import React from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faTrash, faEdit} from '@fortawesome/free-solid-svg-icons'

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
        const currentTaskToEdit= document.getElementById(id).children[0].children[1];
        setTask(currentTaskToEdit.innerHTML);
        dispatch({type: 'EDIT_TASK', payload2:{...currentTaskToEdit, idz: index }})
        const textForm = document.querySelector('#textForm')
        textForm.focus();
        
    }
    const toggleChecked= (id, index)=>{
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
            dispatch({type: 'UNCOMPLETED_TASK', completedTaskPayload:  completedTasks, uncompletedTaskPayload: currentTaskInfo })
        }
    }

    return (
        <section className='completedTasksContainer'>
            <h2>Completed Tasks</h2>
            {state?.completedTasks?.map((cTask,i)=>{
                const {id, task} = cTask;
                return (
                    <div 
                    key={id} 
                    id={id}
                    className=' task completedTask '
                    >
                        <aside >
                            <input type='checkbox' 
                            name={task}
                            id='checkbox'
                            defaultChecked='true'
                            onClick={()=>toggleChecked(id,i)}
                            />
                        <h4>{task}</h4>
                        </aside>

                        <aside className='nTaskBtnContainer'>
                        <button 
                        className="nTaskBtn"
                        onClick={()=>handleEdit(id,i)}
                        ><FontAwesomeIcon icon={faEdit}
                        color='darkgreen'
                        size='1x'/></button>

                        <button className="nTaskBtn"
                        onClick={()=>handleDelete(id)}
                        ><FontAwesomeIcon icon={faTrash}
                        color='red'
                        size='1x'/></button>
                        </aside>
                    </div>
                )
            })}
            </section>
    )
}

export default CompletedTasks
