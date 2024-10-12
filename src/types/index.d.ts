import { Dispatch, SetStateAction } from "react";

export interface Workout {
  id: string;
  name: string;
  exercises: Exercise[];
  duration: number;
}

export interface Exercise {
  name: string;
  reps: number;
  sets: number;
}

export interface Day {
  date: string;
  workouts: string[];
}

export interface Statistics {
  totalWorkouts: number;
  totalDuration: number;
}

export interface tag {
  icon: any;
  title: string;
}

export interface exercise {
  title: string;
  repsOrDuration: number;
  isTimeBased: boolean;
  weight?: number;
}

export interface WorkoutType {
  id: string;
  title: string;
  tags: string[];
  exercises: exercise[];
}

export interface TrainingType {
  id: string;
  date: Date;
  calories: number;
  hours: number;
  minutes: number;
  emoji: string;
  feelings: string;
  workout: string; //id
  isWorkoutSaved: boolean;
}

export interface StatsType {
  value: number;
  label: string;
  unit?: string;
}

export interface emojiType {
  src: string;
  title: string;
}

export interface AddExerciseProps {
  setIsAddExerciseWindowOpen: Dispatch<React.SetStateAction<boolean>>;
  setExercises: Dispatch<SetStateAction<exercise>>;
}

export interface CalendarEvent {
  date: Date;
  type: "normal" | "important";
}
