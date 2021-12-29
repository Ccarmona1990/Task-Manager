import React, {useContext} from 'react'
import { Link } from "react-router-dom";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faClipboard} from '@fortawesome/free-solid-svg-icons'
import {sessionAPI_URL} from '../utils/initialState'
import axios from 'axios';
import {ColorContext} from '../App'

const NavBar = () => {
    const changeColor = useContext(ColorContext)
    
    return (
        <nav>
            <div>
                <FontAwesomeIcon 
                icon={faClipboard} className='fontawesome' size='5x' color='white'>
                </FontAwesomeIcon>
                <h1>Task Manager</h1>
            </div>
            <Link className='link-btn ' to="/" onClick={async ()=>{
                await axios.post(sessionAPI_URL, {loggedIn:false}//,{withCredentials:false}
                    ); 
                console.log('loggout');
                
                localStorage.removeItem('username')
                changeColor("rgba(12, 12, 53, 0.911)")}}>Log out</Link>
        </nav>
    )
}

export default NavBar
