import Register from './components/Register';
import Login from './components/Login';
import Home from './components/Home';
import Layout from './components/Layout';
import Missing from './components/Missing';
import Unauthorized from './components/Unauthorized';
import RequireAuth from './components/RequireAuth';
import { Routes, Route } from 'react-router-dom';
import User from './components/User';
import Owner from './components/Owner';
import Logout from './components/Logout';
import Admin from './components/Admin'
import Building from './components/Building';
import Room from './components/Room';
import Book from './components/Book';
import Test from './components/Test';
import Header from './components/Header'
import useAuth from './hooks/useAuth';
import axios from './api/axios';
import { useEffect } from 'react';
import Nrooms from './components/Nrooms';
import Nbeds from './components/Nbeds';
import AddBuilding from './components/AddBuilding';
import OwnerDetails from './components/OwnerDetails';
import UpdateProfile from './components/UpdateProfile';
import UploadImage from './components/UploadImage';
import AddBed from './components/AddBed';
import AddRoom from './components/AddRoom';
import UserBookings from './components/UserBookings';
import BedBookings from './components/BedBookings';
import AdminAllBookings from './components/AdminAllBookings';
import ResetPassword from './components/ResetPassword';
import Footer from './components/Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitterSquare, faFacebook, faGoogle } from "@fortawesome/free-brands-svg-icons";
import { faUserLock, faLock, faLockOpen, faComment } from '@fortawesome/free-solid-svg-icons';

const ROLES = {
  'user': 'ROLE_USER',
  'owner': 'ROLE_OWNER',
  'admin': 'ROLE_ADMIN'
}

function App() {
  const setAuth = useAuth()
  useEffect(() => {
    console.log(setAuth);
    const { token } = setAuth.accessToken || "no token";
    console.log(token);
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
  }, [])
  return (
    <div style={{
      "position": "relative",
      "minHeight": "100vh"
    }}>
      <div >
        <Header />
        <div>
        <Routes>
          <Route path="/" element={<Layout />}>
            {/* public routes */}
            <Route path="/home" element={<Home />} />
            <Route path="/reset_password" element={<ResetPassword />} />
            <Route path="/building/:buildingId" element={<Building />} />
            <Route path="/room/:roomId" element={<Room />} />

            <Route path="/" element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="unauthorized" element={<Unauthorized />} />
            <Route path="logout" element={<Logout />} />





            {/* we want to protect these routes */}
            <Route element={<RequireAuth allowedRoles={[ROLES.user]} />}>
              <Route path="/user" element={<User />} />
              <Route path="/test" element={<Test />} />
              <Route path="/book/:bedId" element={<Book />} />
              <Route path="/profile" element={<UpdateProfile />} />
              <Route path="/image/:component/:componentId" element={<UploadImage />} />
              <Route path="/user/bookings" element={<UserBookings />} />
            </Route>

            <Route element={<RequireAuth allowedRoles={[ROLES.admin]} />}>
              <Route path="/admin" element={<Admin />} />
              <Route path="/admin/bookings" element={<AdminAllBookings />} />
            </Route>

            <Route element={<RequireAuth allowedRoles={[ROLES.owner]} />}>
              <Route path="/owner" element={<Owner />} />
              <Route path="/owner/room/:buildingId" element={<Nrooms />} />
              <Route path="/owner/building/add" element={<AddBuilding />} />
              <Route path="/owner/details" element={<OwnerDetails />} />
              <Route path="/owner/building/:buildingId/addroom" element={<AddRoom />} />
              <Route path="/owner/room/bed/:roomId" element={<Nbeds></Nbeds>} />
              <Route path="/user" element={<User />} />
              <Route path="/owner/room/:roomId/addbed" element={<AddBed />} />
              <Route path="/owner/room/bed/bookings/:bedId" element={<BedBookings />} />
            </Route>

            {/* catch all */}
            <Route path="*" element={<Missing />} />
          </Route>
        </Routes>
        </div>

        <div style={{ "position": "fixed", "bottom": "105px", "right": "5px","zIndex":"1" }}>
          <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
            {/* <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/e/e2/Echo_chat_icon.svg/1024px-Echo_chat_icon.svg.png' alt='not available' style={{ "height": "50px", "width": "100px" }} /> */}
            <FontAwesomeIcon icon={faComment} /> Chat
          </button>
        </div>

        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">This feature will be available soon ...</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id="footer">
      <Footer/>
      </div>
    </div>
  );
}

export default App;