import { Dispatch, SetStateAction } from "react";

export interface Workout {
  id: string;
  name: string;
  exercises: Exercise[];
  duration: number; // in minutes
}

export interface Exercise {
  name: string;
  reps: number;
  sets: number;
}

export interface Day {
  date: string;
  workouts: string[]; // Array of Workout IDs
}

export interface Statistics {
  totalWorkouts: number;
  totalDuration: number;
  // Add more fields as needed
}

export interface tag{
  icon: any;
  title: string;
}

export interface exercise{
  title: string;
  repsOrDuration: number;
  isTimeBased: boolean;
  weight?: number;
}

export interface AddExerciseProps{
  setIsAddExerciseWindowOpen: Dispatch<React.SetStateAction<boolean>>;
  setExercises: Dispatch<SetStateAction<exercise[]>>;
}