const router = require('express').Router();
const { v4: uuidv4 } = require('uuid');

const workout1 = {
    id: uuidv4(),
    title: "Toned upper body",
    exercises: [
        { title: "Push ups", repsOrDuration: 12, isTimeBased: false },
        { title: "Plank", repsOrDuration: 4, isTimeBased: true },
        { title: "Bicep curl", repsOrDuration: 12, isTimeBased: false, weight: 5 }
    ],
    tags: [
        { icon: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDgiIGhl…uZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPgo8L3N2Zz4K', title: 'Weights' },
        { icon: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDgiIGhl…iIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPC9zdmc+Cg==', title: 'Arms' },
        { icon: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDgiIGhl…kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+Cjwvc3ZnPgo=', title: 'Abs' }
    ]
};

const workout2 = {
    id: uuidv4(),
    title: "Tom Platz's legs",
    exercises: [
        { title: "Squats", repsOrDuration: 12, isTimeBased: false, weight: 40 },
        { title: "Leg Press", repsOrDuration: 4, isTimeBased: false, weight: 65 },
        { title: "Lunges", repsOrDuration: 2, isTimeBased: true }
    ],
    tags: [
        { icon: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDgiIGhl…uZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPgo8L3N2Zz4K', title: 'Weights' },
        { icon: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDgiIGhl…iIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPC9zdmc+Cg==', title: 'Legs' }
    ]
};

const workout3 = {
    id: uuidv4(),
    title: "HIIT",
    excercises: [
        { title: "Jumping rope", repsOrDuration: 100, isTimeBased: false },
        { title: "Burpees", repsOrDuration: 3, isTimeBased: true },
        { title: "Jumping Jacks", repsOrDuration: 50, isTimeBased: false }
    ],
    tags: []
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

const trainings = [{ id: uuidv4(), calories: 450, date: new Date("Thu Oct 03 2024 10:05:24 GMT+0300 (Moscow Standard Time)"), hours: 1, minutes: 30, isWorkoutSaved: true, workout: workout1.id }];

const days = [
    new Date("Thu Oct 03 2024 10:05:24 GMT+0300 (Moscow Standard Time)"),

];

router.post('/training', (req, res) => {
    const newTraining = { ...req.body, id: uuidv4() };
    trainings.push(newTraining);
    days.push(newTraining.date);
    res.status(201).json(newTraining);
});

router.get('/trainings', (req, res) => {
    res.json(trainings);
});

router.get('/days', (req, res) => {
    res.json(days);
})


module.exports = router;
