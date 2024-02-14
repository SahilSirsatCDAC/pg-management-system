import React, { useEffect } from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios';


const OwnerDetails = () => {
    //STATE:
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [countryCode, setCountryCode] = useState("");
    const [contactNo, setContactNo] = useState("");
    const [email, setEmail] = useState("");
    
    const [addrl1, setAddrl1] = useState("");
    const [addrl2, setAddrl2] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [country, setCountry] = useState("");
    const [zipCode, setZipCode] = useState("");
    const [userAddr, setUserAddr] = useState({});
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState(false);
    const [userId, setUserId] = useState(0);


    //ACCESSORIES:
    const navigate = useNavigate();
   


    //HANDLERS:
    useEffect(async () => {
        try {
         const user = await axios.get(`/user/${localStorage.email}`) 
         const id=await user.data?.id;
         setUserId(id);
        
        
        } catch (error) {
          console.log("Error!!!!!!!!!")
        }
       
        
          
      }, [])
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
    


    //Handling the form submission
    const handleSubmit = async (e) => {
        setError("");
        setSubmitted("")
        e.preventDefault();
        try {
            setUserAddr({ addrl1, addrl2, city, state, country, zipCode });
            const postData = { firstName, lastName, countryCode, contactNo, email, userAddr };
            console.log(postData);
            const response = await axios.put(`/user/${userId}`,
                JSON.stringify(postData),
                {
                    headers: {
                        'Authorization': `Bearer ${localStorage.accessToken}`,
                        'Content-Type': 'application/json'
                    }
                }

            );
            setSubmitted("Building created Successfully! You are being redirected to Owner Dashboard!");
            setTimeout(() => {
                navigate("/owner")
            }, 3000)

        } catch (error) {
            if (error.response?.status === 409) {
                setError("Owners have to add their contact details! You are being redirected...");
                setTimeout(() => {
                    navigate("/owner/details")
                }, 5000)

            } else {
                setError("Something went wrong!")
            }
        }


    };
    return (
        <div className="container-fluid" style={{ 'height': '98vh' }}>
            <div className='row justify-content-center'>
                <div className='col-5 display-4 text-center '>
                    Add a building
                </div>
            </div>


            <div className='row justify-content-center mt-3'>
                <form className='col-5 '>
                    {/* Labels and inputs for form data */}
                    <label className="label">First Name</label>
                    <input onChange={(e) => setFirstName(e.target.value)} className="input form-control mb-2"
                        type="text" required />
                    <label className="label">Last Name</label>
                    <input onChange={(e) => setLastName(e.target.value)} className="input form-control mb-2"
                        type="text" required />
                    <label className="label">Country Code</label>
                    <input onChange={(e) => setCountryCode(e.target.value)} className="input form-control mb-2"
                        type="text" required />
                    <label className="label">Contact No.</label>
                    <input onChange={(e) => setContactNo(e.target.value)} className="input form-control mb-2"
                        type="text" required />
                    <label className="label">Email</label>
                    <input onChange={(e) => setEmail(localStorage.email)} className="input form-control mb-2"
                        type="text" required />


                    <label className="label">Address: Flat No./Apartment/Plot No.</label>
                    <input onChange={(e) => setAddrl1(e.target.value)} className="input form-control mb-2"
                        type="email" required />
                    <label className="label">Address: Street/Locality/Landmark</label>
                    <input onChange={(e) => setAddrl2(e.target.value)} className="input form-control mb-2"
                        type="email" required />

                    <label className="label">City</label>
                    <input onChange={(e) => setCity(e.target.value)} className="input form-control mb-2"
                        type="email" required />
                    <label className="label">State</label>
                    <input onChange={(e) => setState(e.target.value)} className="input form-control mb-2"
                        type="email" required />
                    <label className="label">Country</label>
                    <input onChange={(e) => setCountry(e.target.value)} className="input form-control mb-2"
                        type="email" required />
                    <label className="label">Postal Code</label>
                    <input onChange={(e) => setZipCode(e.target.value)} className="input form-control mb-2"
                        type="email" required />




                    {/* Calling to the methods */}
                    <div className="messages text-danger">
                        {errorMessage()}
                        {successMessage()}
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
    )
}

export default OwnerDetails
