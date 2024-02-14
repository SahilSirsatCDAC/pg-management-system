import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import axios from '../api/axios';
import { Link } from "react-router-dom"
import useAuth from '../hooks/useAuth';

export default function Nbeds() {

    const { auth, setAuth } = useAuth();
    const [beds, setBeds] = useState([]);
    const [bimages, setBimages] = useState([]);
    let { roomId } = useParams();
    const BACKEND = 'http://localhost:8080/image/id'

    const retrieveBeds = async () => {
        const response = await axios.get(`/bed/inroom/${roomId}`);
        return response.data;
    };

    const getImageIds = async () => {
        const response = await axios.get(`/image/room/${roomId}`);
        return response.data;
    };

    const getAllBeds = async () => {
        const allBeds = await retrieveBeds();
        if (allBeds) {
            console.log(allBeds);
            setBeds(allBeds);
        }
    };

    useEffect(() => {
        const getBimageIds = async () => {
            const ids = await getImageIds();
            if (ids) {
                console.log(ids);
                setBimages(ids);
            }
        }
        getAllBeds();
        getBimageIds();
    }, []);

    function handleDelete(bedId) {
        console.log("---------------------=====")
        console.log(bedId);
        const deleteBed = async () => {
            const response = await axios.delete(`/bed/${bedId}`,
                {
                    headers: {
                        'Authorization': `Bearer ${auth.accessToken}`,
                        'Content-Type': 'application/json'
                    },
                    // withCredentials: true
                });
            return response.data;
        };
        deleteBed().then(() => getAllBeds()).catch(() => console.log("Booking exist cannot delete"));
    }
 
    return (
        <div className='container-fluid'>
            <div className='row my-3'>
                <div className='col-3'></div>
                <div className='col-6'>
                    <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel">
                        <div className="carousel-inner">
                            <div className="carousel-item active">
                                <img src="https://media.istockphoto.com/videos/welcome-sign-linear-gradient-leftright-transition-on-black-background-video-id1211888212?s=640x640" className="d-block w-100" style={{'height':'250px'}} alt="..." />
                            </div>
                            {
                                bimages.map(i =>
                                    <div className="carousel-item">
                                        <img src={`${BACKEND}/${i}`} className="d-block w-100" style={{'height':'250px'}} alt="..." />
                                    </div>
                                )
                            }
                        </div>
                        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Previous</span>
                        </button>
                        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Next</span>
                        </button>
                    </div>
                </div>
            </div>

            
            <div className='row'>
                <div className='col-2'></div>
                <div className='col-8'>
                    <div>
                        <h5 className="card-title" style={{ 'marginBottom': '20px' }}>Beds in room {roomId}</h5>
                        <hr />
                        <Link to={`/owner/room/${roomId}/addbed`}  type="button" className="btn btn-outline-success text-right" style={{ 'marginBottom': '20px' }}>Add New Bed</Link>
                        &nbsp;&nbsp;
                        <Link className="btn btn-outline-info" style={{ 'marginBottom': '20px' }} to={`/image/room/${roomId}`}>Upload Room Images</Link>
                    </div>
                    {
                        beds.map(r =>
                            <div className="card mb-3">
                                <div className="row g-0">
                                    <div className="col-12">
                                        <div className="card-body">
                                            <h5 className="card-title">Rent : {r.room.rentPerDay}</h5>
                                            <p className="card-text">{r.description}</p>
                                            <p className="card-text">
                                                <div style={{ 'textAlign': 'right' }}>
                                                    
                                                        <Link className="btn btn-info text-decoration-none text-white" to={`/owner/room/bed/bookings/${r.id}`}>View Bookings</Link>
                                                    
                                                    &nbsp;
                                                    <button type="button" className="btn btn-outline-danger" onClick={(e) => handleDelete(r.id)}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                                                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"></path>
                                                            <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"></path>
                                                        </svg>
                                                    </button>
                                                </div>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    }


                </div>
            </div>
        </div>
    );
}
