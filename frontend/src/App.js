import './App.css';
import { NavLink, Routes, Route, BrowserRouter as Router } from "react-router-dom";
import FrontPage from "./pages/FrontPage";
import SportPage from "./pages/SportPage";
import NotFoundPage from "./pages/NotFoundPage";
import { getAllFacilities, getAllSportTypes } from './api/bookingApi';
import { useEffect, useState } from 'react';
import FacilityPage from './pages/FacilityPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import UserInfoPage from './pages/UserInfoPage';
import { useUser } from './auth/useUser';
import LogoutPage from './pages/LogoutPage';
import { useToken } from './auth/useToken';

const App = () => {
  const user = useUser();
  const [token, setToken] = useToken();
  const [facilities, setFacilities] = useState([]);
  const [sportTypes, setSportTypes] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [sportTypesResponse, facilitiesResponse] = await Promise.all([
          getAllSportTypes(),
          getAllFacilities()
        ]);
  
        setSportTypes(sportTypesResponse);
        setFacilities(facilitiesResponse);
        setError(null);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchData();
  }, []);

  const onLogin = (token) => {
    setToken(token);
  }

  const onLogout = () => {
    localStorage.removeItem("token");
    setToken("");
  }

  return (
    <div className="pageContainer">
      <Router>
        <nav className="navBar">
          <NavLink className={"navLink"} to={"/"}>Etusivu</NavLink>
          {
            !loading && !error && sportTypes.map(type => (
              <NavLink key={type.id} className={"navLink"} to={`/${type.type}`}>{type.type}</NavLink>
            ))
            
          }
          {
            (user && token) ?
            <>
            <NavLink className={"navLink"} to={"/user"}>Omat varaukset</NavLink>
            <NavLink className={"navLink"} to={"/logout"}>Kirjaudu ulos</NavLink>
            </> :
            <>
            <NavLink className={"navLink"} to={"/signup"}>Rekisteröidy</NavLink>
            <NavLink className={"navLink"} to={"/login"}>Kirjaudu</NavLink>
            </>
          }
        </nav>

        <Routes>
          <Route path="/" element={<FrontPage />}></Route>
          {
            !loading && !error && sportTypes.map(type => (
              <Route path={"/" + type.type} element={<SportPage type={type.type} />}></Route>
            ))
          }
          {
            !loading && !error && facilities.map(facility => (
              <Route key={facility.id} path={`/kentät/${facility.name}`} element={<FacilityPage facility={facility} />}></Route>
            ))
          }
          <Route path="/login" element={<LoginPage onLogin={onLogin} />}></Route>
          <Route path="/signup" element={<SignupPage onLogin={onLogin} />}></Route>
          <Route path="/logout" element={<LogoutPage onLogout={onLogout} />}></Route>
          <Route path="/user" element={<UserInfoPage />}></Route>
          <Route path="/*" element={<NotFoundPage />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;