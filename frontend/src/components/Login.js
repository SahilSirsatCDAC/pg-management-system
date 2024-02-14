import React from 'react';
import { useState } from 'react';
import { Link, useNavigate, useParams } from "react-router-dom";
import { useRef, useEffect } from 'react';
import useAuth from '../hooks/useAuth';
import { useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitterSquare, faFacebook, faGoogle} from "@fortawesome/free-brands-svg-icons";
import { faUserLock, faLock, faLockOpen } from '@fortawesome/free-solid-svg-icons';

import axios from '../api/axios';
import jwtDecode from 'jwt-decode';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';


export default function Login() {
  const { setAuth } = useAuth();


  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  console.log(location?.state?.from?.state?.room);
  const nextState = location?.state?.from?.state?.room;
  const userRef = useRef();
  const errRef = useRef();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = { email, password };
  const navigate = useNavigate();
  // States for checking the errors
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);
  const rent = localStorage.getItem('rent');
  console.log(rent);
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
  const handleEmail = (e) => {
    setEmail(e.target.value)
    setSubmitted(false);
  }
  const handlePassword = (e) => {
    setPassword(e.target.value)
    setSubmitted(false);
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/auth/signin",
        JSON.stringify({ email, password }),
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true
        }
      );
      console.log(JSON.stringify(response?.data));
      //console.log(JSON.stringify(response));
      const accessToken = response?.data?.accessToken;

      // const roleName = response?.data?.userRoles.map(obj => roles.push(obj.roleName));
      console.log(jwtDecode(accessToken).roles);
      const roles = jwtDecode(accessToken).roles;
      const userId = jwtDecode(accessToken).userId;

      localStorage.setItem('email', email);
      localStorage.setItem('password', password);
      localStorage.setItem('roles', roles);
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('userId', userId);
      setAuth({ email, password, roles, accessToken });
      // setEmail('');
      // setPassword('');
      navigate(from, { replace: true }, { state: { nextState } });
      //navigate("/home");
    } catch (err) {
      if (!err?.response) {
        setError('No Server Response');
      } else if (err.response?.status === 400) {
        setError('Missing Username or Password');
      } else if (err.response?.status === 401) {
        setError('Unauthorized');
      } else {
        setError('Login Failed');
      }
      // errRef.current.focus();
    }
  }
  return (
    // <div>
    //   <div className='display-4 text-center'>Login</div>
    //   <div className='row justify-content-center' style={{ height: '90vh' }}>

    //     <form className='col-5 '>
    //       <div className="form-group">
    //         <label htmlFor="email">Email address</label>
    //         <input type="email" onBlur={handleEmail} className="form-control" id="email" aria-describedby="emailHelp" />

    //       </div>
    //       <div className="form-group">
    //         <label htmlFor="password">Password</label>
    //         <input type="password" onBlur={handlePassword} className="form-control mb-3" id="password" />
    //       </div>
    //       {/* Calling to the methods */}
    // 			<div className="messages text-danger">
    // 				{errorMessage()}
    // 				{successMessage()}
    // 			</div>

    //       <div className='row justify-content-center '>
    //         <button className="btn btn-lg  text-light" style={{ backgroundColor: 'cadetblue' }} onClick={handleSubmit} type="submit">
    //           Submit
    //         </button>
    //       </div>
    //     </form>

    //   </div>
    // </div>
    <div className='mt-4'>
      <section class="">
        <div class="container-fluid h-custom">
          <div class="row d-flex justify-content-center align-items-center h-100">
            <div class="col-md-9 col-lg-6 col-xl-5">
              <img src="https://freepngclipart.com/download/house/73571-real-management-estate-house-agent-houses-vector.png"
                class="img-fluid" alt="Sample image"/>
            </div>
            <div class="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
              <form>
                <div class="d-flex flex-row align-items-center justify-content-center justify-content-lg-start">
                  <p class="lead fw-normal mb-0 me-3">Sign in with</p>
                  <button type="button" class="btn btn-primary btn-floating mx-1">
                    <FontAwesomeIcon icon={ faFacebook} />
                  </button>

                  <button type="button" class="btn btn-primary btn-floating mx-1">
                  <FontAwesomeIcon icon={ faTwitterSquare}/>
                  </button>

                  <button type="button" class="btn btn-primary btn-floating mx-1">
                  <FontAwesomeIcon icon={  faGoogle}/>
                  </button>
                </div>

                <div class="divider d-flex align-items-center my-4">
                  <p class="text-center fw-bold mx-3 mb-0">Or</p>
                </div>

                {/* <!-- Email input --> */}
                <div class="form-outline mb-4">
                  <input type="email" id="form3Example3" class="form-control form-control-lg"
                    placeholder="Enter a valid email address" onBlur={handleEmail}/>
                  <label class="form-label" for="form3Example3">Email address</label>
                </div>

                {/* <!-- Password input --> */}
                <div class="form-outline mb-3">
                  <input type="password" id="form3Example4" class="form-control form-control-lg"
                    placeholder="Enter password" onBlur={handlePassword}/>
                  <label class="form-label" for="form3Example4">Password</label>
                </div>

                <div class="d-flex justify-content-between align-items-center">
                  {/* <!-- Checkbox --> */}
                  
                  <Link to="/reset_password" class="text-body">Forgot password?</Link>
                </div>
                <div className="messages text-danger mt-3">
                  {errorMessage()}
                  {successMessage()}
                </div>
                <div class="text-center text-lg-start mt-4 pt-2">
                  <button type="button" class="btn btn-primary btn-lg"
                    onClick={handleSubmit} ><FontAwesomeIcon icon={ faLockOpen}/> Login</button>
                  
                  <p class="small fw-bold mt-2 pt-1 mb-0">Don't have an account? <Link to="/register"
                    class="link-danger">Register</Link></p>
                </div>

              </form>
            </div>
          </div>
        </div>
        
      </section>
    </div>
  )
}