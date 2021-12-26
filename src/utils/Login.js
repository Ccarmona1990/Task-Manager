import React, {useState} from 'react'
import { Outlet, Link } from "react-router-dom";
import axios from 'axios'
import {loginAPI_URL} from './initialState'
import {AuthNotification} from './Notifications'

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isNotificationShowing,setIsNotificationShowing] = useState(false);
    const [notificationMessage, setNotificationMessage] = useState('');

    const login = async (e) =>{
        e.preventDefault();
        
        setIsNotificationShowing(true)
        try {
            await axios.post(loginAPI_URL, {username, password});
            const {data: {user}} = await axios.get(`${loginAPI_URL}${username}&${password}`);
            if(user){
                setNotificationMessage(`Welcome ${user.username}`);
                window.location.pathname += 'task-manager'
            } else if (!user){
                setNotificationMessage(`No user found with the information provided. Please check your username or password `)
            }
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className='login formContainer1'>
            <h1>Login</h1>
            <form className='contactForm'>

                <input 
                className='form-control' type='text' placeholder='Username...'
                onChange={(e)=>{
                    setUsername(e.target.value)
                }}
                required
                ></input>

                <input 
                className='form-control'
                type='password' 
                placeholder='Password...'
                required
                minLength={8}
                onChange={(e)=>{
                    setPassword(e.target.value)
                }}></input>

                <button className='contactFormBtn'
                onClick={login}
                > Log in </button>
            </form>

            <AuthNotification
            isNotificationShowing={isNotificationShowing}
            setIsNotificationShowing={setIsNotificationShowing}
            notificationMessage={notificationMessage}/>

        </div>
    )
}

export default Login
