import React from 'react'
import { useEffect, useState } from 'react'
import axios from '../api/axios';
import { Link } from "react-router-dom"
import useAuth from '../hooks/useAuth';

export default function AdminBuildings() {
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
      setBuildings(list);
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
    deleteBuilding().then(() => getAllbuildings()).catch(() => alert("This room has a booking and cannot be deleted!"));
  }


  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-2'></div>
        <div className='col-8'>
          <div>
            <h5 className="card-title" style={{ 'marginBottom': '20px' }}>All Buildings</h5>
          </div>
          <div className="accordion" id="accordionPanelsStayOpenExample">
            {buildings.map(b =>
              <div className="accordion-item" key={b.id}>
                <h2 className="accordion-header" id={`headingTwo`}>
                  <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={`#collapseTwo${b.id}`} aria-expanded="false" aria-controls="collapseTwo">
                    <p className='fs-5' style={{ "text-align": "left" }}>
                      {b.name}
                    </p>
                  </button>
                </h2>
                <div id={`collapseTwo${b.id}`} className="accordion-collapse collapse" aria-labelledby={`headingTwo`} data-bs-parent="#accordionExample">
                  <div className="accordion-body">
                    <span className="badge rounded-pill bg-secondary fs-6">City : {b.buildingAddr.city}</span>
                    <span className="badge rounded-pill bg-secondary ms-2 fs-6">State : {b.buildingAddr.state}</span>
                    <span className="badge rounded-pill bg-secondary ms-2 fs-6">ZipCode : {b.buildingAddr.zipCode}</span>
                    <br />
                    <br />
                    <h6>Owner Name:</h6>  <h4><span className="badge rounded-pill bg-secondary"> {b.owner.firstName + " " + b.owner.firstName}</span> </h4>
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
      </div>
    </div>
  )
}
