// import React, { useEffect, useState } from "react";
// import { Day, Workout } from "../types";
// // import { fetchDays, fetchWorkouts } from "../services/api";
// import ProgressCircle from "./ProgressCircle";
// import NewWorkout from "./NewWorkout";

// const Reports: React.FC = () => {
//   // const [days, setDays] = useState<Day[]>([]);
//   // const [workouts, setWorkouts] = useState<Workout[]>([]);

//   // useEffect(() => {
//   //   fetchDays().then((response) => setDays(response.data));
//   //   fetchWorkouts().then((response) => setWorkouts(response.data));
//   // }, []);

//   // const getWorkoutName = (id: string) => {
//   //   const workout = workouts.find((w) => w.id === id);
//   //   return workout ? workout.name : "Unknown workout";
//   // };

//   const activities = [
//     { type: "Stretching", value: 20, color: "#FF6B6B" },
//     { type: "Cardio", value: 30, color: "#4ECDC4" },
//     { type: "Strength", value: 40, color: "#45B7D1" },
//     { type: "Yoga", value: 15, color: "#FFA07A" },
//   ];

//   const totalHours = activities.reduce(
//     (sum, activity) => sum + activity.value,
//     0
//   );

//   return (
//     <div className="reports">
//       {/* <NewWorkout isInTraining={false}/> */}
//       {activities.length > 0 && (
//         <ProgressCircle
//           activities={activities}
//           total={totalHours}
//           period="Monthly"
//         />
//       )}
//       {/* Other report components */}
//     </div>
//   );
// };

// export default Reports;
