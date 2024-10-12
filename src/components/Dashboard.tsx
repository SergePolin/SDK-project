import React, { useEffect, useState } from "react";
import Calendar from "./Calendar";
import ProgressCircle from "./ProgressCircle";
import ActivitySection from "./ActivitySection";
import Stats from "./Stats";
import { fetchDays } from "../services/api";
import { useNavigate } from "react-router-dom";
import { CalendarEvent } from "../types";
import "../styles/Dashboard.scss";

function Dashboard() {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function eventsFetch() {
      try {
        const response = await fetchDays();
        setEvents(
          response.data.map((event) => ({ date: event, type: "important" }))
        );
      } catch (error) {
        console.error("Failed to fetch events:", error);
      }
    }

    eventsFetch();
  }, []);

  const handleDayClick = (day: Date) => {
    navigate("/sdk/newTraining", { state: { dateProp: day } });
  };

  return (
    <div className="dashboard">
      <div className="dashboard-left">
        <Calendar events={events} onDateClick={handleDayClick} />
        <button
          className="new-training-btn"
          onClick={() => navigate("/sdk/newTraining")}
        >
          New training session
        </button>
        <Stats
          items={[
            { value: 50, label: "Workouts completed" },
            { value: 15000, label: "Calories burned", unit: "kcal" },
          ]}
        />
      </div>
      <div className="dashboard-right">
        <ProgressCircle
          activities={[
            { type: "Stretching", value: 20, color: "#d94535" },
            { type: "Cardio", value: 30, color: "#d94535" },
            { type: "Strength", value: 40, color: "#d94535" },
            { type: "Yoga", value: 15, color: "#d94535" },
          ]}
          total={40}
          period={["Monthly", "Weekly"]}
        />
        <ActivitySection />
      </div>
    </div>
  );
}

export default Dashboard;
