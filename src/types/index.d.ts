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
