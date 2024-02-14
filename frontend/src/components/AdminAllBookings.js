import React, { useState } from 'react'
import { useEffect } from 'react';
import axios from '../api/axios';

const AdminAllBookings = () => {

    //STATE
    const [bedId, setBedId] = useState();
    const [bookings, setBookings] = useState([]);
    //ACCESORIES
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState(false);



    //HANDLERS
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
        setSubmitted("");
        e.preventDefault();
        try {
            const response = await axios.get(`/booking/bedBookings/${bedId}`,
                {
                    headers: {
                        'Authorization': `Bearer ${localStorage.accessToken}`,
                        'Content-Type': 'application/json'
                    }
                })
            const bookingsTemp = response?.data;
            if (bookingsTemp.length === 0) {
                setError("No bookings found for this bed!")
                console.log(bookings.length)
            }
            setBookings(bookingsTemp);

        } catch (error) {

        }
    }
    useEffect(() => {
        handleSubmit();
      }, []);
    
      function handleDelete(buildingId){
        console.log("---------------------=====")
        console.log(buildingId);
        const deleteBuilding = async () => {
          const response = await axios.delete(`/booking/${buildingId}`,
          {
              headers: {
                  'Authorization': `Bearer ${localStorage.accessToken}`,
                  'Content-Type': 'application/json'
              },
              // withCredentials: true
          });
          return response.data;
        };
        deleteBuilding().then(() => handleSubmit()).catch((error) => alert(error));
      }
    return (

        <div className="container-fluid" style={{ 'height': '98vh' }}>
            <div className='row justify-content-center'>
                <div className='col-5 display-4 text-center '>
                    Get booking details for bed
                </div>
            </div>


            <div className='row justify-content-center mt-3'>
                <form className='col-5 '>
                    {/* Labels and inputs for form data */}
                    <label className="label">Bed ID:</label>
                    <input onChange={(e) => setBedId(e.target.value)} className="input form-control mb-2"
                        type="text" required />
                    {/* Calling to the methods */}
                    <div className="messages text-danger ">
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
            <div className="accordion" id="accordionPanelsStayOpenExample">
                {bookings.map(b =>
                    <div className="accordion-item" key={b.id}>
                        <h2 className="accordion-header" id={`panelsStayOpen-headingOne${b.id}`}>
                            <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target={`#panelsStayOpen-collapseOne${b.id}`} aria-expanded="true" aria-controls={`panelsStayOpen-collapseOne${b.id}`}>
                                {b.startDate[2] + "-" + b.startDate[1] + "-" + b.startDate[0] + " to " + b.endDate[2] + "-" + b.endDate[1] + "-" + b.endDate[0]}
                            </button>
                        </h2>
                        <div id={`panelsStayOpen-collapseOne${b.id}`} className="accordion-collapse collapse show" aria-labelledby={`panelsStayOpen-headingOne${b.id}`}>
                            <div className="accordion-body">
                                Booking Date: <span className="badge bg-secondary me-5 fs-6">{b.transactionDate[2] + "-" + b.transactionDate[1] + "-" + b.transactionDate[0]}</span>
                                Owner Name<span className="badge bg-secondary me-5 fs-6">{b.bed.room.building.owner.firstName + " " + b.bed.room.building.owner.lastName}</span>
                                Owner Contact:<span className="badge bg-secondary ms-2 fs-6">{b.bed.room.building.owner.contactNo}</span>
                                <span className="badge bg-info ms-2 fs-6">{ }</span>
                                <br />
                                <br />
                                <h6>Rent Paid:</h6>  <h2><span className="badge bg-primary"> Rs. {b.rent}</span> </h2>
                                <div style={{ 'textAlign': 'right' }}>
                                    &nbsp;
                                    <button type="button" className="btn btn-outline-danger" onClick={(e) => handleDelete(b.id)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"></path>
                                            <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"></path>
                                        </svg>
                                    </button>

                                </div>
                            </div>
                        </div>
                    </div>
                )
                }
            </div>
        </div>
    )
}

export default AdminAllBookings
