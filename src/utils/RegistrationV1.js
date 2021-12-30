import React from 'react'
import { Link } from "react-router-dom";


const RegistrationV1 = () => {
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
                            <input type="text" className="form-input" name="name" id="name" placeholder="Your Name"/>
                        </div>
                        <div className="form-group">
                            <input type="email" className="form-input" name="email" id="email" placeholder="Your Email"/>
                        </div>
                        <div className="form-group">
                            <input type="text" className="form-input" name="password" id="password" placeholder="Password"/>
                            <span toggle="#password" className="zmdi zmdi-eye field-icon toggle-password"></span>
                        </div>
                        <div className="form-group">
                            <input type="password" className="form-input" name="re_password" id="re_password" placeholder="Repeat your password"/>
                        </div>
                        <div className="form-group">
                            <label className="label-agree-term">
                                <input type="checkbox" name="agree-term" id="agree-term" className="agree-term" />

                                I agree all statements in  <a href="#" className="term-service">Terms of service</a></label>
                        </div>
                        <div className="form-group">
                            <input type="submit" name="submit" id="submit" className="form-submit" value="Sign up"/>
                        </div>
                    </form>
                    <p className="loginhere">
                        Have already an account ? <Link className=' loginhere-link' to="/" >Login here</Link>
                    </p>
                </div>

                </div>
                </div>
            </div>
        </section>
    )
}

export default RegistrationV1
