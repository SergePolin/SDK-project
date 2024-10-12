const router = require('express').Router();
const { v4: uuidv4 } = require('uuid');

// let workouts = [
//     { id: uuidv4(), name: "Full Body Workout", exercises: [{ name: "Push-ups", reps: 10, sets: 3 }, { name: "Squats", reps: 15, sets: 3 }], duration: 45 },
//     { id: uuidv4(), name: "Cardio Blast", exercises: [{ name: "Jumping Jacks", reps: 50, sets: 1 }, { name: "Mountain Climbers", reps: 30, sets: 2 }], duration: 30 },
// ];

// let days = [
//     { date: "2023-05-01", workouts: [workouts[0].id] },
//     { date: "2023-05-02", workouts: [workouts[1].id] },
// ];

// router.get('/workouts', (req, res) => {
//     res.json(workouts);
// });

// router.post('/workouts', (req, res) => {
//     const newWorkout = { ...req.body, id: uuidv4() };
//     workouts.push(newWorkout);
//     res.status(201).json(newWorkout);
// });

// router.get('/days', (req, res) => {
//     res.json(days);
// });

// router.post('/days', (req, res) => {
//     const newDay = req.body;
//     days.push(newDay);
//     res.status(201).json(newDay);
// });

// router.get('/statistics', (req, res) => {
//     const totalWorkouts = days.reduce((sum, day) => sum + day.workouts.length, 0);
//     const totalDuration = workouts.reduce((sum, workout) => sum + workout.duration, 0);
//     res.json({ totalWorkouts, totalDuration });
// });

const workout1 = {
    id: uuidv4(),
    title: "Toned upper body",
    exercises: [
        { title: "Push ups", repsOrDuration: 12, isTimeBased: false },
        { title: "Plank", repsOrDuration: 4, isTimeBased: true },
        { title: "Bicep curl", repsOrDuration: 12, isTimeBased: false, weight: 5 },
        { title: "Bicep curl", repsOrDuration: 12, isTimeBased: false, weight: 5 },
        { title: "Bicep curl", repsOrDuration: 12, isTimeBased: false, weight: 5 },
        { title: "Bicep curl", repsOrDuration: 12, isTimeBased: false, weight: 5 },
    ],
    tags: ['Weights', 'Arms', 'Abs', 'Chest', 'Back']
};

const workout2 = {
    id: uuidv4(),
    title: "Tom Platz's legs",
    exercises: [
        { title: "Squats", repsOrDuration: 12, isTimeBased: false, weight: 40},
        { title: "Leg Press", repsOrDuration: 4, isTimeBased: false, weight: 65 },
        { title: "Lunges", repsOrDuration: 2, isTimeBased: true }
    ],
    tags: ['Weights', 'Legs']
};

const workout3 = {
    id: uuidv4(),
    title: "HIIT",
    exercises: [
        {title: "Jumping rope", repsOrDuration: 100, isTimeBased: false},
        {title: "Burpees", repsOrDuration: 3, isTimeBased: true},
        {title: "Jumping Jacks", repsOrDuration: 50, isTimeBased: false}
    ],
    tags: ['Cardio']
}

const savedWorkouts = [workout1, workout3];

const trainingWorkouts = [workout2];

router.post('/workout', (req, res) => {
    const newWorkout = { ...req.body, id: uuidv4() };
    savedWorkouts.push(newWorkout);
    res.status(201).json(newWorkout);
});

router.get('/workouts', (req, res) => {
    res.json(savedWorkouts);
});

router.post('/training/workout', (req, res) => {
    const newWorkout = { ...req.body, id: uuidv4() };
    trainingWorkouts.push(newWorkout);
    res.status(201).json(newWorkout);
});

const trainings = [{id: uuidv4(), calories : 450, date: new Date("Thu Oct 03 2024 10:05:24 GMT+0300 (Moscow Standard Time)"), hours: 1, minutes: 30, isWorkoutSaved: true, workout: workout1.id}];

const days = [new Date("Thu Oct 03 2024 10:05:24 GMT+0300 (Moscow Standard Time)")];

router.post('/training', (req, res) => {
    const newTraining = { ...req.body, id: uuidv4() };
    trainings.push(newTraining);
    days.push(newTraining.date);
    res.status(201).json(newTraining);
});

router.get('/days', (req, res) =>{
    res.json(days);
})


module.exports = router;
