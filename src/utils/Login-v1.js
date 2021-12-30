import React from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { Link } from "react-router-dom";
import {faClipboard} from '@fortawesome/free-solid-svg-icons'

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
				</div>

			</div>

			<div className="row justify-content-center">

				<div className="shadow px-4 py-4 col-md-6 col-lg-4 bg-white rounded border border-info">
					<div className="login-wrap p-0">
            <h3 className="mb-4 text-center">Have an account?</h3>
            <form action="#" className="signin-form">
                <div className="form-group">
                    <p className='mb-0'>Username</p>
                    <input type="text" className="form-control"  required/>
                </div>
	            <div className="form-group">
                    <p className='mb-0'>Password</p>
                <input id="password-field" type="password" className="form-control" required/>
                <span toggle="#password-field" className="fa fa-fw fa-eye field-icon toggle-password"></span>
	            </div>
	            <div className="form-group">
	            	<button type="submit" className="form-control btn btn-primary submit px-3">Log In</button>
	            </div>
	            
            </form>

            {/* <GoogleSignIn/> */}
            
            <section className='mt-md-1 mb-md-1 d-flex justify-content-center'>
                <p className='mb-md-0'>Don't have an account? <Link className='link-btn ' to="/signup" >Sign Up</Link> </p></section>
            </div>

				</div>
			</div>
		</div>
	</section>
        </div>
    )
}

export default LoginV1