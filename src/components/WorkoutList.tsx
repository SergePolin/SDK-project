import React, { useEffect, useState } from "react";
import { Workout } from "../types";
import { fetchWorkouts, createWorkout } from "../services/api";
import { PageTitle, Card, Button, Input } from "../styles/shared";
import styled from "styled-components";

const WorkoutCard = styled(Card)`
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

const WorkoutList: React.FC = () => {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [newWorkout, setNewWorkout] = useState({ name: "", duration: 0 });

  useEffect(() => {
    fetchWorkouts().then((response) => setWorkouts(response.data));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const workout: Workout = {
      ...newWorkout,
      exercises: [],
      id: "",
    };
    const response = await createWorkout(workout);
    setWorkouts([...workouts, response.data]);
    setNewWorkout({ name: "", duration: 0 });
  };

  return (
    <div>
      <PageTitle>Custom Workouts</PageTitle>
      {workouts.map((workout) => (
        <WorkoutCard key={workout.id}>
          <h3>{workout.name}</h3>
          <p>{workout.duration} minutes</p>
        </WorkoutCard>
      ))}
      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="Workout name"
          value={newWorkout.name}
          onChange={(e) =>
            setNewWorkout({ ...newWorkout, name: e.target.value })
          }
        />
        <Input
          type="number"
          placeholder="Duration (minutes)"
          value={newWorkout.duration}
          onChange={(e) =>
            setNewWorkout({ ...newWorkout, duration: parseInt(e.target.value) })
          }
        />
        <Button type="submit">Add Workout</Button>
      </Form>
    </div>
  );
};

export default WorkoutList;
