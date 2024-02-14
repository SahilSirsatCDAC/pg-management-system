import React from 'react'
import { useParams } from 'react-router-dom'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios';
import emailjs from '@emailjs/browser';
import { useRef } from 'react';
const ResetPassword = () => {
    const [email, setEmail] = useState();

    //ACCESSORIES:
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState(false);
    const navigate = useNavigate()
    const form = useRef();

    //HANDLERS:
    const successMessage = () => {
        return (
            <div className="success text-success" style={{ display: submitted ? '' : 'none', }}>
                {submitted}
            </div>
        );
    };

    // Showing error message if error is true
    const errorMessage = () => {
        return (
            <div className="error" style={{ display: error ? '' : 'none' }}>
                {error}
            </div>
        );
    };

    const handleSubmit = async (e) => {
        setError("");
        setSubmitted(`An email has been sent to ${email} containing link for resetting password!`);
        e.preventDefault();
        // service_id:  service_cdac_09
        // templelate_id : reset_password
        emailjs.send('service_cdac_09', 'reset_password', {email: email, message: 'Your code is: 12345'}, 'h7bGqkgk6afflTWp6')
            .then((result) => {
                console.log(result.text);
            }, (error) => {
                console.log(error.text);
            });

    }


    return (
        <div className="container-fluid" style={{ 'height': '98vh' }}>
            <div className='row justify-content-center'>
                <div className='col-5 display-4 text-center '>
                    Reset Password
                </div>
            </div>


            <div className='row justify-content-center mt-3'>
                <form ref={form} className='col-5 '>
                    {/* Labels and inputs for form data */}
                    <label className="label">Enter email</label>
                    <input onChange={(e) => setEmail(e.target.value)} className="input form-control mb-2"
                        type="text" required />
                    {/* Calling to the methods */}
                    <div className="messages text-danger ">
                        {errorMessage()}
                        {successMessage()}
                    </div>
                    <br />
                    <div className='row justify-content-center '>
                        <button className="btn btn-lg  text-light" style={{ backgroundColor: 'blue' }} onClick={handleSubmit} type="submit">
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}


export default ResetPassword
