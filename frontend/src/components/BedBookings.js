import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import axios from '../api/axios';
import useAuth from '../hooks/useAuth';

export default function BedBookings() {

    const { auth } = useAuth();
    const { bedId } = useParams();
    const [bedBookings, setBedBookings] = useState([]);

    const getBedBookingDetails = async () => {
        const response = await axios.get(`/booking/bedBookings/${bedId}`,
            {
                headers: {
                    'Authorization': `Bearer ${auth.accessToken}`,
                    'Content-Type': 'application/json'
                },
            });
        return response.data;
    };

    useEffect(() => {
        getBedBookingDetails().then((data) => {
            setBedBookings(data);
            console.log(data);
        }).catch((error) => console.log("Error in fetching user bookings"))
    }, [])

    return (
        <div className='container-fluid' style={{ height: "97vh" }}>
            <div className='row justify-content-center align-items-center' style={{ "padding": "3rem" }}>
                {
                    bedBookings.length === 0
                        ?
                        "No booking available"
                        :
                        null
                }
                {
                    bedBookings.map(
                        b =>
                            <div className="card" style={{ "width": "19rem", "margin": "1rem" }} key={b.id}>
                                <div className="card-body">
                                    <h5 className="card-title">Start date : {`${b.startDate[2]}/${b.startDate[1]}/${b.startDate[0]}`}</h5>
                                    <h6 className="card-subtitle mb-2 text-muted">End date : {`${b.endDate[2]}/${b.endDate[1]}/${b.endDate[0]}`}</h6>
                                    <p className="card-text">
                                        <b>Rent Paid :</b> {b.rent}
                                        <br />
                                    </p>
                                </div>
                            </div>
                    )
                }
            </div>
        </div>
    )
}
