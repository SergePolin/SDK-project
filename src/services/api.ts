import axios from "axios";
import { Workout, Day, Statistics, WorkoutType, TrainingType } from "../types";

import { getConfigValue } from "@brojs/cli";

const API_BASE = getConfigValue("sdk.api");

export const postSavedWorkout = (workout: WorkoutType) =>
  axios.post(`${API_BASE}/workout`, workout);

export const postCustomWorkout = (workout: WorkoutType) =>
  axios.post(`${API_BASE}/training/workout`, workout);

export const postTraining = (training: TrainingType) =>
  axios.post(`${API_BASE}/training`, training);

export const fetchWorkouts = () =>
  axios.get<WorkoutType[]>(`${API_BASE}/workouts`);

export const fetchTrainings = () =>
  axios.get<TrainingType[]>(`${API_BASE}/trainings`);

export const fetchDays = () => axios.get<Date[]>(`${API_BASE}/days`);

export const fetchTrainingByDate = (date: Date) => {
  return axios.get<TrainingType>(`${API_BASE}/training`, {
    params: { date: date },
  });
};

export const fetchWorkoutById = (id: string, isWorkoutSaved: boolean) => {
  if (isWorkoutSaved) {
    return axios.get<WorkoutType>(`${API_BASE}/workout`, { params: { id } });
  }
  return axios.get<WorkoutType>(`${API_BASE}/training/workout`, {
    params: { id },
  });
};
