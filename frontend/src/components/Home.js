import React, { useEffect, useState } from 'react'
import axios from '../api/axios';
import { Link } from 'react-router-dom';
import BuildingCard from './BuildingCard';

const Home = () => {
  const [buildings, setBuildings] = useState([]);
  let searchTerm = "";

  useEffect(() => {
    axios.get("/building").then(res => {
      const buildings = res.data;
      setBuildings(buildings);
    })
  }, []);

  function applyFilter(e) {
    searchTerm = e.target.value;
    if (searchTerm !== "") {
      const newContactList = buildings.filter((b) => {
        let ls = [b.name, ...Object.values(b.buildingAddr), ...Object.values(b.owner)]
        return ls
          .join(" ")
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
      });
      setBuildings(newContactList);
    } else {
      axios.get("/building").then(res => {
        const buildings = res.data;
        setBuildings(buildings);
      })
    }
  }

  return (
    <>
      <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="true">
        <div class="carousel-indicators">
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
        </div>
        <div class="carousel-inner">
          <div class="carousel-item active">
            <img src="https://www.schudio.com/wp-content/uploads/2016/08/welcome-page-blog-header.jpg" class="d-block w-100" alt="..." style={{ "height": "200px" }} />
          </div>
          <div class="carousel-item">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbAz9E73Gtwc0Fjc9NtHFo9QFaaHqsyR3B2A&usqp=CAU" class="d-block w-100" alt="..." style={{ "height": "200px" }} />
          </div>
          <div class="carousel-item">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSytra5qb7_0kk1S6-onJ9JyOUUwGq9pr-2ew&usqp=CAU" class="d-block w-100" alt="..." style={{ "height": "200px" }} />
          </div>
        </div>
        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>


      <div className='row' >
        <div className='row justify-content-center align-content-center mt-5 mb-3'>


          <div className=" col-11  d-flex justify-content-center ">
            <div>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-house-fill" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="m8 3.293 6 6V13.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5V9.293l6-6zm5-.793V6l-2-2V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5z" />
                <path fillRule="evenodd" d="M7.293 1.5a1 1 0 0 1 1.414 0l6.647 6.646a.5.5 0 0 1-.708.708L8 2.207 1.354 8.854a.5.5 0 1 1-.708-.708L7.293 1.5z" />
              </svg>
            </div>
            <h4>&nbsp;&nbsp;&nbsp;&nbsp;Welcome to P.G. Rental System! Find and book a stay!</h4>
          </div>
        </div>
        <div className='row mb-3'>
          <div className='col-3'></div>
          <div className='col-6'>
            <div className='mb-3'>
              <input type="text" className="form-control" id="search" name='searchFilter' placeholder='Search with name, location, state, owner, zipcode.....' onChange={(e) => applyFilter(e)} />
            </div>
          </div>
        </div>
        <hr />
        {/* <div className='container-fluid' style={{ height: "97vh" }}>
        <div className='row justify-content-center align-items-center'> */}
        {/* <BuildingCard building={buildings[0]} /> */}
        {/* <div className='col-6'> */}
        {/* {
            buildings.map(
              building =>
                <div style={{ padding: '15px', "minWidth":"200px" }} >
                  <div className="card shadow" key={building.id}>
                    <div className="d-flex flex-row" > */}

        {/* <div className="card-body">
                        <div className="d-flex flex-column mb-4">
                          <div className='row'>
                            <div className='col-12 card-title display-5'>{building.name}</div>

                            <div className='col-6'><p className="card-text" style={{ fontSize: '20px' }}>City : {building.buildingAddr.city}<br /> State : {building.buildingAddr.state} </p></div>
                            <div className='col-1'></div>
                            <div className='col-5 text-center'>  <a href="#" className="btn ">
                              <Link className="btn btn-outline-secondary" to={`/building/${building.id}`}>View Rooms</Link></a>
                            </div>
                          </div> */}

        {/* </div>
                      </div>
                    </div>
                  </div>
                </div> */}
        {/* )
          } */}
        {/* </div> */}
        {/* <div className='col-5' style={{ 'margin': '10px',"minWidth":"200px" }}>
          <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-inner">
              <div className="carousel-item active">
                <img src="https://images.unsplash.com/photo-1544376798-89aa6b82c6cd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dmVydGljYWwlMjBsYW5kc2NhcGV8ZW58MHx8MHx8&w=1000&q=80" className="d-block w-100" alt="..." />
              </div>
              <div className="carousel-item">
                <img src="https://thumbs.dreamstime.com/b/vertical-shot-road-magnificent-mountains-under-blue-sky-captured-california-163571053.jpg" className="d-block w-100" alt="..." />
              </div>
              <div className="carousel-item">
                <img src="https://mobirise.com/bootstrap-carousel/assets2/images/thomas-smith-399133-1707x2560.jpg" className="d-block w-100" alt="..." />
              </div>
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
        </div> */}
        {/* </div >
      </div> */}
      </div>
      <div className='container-fluid'>
        <div className='row justify-content-center align-items-center wrap' style={{ "padding": "3rem" }}>
          {
            buildings.map(
              building => <BuildingCard building={building} />)}
        </div>
      </div>

      

    </>
  )
}

export default Home
