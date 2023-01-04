const router = require('express').Router();
const { User, Workout } = require('../models');
// const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
    // If already logged in, redirect user to /calendar
    // if (req.session.loggedIn) {
    //     res.redirect('/calendar');
    //     return;
    // } 
    // If not logged in, redirect user to /login
    res.redirect('/login');
})

// Render login form
router.get('/login', (req, res) => {
    // If already logged in, redirect user to calendar
    // if (req.session.loggedIn) {
    //     res.redirect('/calendar');
    //     return;
    // } 
    // If not logged in, render login page
    res.render('welcome', {
        signup: false
    });
});

// Sign up route
router.get('/signup', (req, res) => {
    // If already logged in, redirect user to calendar 
    // if (req.session.loggedIn) {
    //     res.redirect('/calendar');
    //     return;
    // } 
    // If not logged in, render signup page
    res.render('welcome', {
        signup: true
    });
});

router.get('/calendar', async (req, res) => {
    res.render('calendar');
});

// Render day view with all workout info for that day
router.get('/calendar/day/:date', async (req, res) => {
    try {
        const workoutData = await Workout.findAll({
            where: {
                date: req.params.date
            }
        });

        const workouts = workoutData.map((workout => workout.get({ plain: true })));

        res.render('day', { 
            workouts,
            date: req.params.date
        });
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

// router.get('/day/:id', async (req, res) => {
//     res.render('day')
// });

router.get('/calendar/day/:date/workout', async (req, res) => {
    res.render('day', {
        addWorkout: req.query.addWorkout,
        date: req.params.date
    });
});

// Show form to edit workout
router.get('/calendar/day/:date/workout/:id', async (req, res) => {
    try {
        const workoutData = await Workout.findByPk(req.params.id);

        console.log(workoutData);

        const workout = workoutData.get({ plain: true });

        res.render('day', {
            workout,
            updateWorkout: req.query.updateWorkout,
            date: req.params.date
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;