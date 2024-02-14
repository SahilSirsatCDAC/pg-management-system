import React from 'react'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import axios from '../api/axios';
import { useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

function loadScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement('script')
    script.src = src
    script.onload = () => {
      resolve(true)
    }
    script.onerror = () => {
      resolve(false)
    }
    document.body.appendChild(script)
  })
}

const Book = (props) => {
  const { bedId } = useParams();
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [rent, setRent] = useState(0);
  const [transactionDate, setTransactionDate] = useState(new Date());
  const [totalDays, setTotalDays] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);
  const rentPerDay = localStorage.getItem('rent');
  // const rentPerDay=10;
  const setAuth = useAuth();
  const navigate = useNavigate();
  const auth = setAuth.auth;

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


  const handleStartDate = (e) => {
    setStartDate(new Date(e.target.value));


  }

  const handleEndDate = (e) => {
    setError(null);
    const date = new Date(e.target.value);
    if (startDate === 'undefined') {
      setError("Please select start date first!")
    } else if (date < startDate) {
      setError("End date cannot be earlier that start date!")
    } else {
      setEndDate(date);
    }

  }
  const handleTotalDays = (e) => {

  }
  useEffect(async () => {
    try {

      const days = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));

      if (isNaN(days)) {
        setTotalDays(0);
      } else {
        setTotalDays(days);
      }
    } catch (error) {
      console.log("Error!!!!!!!!!")
    }

    setRent(rentPerDay * totalDays);

  }, [endDate, startDate, totalDays])

  const addToBackend = async () => {
    try {
      const response = await axios.post(`/booking/bed/${bedId}`,
        JSON.stringify({ startDate, endDate, rent, transactionDate }),
        {
          headers: {
            'Authorization': `Bearer ${auth.accessToken}`,
            'Content-Type': 'application/json'
          },
          // withCredentials: true
        }
      );
      console.log(JSON.stringify(response?.data));
      setSubmitted('Booking in progress proceed with payment')
    } catch (err) {
      if (!err?.response) {
        setError('No Server Response');
      } else if (err.response?.data.endDate) {
        setError('End date must be in the future!');
      } else if (err.response?.status === 401) {
        setError('Please login to Book!');
      } else if (err?.response?.status === 400) {
        setError('Booking Failed, bed is already booked on these dates!');
      }
      else {
        setError('Unknown Error occured please try again!');
      }

    }
  }


  const handleSubmit = async (e) => {
    e.preventDefault();
    displayRazorpay().then(() => {
      addToBackend();
    })



  }
  async function displayRazorpay() {
    const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js')

    if (!res) {
      alert('Razorpay SDK failed to load. Are you online?')
      return
    }

    const data = await fetch('http://localhost:1337/razorpay', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount: rent })
    }).then((t) =>
      t.json()
    )

    console.log(data)

    const options = {
      key: "rzp_test_3sX0U2MJqYc0JJ",
      currency: "INR",
      amount: 100 * rent,
      order_id: data.id,
      name: 'PGHub',
      description: 'Thank you for using PGHub',
      image: 'http://localhost:1337/logo.svg',
      handler: function (response) {

        alert("Your payment id is "+response.razorpay_payment_id)
        navigate("/")
        // addToBackend();
        // alert(response.razorpay_order_id)
        // alert(response.razorpay_signature)
      },
      prefill: {
        email: localStorage.getItem("email")
      }
    }
    const paymentObject = new window.Razorpay(options)
    paymentObject.open()
  }
  return (
    <div className="container-fluid" style={{ 'height': '98vh' }}>
      <div className='row justify-content-center'>
        <div className='col-5 display-4 text-center '>
          Book
        </div>
      </div>


      <div className='row justify-content-center mt-3'>
        <form className='col-5 '>
          {/* Labels and inputs for form data */}
          <label className="label">Start Date</label>
          <input onChange={handleStartDate} className="input form-control"
            type="date" required />


          <label className="label">End Date</label>
          <input onChange={handleEndDate} className="input form-control"
            type="date" required />

          <label className="label">Rent per Day: Rs. </label>
          <input className="input form-control"
            type="text" value={rentPerDay} disabled />
          <label className="label">Total Days  : </label>
          <input className="input form-control"
            type="text" value={totalDays} disabled />
          <label className="label">Total amount for {totalDays} Days : </label>
          <input className="input form-control mb-3"
            type="text" value={rentPerDay * totalDays} disabled />





          {/* Calling to the methods */}
          <div className="messages text-danger">
            {errorMessage()}
            {successMessage()}
          </div>
          <br />
          <div className='row justify-content-center '>
            <button className="btn btn-primary   text-light" style={{ width: '10rem' }} onClick={handleSubmit} type="submit">
              {/* <button className="btn btn-primary   text-light" style={{ width: '10rem' }} onClick={displayRazorpay} type="submit"> */}
              Pay Rs. {rentPerDay * totalDays} Now
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Book
