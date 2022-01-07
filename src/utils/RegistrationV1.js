import React, {useState, useEffect} from 'react'
import { Link, Navigate } from "react-router-dom";
import axios from 'axios';
import {registerAPI_URL, usertasksAPI_URL} from './initialState'
import {AuthNotification} from './Notifications'


const RegistrationV1 = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState('');
    const [isNotificationShowing,setIsNotificationShowing] = useState(false);
    const [notificationMessage, setNotificationMessage] = useState('');
    const [isSignUp, setIsSignUp] = useState(false);

    useEffect(() => {
        return () => {
            if(isSignUp){
                setUsername('')
                setEmail('')
                setPassword('')
                setRePassword('')
                setIsNotificationShowing(false)
                setIsSignUp(false)
            }
        }
    }, [isSignUp])
    
    const register = async (e) =>{
        e.preventDefault();

        if(password != rePassword){
            setIsNotificationShowing(true);
            setNotificationMessage('Something went wrong. Please double check your information')
        } else if (password == rePassword){
            try {
                await axios.post(registerAPI_URL, {username, email, password });
                await axios.post(usertasksAPI_URL, {username, email})
                setIsNotificationShowing(true);
                setNotificationMessage('You have successfully created your account.')
                setIsSignUp(true);
            } catch (err) {
                console.log(err);
                setNotificationMessage('There was an error, please try again.')
            }
        }
    }

    return (
        <section className="signup ftco-section">
            <div className="container">

                <div className="row justify-content-center py-4">

				<div className="shadow px-4 py-4 col-md-6 col-lg-4 bg-white rounded border border-info">

                <div className="signup-content">
                    <form 
                    id="signup-form" className="signup-form">
                        <h2 className="form-title">Create account</h2>
                        <div className="form-group">
                            <input 
                            type="text" 
                            className="form-input" 
                            name="name" 
                            id="name" 
                            placeholder="Your Name"
                            required
                            onChange={(e)=>{
                                setUsername(e.target.value.toLowerCase())
                                }}/>
                        </div>
                        <div className="form-group">
                            <input 
                            type="email" 
                            className="form-input" 
                            name="email" 
                            id="email" 
                            placeholder="Your Email"
                            required
                            onChange={(e)=>{
                                setEmail(e.target.value.toLowerCase())
                                }}/>
                        </div>
                        <div className="form-group">
                            <input 
                            type="password" 
                            className="form-input" 
                            name="password" 
                            id="password" 
                            placeholder="Password"
                            minLength={8}
                            required
                            onChange={(e)=>{
                                setPassword(e.target.value.toLowerCase())
                            }}/>
                            <span toggle="#password" className="zmdi zmdi-eye field-icon toggle-password"></span>
                        </div>
                        <div className="form-group">
                            <input 
                            type="password" 
                            className="form-input" name="re_password" 
                            id="re_password" 
                            placeholder="Repeat your password"
                            required
                            onChange={(e)=>{
                                setRePassword(e.target.value.toLowerCase())
                            }}
                            />
                        </div>
                        <div className="form-group">
                            <label className="label-agree-term">
                                <input 
                                type="checkbox" 
                                name="agree-term" 
                                id="agree-term" className="agree-term" 
                                required/>
                                I agree all statements in  <a href="#" className="term-service">Terms of service</a></label>
                        </div>
                        <div className="form-group">
                            <input 
                            type="button" 
                            name="button" 
                            className="form-submit" 
                            value="Sign up"
                            onClick={register}/>
                        </div>
                    </form>
                    <p className="loginhere">
                        Have already an account ? <Link className=' loginhere-link' to="/" >Login here</Link>
                    </p>
                </div>

                </div>
                </div>

                <AuthNotification
            isNotificationShowing={isNotificationShowing}
            setIsNotificationShowing={setIsNotificationShowing}
            notificationMessage={notificationMessage}/>
            </div>
            {isSignUp && <Navigate to='/'/>}
        </section>
    )
}

export default RegistrationV1
