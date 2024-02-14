import React from 'react'
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import axios from '../api/axios';
import useAuth from '../hooks/useAuth';


const Room = () => {
  const { setAuth } = useAuth();

  const { roomId } = useParams();
  const [beds, setBeds] = useState([]);
  const [rent, setRent] = useState();
  const [bimages, setBimages] = useState([]);
  const BACKEND = 'http://localhost:8080/image/id'

  // setAuth({ beds[0]. });
  useEffect(async () => {
    try {
      const response = await axios.get(`/bed/inroom/${roomId}`)
      console.log(response?.data)
      setBeds(response?.data);


    } catch (error) {
      console.log("Error!!!!!!!!!")
    }
  }, [])

  const getImageIds = async () => {
    const response = await axios.get(`/image/room/${roomId}`);
    return response.data;
  };

  useEffect(async () => {
    try {

      const rentNew = beds[0].room.rentPerDay;
      if (rentNew) {
        localStorage.setItem('rent', rentNew);
      }
      setRent(rentNew);



    } catch (error) {
      console.log("Error!!!!!!!!!")
    }
    const getBimageIds = async () => {
      const ids = await getImageIds();
      if (ids) {
        console.log(ids);
        setBimages(ids);
      }
    }
    getBimageIds();
  }, [beds])

  return (
    <div>
      <div className='row my-3'>
        <div className='col-3'></div>
        <div className='col-6'>
          <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-inner">
              <div className="carousel-item active">
                <img src="https://media.istockphoto.com/videos/welcome-sign-linear-gradient-leftright-transition-on-black-background-video-id1211888212?s=640x640" className="d-block w-100" style={{ 'height': '250px' }} alt="..." />
              </div>
              {
                bimages.map(i =>
                  <div className="carousel-item">
                    <img src={`${BACKEND}/${i}`} className="d-block w-100" style={{ 'height': '250px' }} alt="..." />
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
      <div className='row justify-content-center'>
        <div class=" col-10 accordion " id="accordionPanelsStayOpenExample">
              {beds.map(bed =>
                <div className="accordion-item" key={bed.id}>
                  <h2 className="accordion-header" id={`panelsStayOpen-headingOne${bed.id}`}>
                    <button className="accordion-button fs-4" type="button" data-bs-toggle="collapse" data-bs-target={`#panelsStayOpen-collapseOne${bed.id}`} aria-expanded="true" aria-controls={`panelsStayOpen-collapseOne${bed.id}`}>
                      {bed.description}
                    </button>
                  </h2>
                  <div id={`panelsStayOpen-collapseOne${bed.id}`} className="accordion-collapse collapse show" aria-labelledby={`panelsStayOpen-headingOne${bed.id}`}>
                    <div className="accordion-body">
                      <h6>Owner Details:</h6>
                      <br />
                      Name: <span className="badge bg-secondary fs-6 me-5 ms-2">{bed.room.building.owner.firstName+" "+bed.room.building.owner.lastName}</span>
                      Contact No.:<span className="badge bg-secondary me-5 ms-2 fs-6">{"+"+bed.room.building.owner.countryCode +"-"+ bed.room.building.owner.contactNo}</span>
                      E-mail:<span className="badge bg-info me-5 ms-2 fs-6">{bed.room.building.owner.email}</span>
                      
                      <br />
                      <br />
                      <h6>Rent/Day:</h6>  <h2><span className="badge bg-primary"> &#8377; { bed.room.rentPerDay}</span> </h2>
                      <div style={{ 'textAlign': 'right' }}>
                      <Link className="btn btn-success" to={`/book/${bed.id}`} state={bed} >Book this Bed</Link>
                      </div>
                    </div>
                  </div>
                </div>
              )
              }
            
          
          
        </div>
      </div>


    </div>
  )
}

export default Room
