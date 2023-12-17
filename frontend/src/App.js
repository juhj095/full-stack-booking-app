import logo from './logo.svg';
import './App.css';
import { NavLink, Routes, Route, BrowserRouter as Router } from "react-router-dom";
import FrontPage from "./pages/FrontPage";
import SportPage from "./pages/SportPage";
import NotFoundPage from "./pages/NotFoundPage";
import { getAllFacilities } from './api/bookingApi';
import { useEffect, useState } from 'react';
import FacilityPage from './pages/FacilityPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';

const App = () => {
  const [facilities, setFacilities] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await getAllFacilities();
            setFacilities(response);
        } catch (error) {
            console.error("Error fetching facilities:", error);
        }
    };
    fetchData();
}, []);

  return (
    <Router>
      <nav>
        <NavLink to={"/"}>Etusivu</NavLink>
        <NavLink to={"/jalkapallo"}>Jalkapallo</NavLink>
        <NavLink to={"/jaakiekko"}>Jääkiekko</NavLink>
        <NavLink to={"/tennis"}>Tennis</NavLink>
      </nav>

      <Routes>
        <Route path="/" element={<FrontPage />}></Route>
        <Route path="/jalkapallo" element={<SportPage type="Jalkapallo" />}></Route>
        <Route path="/jaakiekko" element={<SportPage type="Jääkiekko" />}></Route>
        <Route path="/tennis" element={<SportPage type="Tennis" />}></Route>
        {
          facilities.map(facility => (
            <Route key={facility.id} path={`/kentät/${facility.name}`} element={<FacilityPage facility={facility} />}></Route>
          ))
        }
        <Route path="login" element={<LoginPage />}></Route>
        <Route path="signup" element={<SignupPage />}></Route>
        <Route path="/*" element={<NotFoundPage />}></Route>
      </Routes>
    </Router>
  );
}

export default App;