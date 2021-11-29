import React from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faTrash, faEdit} from '@fortawesome/free-solid-svg-icons'

const NewTask = ({state, dispatch, setTask}) => {

    const handleDelete = (id)=>{
        const newtasks = state.tasks.filter((t)=>{
            if(t.id !== id){
                return t;
            }
        })
        dispatch({type: 'DELETE_TASK', payload1: newtasks })
    }
    const handleEdit = (id)=>{
        const currentTaskToEdit= document.getElementById(id).children[0].children[1];
        setTask(currentTaskToEdit.innerHTML);
        dispatch({type: 'EDIT_TASK', payload2:currentTaskToEdit})
        const textForm = document.querySelector('#textForm')
        textForm.focus();
    }
    const toggleChecked= (id)=>{
        const currentTaskToEdit= document.getElementById(id).children[0].children[1];
        const currentCheckbox= document.getElementById(id).children[0].children[0];
        if(currentCheckbox.checked){
            currentTaskToEdit.className += ' completedTask ';
        } if(!currentCheckbox.checked){
            currentTaskToEdit.className = '';
        }
    }
    return (
        <section 
                className='tasksContainer'>
            {state.tasks.map((newTask)=>{
                const {id, task} = newTask;
                return (
                    <div 
                    key={id} 
                    id={id}
                    className='task'
                    >
                        <aside >
                            <input type='checkbox' 
                            name={task}
                            id='checkbox'
                            onClick={()=>toggleChecked(id)}
                            />
                        <h4>{task}</h4>
                        </aside>
                        <aside className='nTaskBtnContainer'>
                        <button 
                        className="nTaskBtn"
                        onClick={()=>handleEdit(id, task)}
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

export default NewTask
