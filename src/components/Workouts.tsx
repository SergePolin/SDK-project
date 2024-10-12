import React, { useEffect, useState } from "react";
import { Day, Workout, WorkoutType } from "../types";
// import { fetchDays, fetchWorkouts } from "../services/api";
import ProgressCircle from "./ProgressCircle";
import NewWorkout from "./NewWorkout";
import { fetchWorkouts } from "../services/api";
import "../styles/global.scss";

const Workouts: React.FC = () => {
  const [workouts, setWorkouts] = useState<WorkoutType[]>([]);
  const [isCreateWorkoutOpen, setIsWorkoutOpen] = useState<boolean>(false);

  useEffect(() => {
    fetchWorkouts().then((response) => setWorkouts(response.data));
  }, []);


  const activities = [
    { type: "Stretching", value: 20, color: "#FF6B6B" },
    { type: "Cardio", value: 30, color: "#4ECDC4" },
    { type: "Strength", value: 40, color: "#45B7D1" },
    { type: "Yoga", value: 15, color: "#FFA07A" },
  ];

  const totalHours = activities.reduce(
    (sum, activity) => sum + activity.value,
    0
  );

  return (
    <div className="div-verical-48">
        {!isCreateWorkoutOpen && <button></button> }
        
    </div>
    // <div className="reports">
    //   {/* <NewWorkout isInTraining={false}/> */}

      
    //   {activities.length > 0 && (
    //     <ProgressCircle
    //       activities={activities}
    //       total={totalHours}
    //       period="Monthly"
    //     />
    //   )}
    //   {/* Other report components */}
    // </div>
  );
};

export default Workouts;
