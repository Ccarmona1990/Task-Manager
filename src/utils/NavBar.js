import React from 'react'
import { Link } from "react-router-dom";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faClipboard} from '@fortawesome/free-solid-svg-icons'

const NavBar = () => {
    return (
        <nav>
            <div>
                <FontAwesomeIcon 
                icon={faClipboard} className='fontawesome' size='5x' color='white'>
                </FontAwesomeIcon>
                <h1>Task Manager</h1>
            </div>
            <Link className='link-btn ' to="/">Log out</Link>
        </nav>
    )
}

export default NavBar
