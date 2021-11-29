import React from 'react'

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
                        <aside className='nTaskBtns'>
                        <button 
                        className="link-btn"
                        onClick={()=>handleEdit(id, task)}
                        >edit</button>
                        <button className="link-btn"
                        onClick={()=>handleDelete(id)}
                        >delete</button>
                        </aside>
                    </div>
                )
            })}
            </section>
    )
}

export default NewTask
