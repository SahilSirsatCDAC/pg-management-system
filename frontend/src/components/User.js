import React, { useEffect, useState } from 'react'
import axios from '../api/axios';
import useAuth from '../hooks/useAuth';

const User = () => {

  const [users, setUsers] = useState([]);
  const { auth } = useAuth();
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  
  const retrieveUsers = async () => {
    const response = await axios.get("/user/users", {
      headers: {
        'Authorization': `Bearer ${auth.accessToken}`,
        'Content-Type': 'application/json'
      },
    });
    return response.data;
  };

  useEffect(() => {
    const getAllUsers = async () => {
      const allusers = await retrieveUsers();
      if (allusers) {
        console.log(allusers);
        setUsers(allusers);
        // console.log(list);
      }
    };

    getAllUsers();
  }, []);

  const handleDeleteRequest = async (e) => {
    const response = await axios.delete(`/user/${e}`, {
      headers: {
        'Authorization': `Bearer ${auth.accessToken}`,
        'Content-Type': 'application/json'
      },
    });
    return response.data;
  };
  const handleDelete = async (e) => {
    await handleDeleteRequest(e).then(() => {setUsers(users.filter((u) => u.id !== e));
    setSuccess(true);
    setTimeout(()=> {setSuccess(false)},3000)
  })
    .catch(() => {
      setError(true);
      setTimeout(() => {setError(false)},3000);
    });
    
  };

  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-2'></div>
        <div className='col-8 accordion'>
        {error ? <div className='alert alert-danger'>"Something went wrong, user may have bookings or buildings"</div> : null}
          {success ? <div className='alert alert-success'>"User deleted successfully"</div> : null}
          {users.length === 0 ? "No Users Try adding"
            :
            users.map(
              u =>
                <div className="accordion-item" key={u.id}>
                  <h2 className="accordion-header" id={`headingTwo`}>
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={`#collapseTwo${u.id}`} aria-expanded="false" aria-controls="collapseTwo">
                      <p className='fs-5' style={{ "text-align": "left" }}>
                        {`${u.firstName} ${u.lastName}`}
                      </p>
                    </button>
                  </h2>
                  <div id={`collapseTwo${u.id}`} className="accordion-collapse collapse" aria-labelledby={`headingTwo`} data-bs-parent="#accordionExample">
                    <div className="accordion-body">

                      <span className="badge bg-secondary fs-6">{`${u?.userAddr?.city}`}</span>&nbsp;&nbsp;&nbsp;
                      <span className="badge bg-secondary fs-6">{u?.countryCode} {u?.contactNo}</span>&nbsp;&nbsp;&nbsp;
                      <span className="badge bg-primary fs-6">{u?.email}</span>
                      <div style={{ 'textAlign': 'right' }}>
                        <button type="button" className="btn btn-outline-danger" onClick={(e) => handleDelete(u.id)}>
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"></path>
                            <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"></path>
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
  )
}

export default User
