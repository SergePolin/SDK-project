const router = require('express').Router();
const { v4: uuidv4 } = require('uuid');

let workouts = [
    { id: uuidv4(), name: "Full Body Workout", exercises: [{ name: "Push-ups", reps: 10, sets: 3 }, { name: "Squats", reps: 15, sets: 3 }], duration: 45 },
    { id: uuidv4(), name: "Cardio Blast", exercises: [{ name: "Jumping Jacks", reps: 50, sets: 1 }, { name: "Mountain Climbers", reps: 30, sets: 2 }], duration: 30 },
];

let days = [
    { date: "2023-05-01", workouts: [workouts[0].id] },
    { date: "2023-05-02", workouts: [workouts[1].id] },
];

router.get('/workouts', (req, res) => {
    res.json(workouts);
});

router.post('/workouts', (req, res) => {
    const newWorkout = { ...req.body, id: uuidv4() };
    workouts.push(newWorkout);
    res.status(201).json(newWorkout);
});

router.get('/days', (req, res) => {
    res.json(days);
});

router.post('/days', (req, res) => {
    const newDay = req.body;
    days.push(newDay);
    res.status(201).json(newDay);
});

router.get('/statistics', (req, res) => {
    const totalWorkouts = days.reduce((sum, day) => sum + day.workouts.length, 0);
    const totalDuration = workouts.reduce((sum, workout) => sum + workout.duration, 0);
    res.json({ totalWorkouts, totalDuration });
});


module.exports = router;
