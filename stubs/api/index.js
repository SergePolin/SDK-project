const router = require('express').Router();
const { v4: uuidv4 } = require('uuid');

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
        { title: "Squats", repsOrDuration: 12, isTimeBased: false, weight: 40 },
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

const trainings = [{ id: uuidv4(), calories: 450, date: new Date("Thu Oct 03 2024 10:05:24 GMT+0300 (Moscow Standard Time)"), emoji: "fuzzy", hours: 1, minutes: 30, isWorkoutSaved: true, workout: workout1.id }];

const days = [
    new Date("Thu Oct 03 2024 10:05:24 GMT+0300 (Moscow Standard Time)"),

];

router.post('/training', (req, res) => {
    const newTraining = { ...req.body, id: uuidv4() };
    trainings.push(newTraining);
    days.push(newTraining.date);
    res.status(201).json(newTraining);
});

router.get('/training', (req, res) => {
    const { date } = req.query;
    if (!date) {
        return res.status(400).json({ message: 'Date query parameter is required' });
    }
    const formattedDate = new Date(date);
    const result = trainings.find(t => new Date(t.date).toDateString() === formattedDate.toDateString());
    if (result) {
        res.json(result);
    } else {
        res.status(404).json({ message: 'Training not found for the specified date' });
    }
});

router.get('/training/workout', (req, res) => {
    const { id } = req.query;
    if (!id) {
        return res.status(400).json({ message: 'Id query parameter is required' });
    }
    const result = trainingWorkouts.find(w => w.id === id);
    if (result) {
        res.json(result);
    } else {
        res.status(404).json({ message: 'Training with such workout not found' });
    }
});

router.get('/workout', (req, res) => {
    const { id } = req.query;
    if (!id) {
        return res.status(400).json({ message: 'Id query parameter is required' });
    }
    const result = savedWorkouts.find(w => w.id === id);
    if (result) {
        res.json(result);
    } else {
        res.status(404).json({ message: 'Workout not found' });
    }
});

router.get('/trainings', (req, res) => {
    res.json(trainings);
});

router.get('/days', (req, res) => {
    res.json(days);
})


module.exports = router;
