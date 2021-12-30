import React from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faTrash, faEdit} from '@fortawesome/free-solid-svg-icons'
import {serverAPI_URL} from './initialState.js';
import Message from './Message.js'
import axios from 'axios';

const CompletedTasks = ({state, dispatch, setTask}) => {
    const handleDelete = async (id, username)=>{
        try {
            await axios.delete(`${serverAPI_URL}${id}`)
            
            const {data: {completedtasks}} = await axios.get(`${serverAPI_URL}${username}`)
            
            dispatch({type: 'DELETE_COMPLETEDTASK', deleteCompletedTaskPayload: completedtasks })
        } catch (error) {
            dispatch({type: 'ERROR', payload: 'There was an Error, please try again later'})
        }
    }
    const handleEdit = (id, index)=>{
        const currentTaskToEdit= document.getElementById(id).children[0].children[2].children[0];
        setTask(currentTaskToEdit.innerHTML);
        dispatch({type: 'EDIT_TASK', payload2:{...currentTaskToEdit, idz: index }})
        const textForm = document.querySelector('#textForm')
        textForm.focus();
    }
    const toggleChecked= async (id, username)=>{
        const currentTaskToEdit = document.getElementById(id);

        const currentCheckbox= currentTaskToEdit.children[0].children[0];

        if(!currentCheckbox.checked){
            currentTaskToEdit.className = ' task ';
            try {
                const {data: {currentCompletedTask}} = await axios.patch(`${serverAPI_URL}${id}`, {isTaskCompleted: false});

                await axios.delete(`${serverAPI_URL}${id}`);
                
                await axios.post(serverAPI_URL, currentCompletedTask);
                
                const {data: {tasks, completedtasks}} = await axios.get(`${serverAPI_URL}${username}`);

                dispatch({type: 'UNCOMPLETED_TASK', completedTaskPayload:  completedtasks, uncompletedTaskPayload: tasks })
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
                const {_id: id, task,timeStamp, username} = cTask;
                return (
                    <div 
                    key={id} 
                    id={id}
                    className=' task  '
                    >
                        <aside className='ntSection1'>
                            <input type='checkbox' 
                            name={task}
                            className='customCheckbox '
                            defaultChecked='true'
                            onClick={()=>toggleChecked(id, username)}/>
                            <div className='checkboxContainer'>
                            </div>
                            <div>
                                <h5 className='completedTask'>{task}</h5>
                                <p className='mb-0'>{timeStamp}</p>
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
                        onClick={()=>handleDelete(id, username)}
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
