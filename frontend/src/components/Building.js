import { autocompleteClasses } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from '../api/axios';
import RoomCard from './RoomCard';
const Building = () => {
  const { buildingId } = useParams();
  const [rooms, setRooms] = useState([]);
  const [bimages, setBimages] = useState([]);
  const BACKEND = 'http://localhost:8080/image/id'
  var no = 0;

  function getNo(){
    no = no + 1;
    return no
  }

  const getImageIds = async () => {
    const response = await axios.get(`/image/building/${buildingId}`);
    return response.data;
  };

  useEffect(async () => {
    try {
      const response = await axios.get(`/room/inbuilding/${buildingId}`)
      console.log(response?.data)
      setRooms(response?.data);
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
  }, [])
  return (
    <div className=''>

      <div className="container-fluid" id="buildhead" >
        <p>Choose a room as per your convinience:
          <br />
        </p>
        <p>
          Rooms in the building you selected( Building Id:{buildingId})
        </p>
      </div>
      <div className='row'>
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
      <br />
      <div className='container-fluid'>
      <div className='row justify-content-center align-items-center wrap' style={{ "padding": "1rem" }}>
      {
            rooms.map(
              room => <RoomCard no={getNo()} room={room}/> )}
      </div>
    </div>
    </div>
  )
}

export default Building
