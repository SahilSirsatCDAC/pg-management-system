import { useRef, useState, useEffect } from "react";
import axios from '../api/axios';
import { Link, useNavigate, useParams } from "react-router-dom";


export default function Register() {
	const navigate = useNavigate()
	// States for registration
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [roles, setRoles] = useState(["ROLE_USER"]);
	const user = { firstName, lastName, email, password, roles };

	// States for checking the errors
	const [submitted, setSubmitted] = useState(false);
	const [error, setError] = useState(false);

	function sleep(ms) {
		return new Promise(resolve => setTimeout(resolve, ms));
	}

	// Handling the name change
	const handleFirstName = (e) => {
		setFirstName(e.target.value);
		setSubmitted(false);
	};

	const handleLastName = (e) => {
		setLastName(e.target.value);
		setSubmitted(false);
	};

	// Handling the email change
	const handleEmail = (e) => {

		var emailVal = e.target.value;
		if (typeof (emailVal) === 'undefined') {

			emailVal = "";
			setError("Please enter a valid email address!");
		} else if (/.+@.+/.test(emailVal)) {
			console.log("pattenr matches")
			setEmail(emailVal);
			setError(null);
			setSubmitted(false);
		} else {

			setError("Please enter a valid email address!");
		}

	};

	// Handling the password change
	const handlePassword = (e) => {
		var passwordVal = e.target.value;
		if (typeof (passwordVal) === 'undefined') {

			passwordVal = "";
			setError("Please enter a valid password: Minimum eight characters, at least one letter, one number and one special character");
		} else if (/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(passwordVal)) {
			console.log("pattenr matches")
			setPassword(passwordVal);
			setError(null);
			setSubmitted(false);
		} else {

			setError("Please enter a valid password: Minimum eight characters, at least one letter, one number and one special character");
		}
	};



	const handleRoles = (e) => {

		setRoles(["ROLE_OWNER", "ROLE_USER"]);
	}

	// const handleConfirmPassword = (e) => {
	// 	if (confirmPassword === password) {
			
	// 		setError("");
	// 		setSubmitted("Passwords Match!")
			
	// 	} else {
			
	// 	}
	// }

	//Handling the form submission
	const handleSubmit = async (e) => {
		setError("");
		setSubmitted("")
		e.preventDefault();
		try {
			if (password === confirmPassword) {
				const response = await axios.post("/auth/signup",
					JSON.stringify({ firstName, lastName, email, password, roles }),
					{
						headers: { 'Content-Type': 'application/json' },
						withCredentials: true
					}

				);
				setSubmitted("Registered Successfully! You are being redirected to Login Page please wait...");
				setTimeout(() => {
					navigate("/login")
				}, 3000)
			}else{
				setError("Passwords do not match!")
			}

		} catch (error) {
			if (error.response?.status === 500) {
				setError("You have already Registered with us!");
			} else if (error.response?.status === 400) {
				setError("All fields are mandatory! Please check if E-mail is valid and Password matches the requirements.")
			}
		}


	};


	// Showing success message
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

	return (
		<div className="container-fluid" style={{ 'height': '98vh' }}>
			<div className='row justify-content-center'>
				<div className='col-5 display-4 text-center '>
					User Registration
				</div>
			</div>


			<div className='row justify-content-center mt-3'>
				<form className='col-5 '>
					{/* Labels and inputs for form data */}
					<label className="label">First Name</label>
					<input onChange={handleFirstName} className="input form-control"
						value={firstName} type="text" required />


					<label className="label">Last Name</label>
					<input onChange={handleLastName} className="input form-control"
						value={lastName} type="text" required />


					<label className="label">Email</label>
					<input onBlur={handleEmail} className="input form-control"
						type="email" required />


					<label className="label">Password</label>
					<input onBlur={handlePassword} className="input form-control mb-2"
						defaultValue={password} type="password" required />

					<label className="label">Confirm Password</label>
					<input className="input form-control mb-2"
						onChange={(e) => setConfirmPassword(e.target.value)} type="password" required />


					{/* Calling to the methods */}
					<div className="messages text-danger">
						{errorMessage()}
						{successMessage()}

					</div>
					<div>
						<input type="checkbox" onChange={handleRoles} name="owner" id="owner" /> I want to register as Owner
					</div>






					<br />
					<div className='row justify-content-center '>
						<button className="btn btn-primary   text-light" style={{width:'10rem'}} onClick={handleSubmit} type="submit">
							Submit
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}
