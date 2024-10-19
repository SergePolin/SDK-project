import React, { useEffect, useState } from "react";
import Calendar from "./Calendar";
import ProgressSection from "./ProgressSection";
import Stats from "./Stats";
import "../styles/dashboard.scss";
import "../styles/global.scss";
import { fetchDays, fetchTrainings, fetchWorkouts } from "../services/api";
import { useNavigate } from "react-router-dom";
import ActivitySection from "./ActivitySection";
import { CalendarEvent, StatsType, TrainingType, WorkoutType } from "../types";
import Training from "./Training";
import { AnimatePresence, motion } from "framer-motion";


function WorkoutList() {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [workouts, setWorkouts] = useState<TrainingType[]>([]);
  const [stats, setStats] = useState<StatsType[]>([
    { value: 0, label: "Workout's completed" },
    { value: 0, label: "Calories burned", unit: "kcal" },
  ]);
  const [openedTrainingDate, setOpenedTrainingDate] = useState<Date>();
  const navigate = useNavigate();

  function handleEventClick(day: Date){
    day.setHours(day.getHours() + 4);
    setOpenedTrainingDate(day);
    console.log(day);
  }

  function handleDateClick(day: Date) {
    navigate("/sdk/newTraining", { state: { dateProp: day } });
  }

  useEffect(() => {
    async function eventsFetch() {
      const response = await fetchDays();
      console.log(response);
      setEvents(
        response.data.map((event) => {
          return { date: event, type: "important" };
        })
      );
    }

    async function workoutsFetch() {
      const response = await fetchTrainings();
      setWorkouts(response.data);

      // calculate stats
      const caloriesBurned = response.data.reduce(
        (acc, curr) => acc + curr.calories,
        0
      );
      setStats([
        { value: response.data.length, label: "Workout's completed" },
        { value: caloriesBurned, label: "Calories burned", unit: "kcal" },
      ]);

      console.log(response);
    }

    eventsFetch();
    workoutsFetch();
  }, []);

  return (
    <div className="div-horizontal-20">
      <div className="div-vertical-20">
        <Calendar events={events} onDateClick={handleDateClick} onEventClick={handleEventClick}/>
        <button
          className="new-training-btn"
          onClick={() => navigate("/sdk/newTraining")}
        >
          New training session
        </button>
        <Stats items={stats} />
      </div>
      <AnimatePresence >
      {openedTrainingDate &&
        <motion.div
          initial={{ opacity: 0, width:0, overflow: "hidden"}}
          key="training-info"
          animate={{ opacity: 1, width: 'auto' }}
          exit={{ opacity: 0, width: 0, overflow: "hidden"}}
          transition={{ duration: 0.5 }}
          className="shadow motion-div">
          <Training date={openedTrainingDate} onClose={()=>{setOpenedTrainingDate(null)}}/>
        </motion.div>} 
      </AnimatePresence>
      <div className="div-vertical-20">
        <ProgressSection />
        <ActivitySection />
      </div>
    </div>
  );
}

export default WorkoutList;
