import logo from './logo.svg';
import './App.css';
import { NavLink, Routes, Route, BrowserRouter as Router } from "react-router-dom";
import FrontPage from "./pages/FrontPage";
import FootballPage from "./pages/FootballPage";
import HockeyPage from "./pages/HockeyPage";
import TennisPage from "./pages/TennisPage";
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
        <Route path="/jalkapallo" element={<FootballPage/>}></Route>
        <Route path="/jaakiekko" element={<HockeyPage/>}></Route>
        <Route path="/tennis" element={<TennisPage/>}></Route>
        <Route path="/*" element={<NotFoundPage/>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
