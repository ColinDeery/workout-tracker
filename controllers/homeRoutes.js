const router = require('express').Router();
const { User, Workout } = require('../models');
const withAuth = require('../utils/withAuth');
const findUsername = require('../utils/findUsername');

router.get('/', async (req, res) => {
    res.redirect('/login');
})

// Render login form
router.get('/login', (req, res) => {
    // If already logged in, redirect user to calendar
    if (req.session.loggedIn) {
        res.redirect('/calendar');
        return;
    } 
    // If not logged in, render login page
    res.render('welcome', {
        signup: false
    });
});

// Sign up route
router.get('/signup', (req, res) => {
    // If already logged in, redirect user to calendar 
    if (req.session.loggedIn) {
        res.redirect('/calendar');
        return;
    } 
    // If not logged in, render signup page
    res.render('welcome', {
        signup: true
    });
});

// Log out
router.get('/logout', withAuth, (req, res) => {
    // If already logged in, destroy session, redirect user to welcome page
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.redirect('/');
        });
    } else {
        res.status(404).end();
    }
});

router.get('/calendar', withAuth, async (req, res) => {
    const loggedInUsername = await findUsername(req);

    res.render('calendar', {
        username: loggedInUsername
    });
});

// Render day view with all workout info for that day
router.get('/calendar/day/:date', withAuth, async (req, res) => {
    try {
        const workoutData = await Workout.findAll({
            where: {
                date: req.params.date
            }
        });

        const workouts = workoutData.map((workout => workout.get({ plain: true })));
        const loggedInUsername = await findUsername(req);

        res.render('day', { 
            workouts,
            date: req.params.date,
            username: loggedInUsername
        });
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

router.get('/calendar/day/:date/workout', withAuth, async (req, res) => {
    const loggedInUsername = await findUsername(req);

    res.render('day', {
        addWorkout: req.query.addWorkout,
        date: req.params.date,
        username: loggedInUsername
    });
});

// Show form to edit workout
router.get('/calendar/day/:date/workout/:id', withAuth, async (req, res) => {
    try {
        const workoutData = await Workout.findByPk(req.params.id);

        console.log(workoutData);

        const workout = workoutData.get({ plain: true });
        const loggedInUsername = await findUsername(req);

        res.render('day', {
            workout,
            updateWorkout: req.query.updateWorkout,
            date: req.params.date,
            username: loggedInUsername
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;