import { useEffect } from "react";
import { Link } from "react-router-dom"
import useAuth from "../hooks/useAuth"
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitterSquare, faFacebook, faGoogle} from "@fortawesome/free-brands-svg-icons";
import { faUserLock, faLock, faLockOpen, faHome } from '@fortawesome/free-solid-svg-icons';

const Header = () => {

    const navigate = useNavigate();
    const { auth, setAuth } = useAuth();
    const [list, setList] = useState([]);
    const userId = localStorage.getItem("userId");
    const [imageId, setImageId] = useState(0);

    const mystyle = {
        color: "black",
        textDecoration: 'none',

    };

    const getImage = async () => {
        const response = await axios.get(`/image/user/${userId}`,
            {
                headers: {
                    'Authorization': `Bearer ${auth.accessToken}`,
                    'Content-Type': 'application/json'
                },
            });
        return response.data;
    }

    // console.log(list);
    useEffect(() => {

        if (auth?.roles == undefined) {
            setList([]);
            setImageId(0);
        } else {
            setList(auth?.roles)
            getImage().then((data) => {
                if (data.length !== 0) {
                    console.log(data);
                    setImageId(data[data.length-1]);
                }
            }).catch(() => {
                console.log("user has logged out so no response recieved");
                setImageId(0);
            })
        }
    }, [auth, imageId]);
    const logout = () => {
        localStorage.clear()
        setAuth(null);
        navigate("/home");
    }

    return (
        <nav class="navbar" style={{"backgroundColor":"#e3f2fd"}}>
            <div className="container-fluid">
                <Link to={`/home`} style={mystyle}><h1 className="display-6"><FontAwesomeIcon icon={ faHome}/> PGHub</h1></Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
                    <div className="offcanvas-header">
                        <h5 className="offcanvas-title" id="offcanvasNavbarLabel">Paying Guest Management</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                    </div>
                    <div className="row justify-content-center align-items-center">
                        {imageId !== 0 ?
                            <img src={`http://localhost:8080/image/id/${imageId}`} style={{ "borderRadius": "50%","width":"200px","height":"200px"}} className="img-thumbnail mb-3" alt="..." />
                            :
                            <svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" fill="currentColor" className="bi bi-person" viewBox="0 0 16 16">
                                <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z" />
                            </svg>
                        }
                    </div>
                    <div className="row justify-content-center align-items-center">
                        {auth?.email}
                    </div>

                    <div className="offcanvas-body">
                        <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                            <hr />
                            <li className="nav-item mb-2">
                                <Link to={`/home`} style={mystyle}>Home</Link>
                            </li>
                            {auth?.email == null ?
                                <li className="nav-item mb-2">
                                    <Link to={`/register`} style={mystyle}>Register</Link>
                                </li>
                                :
                                <li className="nav-item mb-2">
                                    <Link to={`/profile`} style={mystyle}>Profile</Link>
                                </li>
                            }
                            {auth?.email == null ?
                                null
                                :
                                <li className="nav-item mb-2">
                                    <Link to={`/user/bookings`} style={mystyle}>My Bookings</Link>
                                </li>
                            }
                            <hr />
                            {
                                list.filter(r => r !== "ROLE_USER").map(r => r.split('_')[1].toLowerCase()).map(r =>
                                (<li className="nav-item mb-2" key={r}>
                                    <Link to={`/${r}`} style={mystyle}>{r[0].toUpperCase() + r.substring(1) + ' Operations'}</Link>
                                </li>)
                                )
                            }
                        </ul>
                        <br />
                        {/* { !('email' in auth) ? <button className="btn btn-outline-success">Login</button> : <button className="btn btn-outline-danger" onClick={logout}>Logout</button>} */}
                        {auth?.email == null ? <Link to="/login" className="btn btn-outline-success">Login</Link> : <button className="btn btn-outline-danger" onClick={logout}>Logout</button>}
                    </div>

                </div>
            </div>
        </nav>
    );
}

export default Header;
