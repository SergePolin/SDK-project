import React, { useEffect, useState } from "react";
import { Day, Workout } from "../types";
import { fetchDays, fetchWorkouts } from "../services/api";
import { PageTitle, Card } from "../styles/shared";
import styled from "styled-components";

const ReportCard = styled(Card)`
  h3 {
    color: #4a90e2;
    margin-bottom: 10px;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    margin-bottom: 5px;
  }

  @media (max-width: 768px) {
    h3 {
      font-size: 1.2rem;
    }

    li {
      font-size: 0.9rem;
    }
  }
`;

const Reports: React.FC = () => {
  const [days, setDays] = useState<Day[]>([]);
  const [workouts, setWorkouts] = useState<Workout[]>([]);

  useEffect(() => {
    fetchDays().then((response) => setDays(response.data));
    fetchWorkouts().then((response) => setWorkouts(response.data));
  }, []);

  const getWorkoutName = (id: string) => {
    const workout = workouts.find((w) => w.id === id);
    return workout ? workout.name : "Unknown workout";
  };

  return (
    <div>
      <PageTitle>Workout Reports</PageTitle>
      {days.map((day) => (
        <ReportCard key={day.date}>
          <h3>{day.date}</h3>
          <ul>
            {day.workouts.map((workoutId) => (
              <li key={workoutId}>{getWorkoutName(workoutId)}</li>
            ))}
          </ul>
        </ReportCard>
      ))}
    </div>
  );
};

export default Reports;
