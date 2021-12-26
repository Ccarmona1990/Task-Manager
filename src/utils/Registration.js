import React, {useState}from 'react';
import axios from 'axios';
import {registerAPI_URL} from './initialState'
import {AuthNotification} from './Notifications'

const Registration = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isNotificationShowing,setIsNotificationShowing] = useState(false);
    const [notificationMessage, setNotificationMessage] = useState('');
    
    const register = async (e) =>{
        e.preventDefault();

        setIsNotificationShowing(true);
        try {
            await axios.post(registerAPI_URL, {username, password});
            setNotificationMessage('You have successfully created your account.')
        } catch (err) {
            console.log(err);
            setNotificationMessage('There was an error, please try again.')
        }
        const inputs = document.querySelectorAll('.form-control');
        const uName = Array.from(inputs)[0];
        const pWord = Array.from(inputs)[1];
        uName.value = '';
        pWord.value = '';
    }

    return (
        <div className='registration formContainer1'>
            <h1>Registration</h1>
            <form className='contactForm'>
                <label>Username</label>
                <input 
                required
                className='form-control'
                type='text'
                onChange={(e)=>{
                    setUsername(e.target.value)
                }}></input>
                <label>Password</label>
                <input 
                required
                minLength={8}
                className='form-control'
                type='password'
                onChange={(e)=>{
                    setPassword(e.target.value)
                }}></input>
                <button className='contactFormBtn'
                onClick={register}> Register </button>
            </form>

            <AuthNotification
            isNotificationShowing={isNotificationShowing}
            setIsNotificationShowing={setIsNotificationShowing}
            notificationMessage={notificationMessage}/>

        </div>
    )
}

export default Registration
