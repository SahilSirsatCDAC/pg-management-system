import React, { useState } from 'react'
import AdminBuildings from './AdminBuildings';
import User from './User';
import { Link } from 'react-router-dom';

const Admin = () => {
  const [flag, setFlag] = useState("building");

  const handleUsers = () => {
    setFlag("users");
    
  }

  const handleBuildings = () => {
    setFlag("building");
  }

  return (
    <div className='container-fluid' style={{height : "98vh"}}>
      <div className='row text-center mb-2'>
      <div>
      <Link className="col-3 btn btn-primary text-decoration-none " to="/admin/bookings">View All Bookings by Bed ID</Link>

      </div>
        <div className='col-6 display-6' onClick={handleUsers}>See Users</div>
        <div className='col-6 display-6' onClick={handleBuildings}>See Buildings</div>
      </div>
      <hr/>
      <div className='container'>
        { flag==="building" ? <AdminBuildings></AdminBuildings> : <User></User> }
      </div>
    </div>
  )
}

export default Admin
