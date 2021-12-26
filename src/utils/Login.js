import React, {useState, useContext} from 'react'
import {Navigate} from 'react-router-dom'
import axios from 'axios'
import {loginAPI_URL} from './initialState'
import {AuthNotification} from './Notifications'
import {ColorContext} from '../App'

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isNotificationShowing,setIsNotificationShowing] = useState(false);
    const [notificationMessage, setNotificationMessage] = useState('');
    const [isLogin, setIsLogin] = useState(false);
    const changeColor = useContext(ColorContext);

    React.useEffect(() => {
        
        return () => {
            setIsLogin(false)
        }
    }, [])

    const login = async (e) =>{
        e.preventDefault();
        
        setIsNotificationShowing(true)
        try {
            await axios.post(loginAPI_URL, {username, password});
            const {data: {user}} = await axios.get(`${loginAPI_URL}${username}&${password}`);
            if(user){
                setNotificationMessage(`Welcome ${user.username}`);
                
                changeColor("#282c34")
                setIsLogin(true)

            } else if (!user){
                setNotificationMessage(`No user found with the information provided. Please check your username or password `)
            }
        } catch (err) {
            console.log(err);
        }
    }

    return (
            <>
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

        {isLogin && <Navigate to='/task-manager'></Navigate>}
        </>
    )
}

export default Login
