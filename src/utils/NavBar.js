import React, {useState, useContext, useEffect} from 'react'
import { Link } from "react-router-dom";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faClipboard} from '@fortawesome/free-solid-svg-icons'
import {sessionAPI_URL} from '../utils/initialState'
import axios from 'axios';
import {ColorContext} from '../App'
import taskImg from '../images/tasksImg.jpg'

const NavBar = () => {
    const [loggout, setLoggout] = useState(false);
    const changeColor = useContext(ColorContext);
    useEffect(() => {
        changeColor({backgroundColor: '#282c34'});
    }, [])
    useEffect(() => {
        return () => {
        if(loggout){
                localStorage.clear();
                changeColor({backgroundImage: `url(${taskImg})`, backgroundSize: 'cover'})
                setLoggout(false)
            }
        }
    }, [loggout])
    
    return (
        <nav>
            <div>
                <FontAwesomeIcon 
                icon={faClipboard} 
                className='fontawesome' 
                size='5x' 
                color='white'>
                </FontAwesomeIcon>
                <h1>Task Manager</h1>
            </div>

            <Link 
            className='link-btn ' 
            style={{margin: '0px 0px'}} 
            to="/" 
            onClick={()=>{setLoggout(true)}}>
                    Log out
            </Link>
        </nav>
    )
}

export default NavBar
