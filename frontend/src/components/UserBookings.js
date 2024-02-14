import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import axios from '../api/axios';
import useAuth from '../hooks/useAuth'

export default function UserBookings() {

    const { auth } = useAuth();
    const userId = localStorage.getItem("userId");
    const [userBookings, setUserBookings] = useState([]);

    const mystyle = {
        color: "black",
        textDecoration: 'none',
    };

    const getUserBookingDetails = async () => {
        const response = await axios.get(`/booking/userBookings/${userId}`,
            {
                headers: {
                    'Authorization': `Bearer ${auth.accessToken}`,
                    'Content-Type': 'application/json'
                },
            });
        return response.data;
    };

    useEffect(() => {
        getUserBookingDetails().then((data) => {
            setUserBookings(data);
            console.log(data);
        }).catch((error) => console.log("Error in fetching user bookings"))
    }, [])

    function handleDelete(bookingId) {
        const deleteBooking = async () => {
            const response = await axios.delete(`/booking/${bookingId}`,
                {
                    headers: {
                        'Authorization': `Bearer ${auth.accessToken}`,
                        'Content-Type': 'application/json'
                    },
                    // withCredentials: true
                });
            return response.data;
        };
        deleteBooking().then(() => getUserBookingDetails().then((data) =>
            setUserBookings(data))).catch(() => console.log("Booking exist cannot delete"));
    }

    return (
        <div className='container-fluid' style={{ height: "97vh" }}>
            <div className='row justify-content-center align-items-center' style={{ "padding": "3rem" }}>
                {
                    userBookings.length === 0
                        ?
                        "No booking available"
                        :
                        null
                }
                {
                    userBookings.map(
                        b =>
                            <div className="card" style={{ "width": "19rem", "margin": "1rem" }} key={b.id}>
                                <div className="card-body">
                                    <h5 className="card-title">Start date : {`${b.startDate[2]}/${b.startDate[1]}/${b.startDate[0]}`}</h5>
                                    <h6 className="card-subtitle mb-2 text-muted">End date : {`${b.endDate[2]}/${b.endDate[1]}/${b.endDate[0]}`}</h6>
                                    <p className="card-text">
                                        <b>Building Name :</b> {b.bed.room.building.name}
                                        <br />
                                        <b>Room No :</b> {b.bed.room.id}
                                        <br />
                                        <b>Bed No :</b> {b.bed.id}
                                        <br />
                                        <b>Address :</b> {Object.values(b.bed.room.building.buildingAddr).join(" ").substring(2)}
                                    </p>
                                    <button type="button" class="btn btn-outline-secondary"><Link to={`/room/${b.bed.room.id}`} style={mystyle}>Room</Link></button>&nbsp;&nbsp;
                                    <button type="button" class="btn btn-outline-secondary"><Link to={`/building/${b.bed.room.building.id}`} style={mystyle}>Building</Link></button>&nbsp;&nbsp;
                                    <button type="button" class="btn btn-outline-danger" onClick={(e) => handleDelete(b.id)}>Delete</button>
                                </div>
                            </div>
                    )
                }
            </div>
        </div>
    )
}
