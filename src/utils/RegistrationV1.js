import React, {useState} from 'react'
import { Link } from "react-router-dom";
import axios from 'axios';
import {registerAPI_URL, usertasksAPI_URL} from './initialState'
import {AuthNotification} from './Notifications'


const RegistrationV1 = () => {
    const [username, setUsername] = useState('');
    const [emailAddress, setEmailAddress] = useState('');
    const [password, setPassword] = useState('');
    const [isNotificationShowing,setIsNotificationShowing] = useState(false);
    const [notificationMessage, setNotificationMessage] = useState('');
    
    const register = async (e) =>{
        e.preventDefault();

        setIsNotificationShowing(true);
        try {
            await axios.post(registerAPI_URL, {username, password});
            await axios.post(usertasksAPI_URL, {username})
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
                                setEmailAddress(e.target.value.toLowerCase())
                                }}/>
                        </div>
                        <div className="form-group">
                            <input 
                            type="text" 
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
                            required/>
                        </div>
                        <div className="form-group">
                            <label className="label-agree-term">
                                <input 
                                type="checkbox" 
                                name="agree-term" 
                                id="agree-term" className="agree-term" />

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
        </section>
    )
}

export default RegistrationV1
