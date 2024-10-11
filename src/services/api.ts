import axios from "axios";
import { Workout, Day, Statistics, WorkoutType, TrainingType } from "../types";

const API_BASE = "/api";

// export const fetchWorkouts = () => axios.get<Workout[]>(`${API_BASE}/workouts`);
// export const fetchStatistics = () =>
//   axios.get<Statistics[]>(`${API_BASE}/statistics`);
// export const createWorkout = (workout: Workout) =>
//   axios.post(`${API_BASE}/workouts`, workout);
// export const fetchDays = () => axios.get<Day[]>(`${API_BASE}/days`);
// export const createDay = (day: Day) => axios.post(`${API_BASE}/days`, day);


export const postSavedWorkout = (workout: WorkoutType) => axios.post(`${API_BASE}/workout`, workout);
export const postCustomWorkout = (workout: WorkoutType) => axios.post(`${API_BASE}/training/workout`, workout);
export const postTraining = (training: TrainingType) => axios.post(`${API_BASE}/training`, training);
export const fetchWorkouts = () => axios.get<WorkoutType[]>(`${API_BASE}/workouts`);
export const fetchDays = () => axios.get<Date[]>(`${API_BASE}/days`);