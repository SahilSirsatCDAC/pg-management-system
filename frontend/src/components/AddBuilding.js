import React, { useEffect } from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios';
import useAuth from '../hooks/useAuth';
const AddBuilding = () => {
  //STATE:
  const [name, setName] = useState("");
  const [addrl1, setAddrl1] = useState("");
  const [addrl2, setAddrl2] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [buildingAddr, setBuildingAddr] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);

  //ACCESSORIES:
  const navigate = useNavigate();
  const auth = useAuth();


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
  useEffect(async () => {
    try {
      setBuildingAddr({ addrl1, addrl2, city, state, country, zipCode });


    } catch (error) {
      console.log("Error!!!!!!!!!")
    }



  }, [addrl1, addrl2, city, state, country, zipCode])


  //Handling the form submission
  const handleSubmit = async (e) => {
    setError("");
    setSubmitted("")
    e.preventDefault();
    try {

      setBuildingAddr({ addrl1, addrl2, city, state, country, zipCode });
      if (name && addrl1 && addrl2 && city && state && country && zipCode.length==6) {
        
        const postData = { name, buildingAddr };
        console.log(buildingAddr);
        const response = await axios.post("/building/",
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
      }else{
        setError("All fields are mandatory and ZipCode must be 6 digits!")
      }

      

    } catch (error) {
      if (error.response?.status === 409) {
        setError("Owners have to add their contact details! You are being redirected...");
        setTimeout(() => {
          navigate("/profile")
        }, 5000)

      } else if (error.response?.status === 400) {
        setError("All fields are mandatory!");
        

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
          <label className="label">Building Name</label>
          <input onChange={(e) => setName(e.target.value)} className="input form-control mb-2"
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
            <button className="btn btn-primary   text-light" style={{width:'10rem'}}  onClick={handleSubmit} type="submit">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddBuilding
