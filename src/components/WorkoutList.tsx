import React, { useEffect, useState } from "react";
import Calendar from "./Calendar";
import ProgressCircle from "./ProgressCircle";
import ActivityChart from "./ActivityChart";
import Stats from "./Stats";
import "../styles/dashboard.scss";
import "../styles/global.scss";
import { fetchDays } from "../services/api";
import { useNavigate } from "react-router-dom";

interface CalendarEvent {
  date: Date;
  type: "normal" | "important";
}


function WorkoutList() {
  const activityData = [32, 20, 25, 15, 28, 22, 26];
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const navigate = useNavigate();

  function handleDayClick(day: Date){
    console.log("date:", day);
    navigate("/sdk/newTraining", {state: {dateProp: day}});
  }

  useEffect(() => {
    async function eventsFetch() {
      const response = await fetchDays();
      console.log(response);
      setEvents(response.data.map((event) => {return {date: event, type: "important"}}));
    }

    eventsFetch();
  }, []);

  return (
    <div className="div-horizontal-20">
      <div className="div-vertical-20">
        <Calendar events={events} onDateClick={handleDayClick}/>
        <button className="new-training-btn">New training session</button>
        <Stats
          items={[
            { value: 50, label: "Workouts completed" },
            { value: 15000, label: "Calories burned", unit: "kcal" },
          ]}
        />
      </div>
      <div className="div-vertical-20">
        <div className="progress-circles">
          <ProgressCircle
            activities={[
              { type: "Stretching", value: 20, color: "#d94535" },
              { type: "Cardio", value: 30, color: "#d94535" },
              { type: "Strength", value: 40, color: "#d94535" },
              { type: "Yoga", value: 15, color: "#d94535" },
            ]}
            total={40}
            period="Monthly"
          />
        </div>
        <div className="activity-section">
          <div className="activity-header">
            <h2>Activity</h2>
            <select>
              <option>Monthly</option>
              <option>Weekly</option>
            </select>
          </div>
          <ActivityChart data={activityData} />
          <div className="weekdays">
            <span>M</span>
            <span>T</span>
            <span>W</span>
            <span>T</span>
            <span>F</span>
            <span>S</span>
            <span>S</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WorkoutList;
