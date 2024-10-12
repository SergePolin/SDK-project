import axios from "axios";
import { Workout, Day, Statistics, WorkoutType, TrainingType } from "../types";

const API_BASE = "/api";

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
