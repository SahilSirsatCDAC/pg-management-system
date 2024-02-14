import React, { useEffect, useState } from 'react'
import axios from '../api/axios';
import { Link } from "react-router-dom"
import useAuth from '../hooks/useAuth';
const Owner = () => {

  const [buildings, setBuildings] = useState([]);
  const { auth, setAuth } = useAuth();
  const retrieveBuildings = async () => {
    const response = await axios.get("/building");
    return response.data;
  };
  const getAllbuildings = async () => {
    const allbuildings = await retrieveBuildings();
    if (allbuildings) {
      let list = allbuildings;
      // setBuildings(list);
      setBuildings(list.filter(b => b.owner.email === auth?.email));
      // console.log(list);
    }
  };

  useEffect(() => {
    getAllbuildings();
  }, []);

  function handleDelete(buildingId) {
    console.log("---------------------=====")
    console.log(buildingId);
    const deleteBuilding = async () => {
      const response = await axios.delete(`/building/${buildingId}`,
        {
          headers: {
            'Authorization': `Bearer ${auth.accessToken}`,
            'Content-Type': 'application/json'
          },
          // withCredentials: true
        });
      return response.data;
    };
    deleteBuilding().then(() => getAllbuildings()).catch(() => console.log("Booking exist cannot delete"));
  }


  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-5'>
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
        </div>
        <div className='col-1'></div>
        <div className='col-5'>
          <div>
            <h5 className="card-title" style={{ 'marginBottom': '20px' }}>My Buildings</h5>
            {/* <button type="button" className="btn btn-outline-success text-right" style={{ 'marginBottom': '20px' }}> */}
            <Link className='link btn btn-outline-success text-right' to='/owner/building/add' style={{ 'marginBottom': '20px' }}>Add New Building</Link>

            {/* </button> */}
          </div>
          <div className="accordion accordion-flush" id="accordionFlushExample">
            {buildings.map(b =>
              <div className="accordion-item">
                <h2 className="accordion-header" id={`flush-headingOne${b.id}`}>
                  <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={`#flush-collapseOne${b.id}`} aria-expanded="false" aria-controls={`flush-collapseOne${b.id}`}>
                    {b.name}
                  </button>
                </h2>
                <div id={`flush-collapseOne${b.id}`} className="accordion-collapse collapse" aria-labelledby={`flush-headingOne${b.id}`} data-bs-parent="#accordionFlushExample">
                  <div className="accordion-body">
                    <span className="badge bg-secondary">City : {b.buildingAddr.city}</span>&nbsp;&nbsp;&nbsp;
                    <span className="badge bg-secondary">State : {b.buildingAddr.state}</span>
                    <div className='mt-3' style={{ 'textAlign': 'right' }}>

                      <Link className="btn btn-outline-info" to={`/owner/room/${b.id}`}>View Rooms</Link>

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
      </div>
    </div>
  )
}

export default Owner
