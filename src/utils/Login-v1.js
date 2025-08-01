import React, {useState, useEffect,useContext}from 'react'
import { Link, Navigate } from "react-router-dom";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faClipboard, faHome} from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import {loginAuthAPI_URL, usertasksAPI_URL} from './initialState'
import {AuthNotification} from './Notifications'
import {ColorContext} from '../App'
import taskImg from '../images/tasksImg.jpg'

const GoogleSignIn = ()=>{
    
    return (
        <>
        <p className="w-100 text-center">&mdash; Or Log In With &mdash;</p>
            
            <div className="social d-flex text-center  justify-content-between">

            <a href="#" className="px-2 py-2 mr-md-1 rounded "><span className="font-weight-bold ion-logo-google mr-2 "></span>Log in with Google</a>

            </div>

            <div className="form-group mt-md-1 mb-md-1 d-md-flex justify-content-end">
                    <div className=" text-md-right ">
                        <a href="#" style={{color: "#000", textAlign:'right' }}>Forgot Password</a>
                    </div>
	            </div>
        </>
    )
}

const LoginV1 = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isNotificationShowing,setIsNotificationShowing] = useState(false);
    const [notificationMessage, setNotificationMessage] = useState('');
    const [isLogin, setIsLogin] = useState(false);
    const changeColor = useContext(ColorContext);

    useEffect(() => {
        changeColor({backgroundImage: `url(${taskImg})`, backgroundSize: 'cover'})
    }, [])

    useEffect(() => {
        return () => {
            if(isLogin){
                changeColor({backgroundColor: '#282c34'})
                setUsername('')
                setPassword('')
                setIsNotificationShowing(false)
                setIsLogin(false)
            }
        }
    },[isLogin])

    const login = async (e) =>{
        e.preventDefault();
        
        setIsNotificationShowing(true)
        try {
            const {data: {success}} = await axios.post(loginAuthAPI_URL, {username, password}//, {withCredentials:true}
            );
            const {data: {currentUser}} = await axios.get(`${usertasksAPI_URL}${username}`)
            
            localStorage.setItem('username', currentUser?.username);
            localStorage.setItem('email', currentUser?.email)

            
            if(success){
                setNotificationMessage(`Welcome ${username}`);
                
                setTimeout(() => {
                    setIsLogin(true)
                }, 2000);

            } else if (!success){
                setNotificationMessage(`No user found with the information provided. Please check your username or password `)
            }
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div  >
            <section className="ftco-section">
		<div className="container">

			<div className="row justify-content-center">

				<div 
                className="d-flex justify-content-center col-md-6 text-center mb-5"
                style={{placeItems: 'center'}}>
                <FontAwesomeIcon 
                icon={faClipboard} className='fontawesome' size='5x' color='lightblue'>
                </FontAwesomeIcon>
					<h2 className="heading-section" >Task Manager</h2>

                    <a href="https://mylearningprojects.netlify.app/" >
                        <FontAwesomeIcon className='mx-3' icon={faHome} size='2x'> 
                        </FontAwesomeIcon>
                        </a> 
				</div>

                

			</div>

			<div className="row justify-content-center">

				<div className="shadow px-4 py-4 col-md-6 col-lg-4 bg-white rounded border border-info">
					<div className="login-wrap p-0">
            <h3 className="mb-4 text-center">Have an account?</h3>
            <form action="#" className="signin-form">
                <div className="form-group">
                    <p className='mb-0'>Username</p>

                    <input 
                    type="text" 
                    className="form-control"  
                    onChange={(e)=>{
                    setUsername(e.target.value.toLowerCase())
                    }}
                    required/>
                </div>
	            <div className="form-group">
                    <p className='mb-0'>Password</p>
                <input 
                id="password-field" 
                type="password" 
                className="form-control" 
                required
                minLength={8}
                onChange={(e)=>{
                    setPassword(e.target.value.toLowerCase())
                }}/>
                <span toggle="#password-field" className="fa fa-fw fa-eye field-icon toggle-password"></span>
	            </div>
	            <div className="form-group">
	            	<button 
                    type="button" 
                    className="form-control btn btn-primary submit px-3"
                    onClick={login }>Log In</button>
	            </div>
	            
            </form>

            {/* <GoogleSignIn/> */}
            
            <section className='mt-md-1 mb-md-1 d-flex justify-content-center'>
                <p className='mb-md-0'>Don't have an account? <Link className='link-btn ' to="/signup" >Sign Up</Link> </p></section>
            </div>

				</div>
			</div>
            <AuthNotification
            isNotificationShowing={isNotificationShowing}
            setIsNotificationShowing={setIsNotificationShowing}
            notificationMessage={notificationMessage}/>
		</div>
	</section>
    {isLogin && <Navigate to='/task-manager'></Navigate>}
        </div>
    )
}

export default LoginV1