import React, { useEffect, useState } from "react";
import { Day, Workout } from "../types";
import { fetchDays, fetchWorkouts, createDay } from "../services/api";
import { PageTitle, Card, Button, Input, Select } from "../styles/shared";
import styled from "styled-components";

const DayCard = styled(Card)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-top: 30px;
`;

const DayPlanner: React.FC = () => {
  const [days, setDays] = useState<Day[]>([]);
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [newDay, setNewDay] = useState({ date: "", workouts: [] });

  useEffect(() => {
    fetchDays().then((response) => setDays(response.data));
    fetchWorkouts().then((response) => setWorkouts(response.data));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await createDay(newDay);
    setDays([...days, response.data]);
    setNewDay({ date: "", workouts: [] });
  };

  return (
    <div>
      <PageTitle>Day Planner</PageTitle>
      {days.map((day) => (
        <DayCard key={day.date}>
          <h3>{day.date}</h3>
          <p>Workouts: {day.workouts.join(", ")}</p>
        </DayCard>
      ))}
      <Form onSubmit={handleSubmit}>
        <Input
          type="date"
          value={newDay.date}
          onChange={(e) => setNewDay({ ...newDay, date: e.target.value })}
        />
        <Select
          multiple
          value={newDay.workouts}
          onChange={(e) =>
            setNewDay({
              ...newDay,
              workouts: Array.from(
                e.target.selectedOptions,
                (option) => option.value
              ),
            })
          }
        >
          {workouts.map((workout) => (
            <option key={workout.id} value={workout.id}>
              {workout.name}
            </option>
          ))}
        </Select>
        <Button type="submit">Add Day</Button>
      </Form>
    </div>
  );
};

export default DayPlanner;
