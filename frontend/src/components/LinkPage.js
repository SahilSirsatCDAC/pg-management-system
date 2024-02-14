import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
const LinkPage = () => {
    const navigate = useNavigate();
    const { setAuth }= useAuth();
  const logout = () => {

    localStorage.clear()
    setAuth(null);
    navigate("/login");
  }
    return (
        <section>
            <h1>Links</h1>
            <br />
            <h2>Public</h2>
            <Link to="/login">Login</Link>
            <br/>
            <Link to="/register">Register</Link>
            <br />
            <h2>Private</h2>
            <Link to="/home">Home</Link>
            <br/>
            <Link to="/owner">Owner Page</Link>
            <br/>
            <Link to="/user">User Page</Link>
            <br />
            <button onClick={logout}>Logout</button>
            
        </section>
    )
}

export default LinkPage
