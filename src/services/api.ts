import axios from "axios";
import { Workout, Day, Statistics } from "../types";

const API_BASE = "/api";

export const fetchWorkouts = () => axios.get<Workout[]>(`${API_BASE}/workouts`);
export const fetchStatistics = () =>
  axios.get<Statistics[]>(`${API_BASE}/statistics`);
export const createWorkout = (workout: Workout) =>
  axios.post(`${API_BASE}/workouts`, workout);
export const fetchDays = () => axios.get<Day[]>(`${API_BASE}/days`);
export const createDay = (day: Day) => axios.post(`${API_BASE}/days`, day);
