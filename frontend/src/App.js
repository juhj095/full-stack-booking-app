import logo from './logo.svg';
import './App.css';
import { NavLink, Routes, Route, BrowserRouter as Router } from "react-router-dom";
import FrontPage from "./pages/FrontPage";
import FacilityPage from "./pages/FacilityPage";
import NotFoundPage from "./pages/NotFoundPage";

const App = () => {
  return (
    <Router>
      <nav>
        <NavLink to={"/"}>Etusivu</NavLink>
        <NavLink to={"/jalkapallo"}>Jalkapallo</NavLink>
        <NavLink to={"/jaakiekko"}>Jääkiekko</NavLink>
        <NavLink to={"/tennis"}>Tennis</NavLink>
      </nav>

      <Routes>
        <Route path="/" element={<FrontPage/>}></Route>
        <Route path="/jalkapallo" element={<FacilityPage type="Jalkapallo"/>}></Route>
        <Route path="/jaakiekko" element={<FacilityPage type="Jääkiekko"/>}></Route>
        <Route path="/tennis" element={<FacilityPage type="Tennis"/>}></Route>
        <Route path="/*" element={<NotFoundPage/>}></Route>
      </Routes>
    </Router>
  );
}

export default App;