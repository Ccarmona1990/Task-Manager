import React from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faStickyNote, faClipboard} from '@fortawesome/free-solid-svg-icons'

const NavBar = () => {
    return (
        <nav>
            <FontAwesomeIcon 
            icon={faClipboard} className='fontawesome' size='5x' color='white'>
            </FontAwesomeIcon>
            <h1>Tasks</h1>
        </nav>
    )
}

export default NavBar