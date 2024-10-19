import React, { useEffect, useState } from "react";
import Calendar from "./Calendar";
import ProgressSection from "./ProgressSection";
import Stats from "./Stats";
import "../styles/dashboard.scss";
import "../styles/global.scss";
import {
  fetchDays,
  fetchTrainings,
  fetchWorkouts,
  fetchWorkoutById,
} from "../services/api";
import { useNavigate } from "react-router-dom";
import ActivitySection from "./ActivitySection";
import { CalendarEvent, StatsType, TrainingType, WorkoutType } from "../types";
import Training from "./Training";
import { AnimatePresence, motion } from "framer-motion";

interface Activity {
  type: string;
  value: number;
  color: string;
}

function WorkoutList() {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [workouts, setWorkouts] = useState<TrainingType[]>([]);
  const [stats, setStats] = useState<StatsType[]>([
    { value: 0, label: "Workout's completed" },
    { value: 0, label: "Calories burned", unit: "kcal" },
  ]);
  const [activityData, setActivityData] = useState<number[]>([]);
  const [openedTrainingDate, setOpenedTrainingDate] = useState<Date>();
  const [progressActivities, setProgressActivities] = useState<Activity[]>([]);
  const [totalWorkouts, setTotalWorkouts] = useState<number>(0);
  const navigate = useNavigate();

  function handleEventClick(day: Date) {
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

      // calculate activity data
      const activityData = response.data.map((training) => training.calories);
      setActivityData(activityData);

      // calculae progress data
      let totalHours = 0;
      const progressDataPromise = response.data.map(async (training) => {
        const workout = await fetchWorkoutById(training.workout, true);
        totalHours += training.hours;
        return {
          type: workout.data.title,
          value: training.hours,
          color: "#d94535",
        };
      });
      const progressData = await Promise.all(progressDataPromise);
      setProgressActivities(progressData);
      setTotalWorkouts(totalHours);
    }

    eventsFetch();
    workoutsFetch();
  }, []);

  return (
    <div className="div-horizontal-20">
      <div className="div-vertical-20">
        <Calendar
          events={events}
          onDateClick={handleDateClick}
          onEventClick={handleEventClick}
        />
        <button
          className="new-training-btn"
          onClick={() => navigate("/sdk/newTraining")}
        >
          New training session
        </button>
        <Stats items={stats} />
      </div>
      <AnimatePresence>
        {openedTrainingDate && (
          <motion.div
            initial={{ opacity: 0, width: 0, overflow: "hidden" }}
            key="training-info"
            animate={{ opacity: 1, width: "auto" }}
            exit={{ opacity: 0, width: 0, overflow: "hidden" }}
            transition={{ duration: 0.5 }}
            className="shadow motion-div"
          >
            <Training
              date={openedTrainingDate}
              onClose={() => {
                setOpenedTrainingDate(null);
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
      <div className="div-vertical-20">
        <ProgressSection
          activities={progressActivities}
          total={totalWorkouts}
        />
        <ActivitySection
          activityData={activityData}
          periods={["Monthly", "Weekly"]}
          selectedPeriod={"Monthly"}
          onPeriodChange={() => {}}
        />
      </div>
    </div>
  );
}

export default WorkoutList;
