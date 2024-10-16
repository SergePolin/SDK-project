import React, { lazy, Suspense } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  NavLink,
} from "react-router-dom";

const WorkoutList = lazy(() => import("./components/WorkoutList"));
const NewTraining = lazy(() => import("./components/NewTraining"));
import "./styles/Nav.scss";
import "./styles/global.scss";
import Workouts from "./components/Workouts";

const App: React.FC = () => {
  return (
    <Router>
      <div className="app-container">
        <div className="nav-container">
          <div className="logo">SPORT DIGITAL KEEPER</div>
          <div className="nav-elements">
            <NavLink
              className={({ isActive }) =>
                isActive ? "nav-element active" : "nav-element"
              }
              to="/sdk"
              end
            >
              Dashboard
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                isActive ? "nav-element active" : "nav-element"
              }
              to="/sdk/newTraining"
            >
              New Training
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                isActive ? "nav-element active" : "nav-element"
              }
              to="/sdk/reports"
            >
              Workouts
            </NavLink>
          </div>
        </div>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/sdk/newTraining" element={<NewTraining />} />
            <Route path="/sdk/reports" element={<Workouts />} />
            <Route path="/sdk" element={<WorkoutList />} />
            <Route path="/" element={<WorkoutList />} />
          </Routes>
        </Suspense>
      </div>
    </Router>
  );
};

export default App;
