import React, { useEffect, useState } from "react";
import Calendar from "./Calendar";
import ProgressSection from "./ProgressSection";
import Stats from "./Stats";
import "../styles/dashboard.scss";
import "../styles/global.scss";
import { fetchDays, fetchTrainings, fetchWorkouts } from "../services/api";
import { useNavigate } from "react-router-dom";
import ActivitySection from "./ActivitySection";
import { StatsType, TrainingType, WorkoutType } from "../types";
interface CalendarEvent {
  date: Date;
  type: "normal" | "important";
}

function WorkoutList() {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [workouts, setWorkouts] = useState<TrainingType[]>([]);
  const [stats, setStats] = useState<StatsType[]>([
    { value: 0, label: "Workout's completed" },
    { value: 0, label: "Calories burned", unit: "kcal" },
  ]);
  const navigate = useNavigate();

  function handleDayClick(day: Date) {
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
        <Calendar events={events} onDateClick={handleDayClick} />
        <button
          className="new-training-btn"
          onClick={() => navigate("/sdk/newTraining")}
        >
          New training session
        </button>
        <Stats items={stats} />
      </div>
      <div className="div-vertical-20">
        <ProgressSection />
        <ActivitySection />
      </div>
    </div>
  );
}

export default WorkoutList;
