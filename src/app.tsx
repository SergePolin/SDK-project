import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import WorkoutList from "./components/WorkoutList";
import DayPlanner from "./components/DayPlanner";
import Reports from "./components/Reports";
import Statistics from "./components/Statistics";
import { AppContainer, NavBar, NavLink, ContentArea } from "./styles/shared";

const App: React.FC = () => {
  return (
    // <Router>
    //   <AppContainer>
    //     <NavBar>
    //       <NavLink to="/workouts">Workouts</NavLink>
    //       <NavLink to="/planner">Planner</NavLink>
    //       <NavLink to="/reports">Reports</NavLink>
    //       <NavLink to="/statistics">Statistics</NavLink>
    //     </NavBar>
    //     <ContentArea>
    //       <Routes>
    //         <Route path="/workouts" element={<WorkoutList />} />
    //         <Route path="/planner" element={<DayPlanner />} />
    //         <Route path="/reports" element={<Reports />} />
    //         <Route path="/statistics" element={<Statistics />} />
    //         <Route path="/sdk" element={<WorkoutList />} />
    //       </Routes>
    //     </ContentArea>
    //   </AppContainer>
    // </Router>
    <div>
      <h1>Hello World</h1>
    </div>
  );
};

export default App;
