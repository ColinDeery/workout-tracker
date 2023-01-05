const router = require('express').Router();
const { User, Workout } = require('../models');
const withAuth = require('../utils/withAuth');
const findUsername = require('../utils/findUsername');

router.get('/', async (req, res) => {
    res.redirect('/login');
});

// Render login form
router.get('/login', (req, res) => {
    // If already logged in, redirect user to calendar
    if (req.session.loggedIn) {
        res.redirect('/calendar');
        return;
    } 
    // If not logged in, render login form on welcome template
    res.render('welcome', {
        signup: false
    });
});

// Render signup form
router.get('/signup', (req, res) => {
    // If already logged in, redirect user to calendar 
    if (req.session.loggedIn) {
        res.redirect('/calendar');
        return;
    } 
    // If not logged in, render signup form on welcome template
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

// Render user's monthly calendar
router.get('/calendar', withAuth, async (req, res) => {
    const loggedInUsername = await findUsername(req);

    res.render('calendar', {
        username: loggedInUsername
    });
});

// Render day view with all of user's workout info for that day
router.get('/calendar/day/:date', withAuth, async (req, res) => {
    try {
        const workoutData = await Workout.findAll({
            where: {
                date: req.params.date,
                user_id: req.session.userId
            }
        });

        const workouts = workoutData.map((workout => workout.get({ plain: true })));
        const loggedInUsername = await findUsername(req);

        // All of user's workouts (regardless of date)
        const allWorkouts = await Workout.findAll({
            where: {
                user_id: req.session.userId
            }
        });
        const plainWorkouts = allWorkouts.map((workout => workout.get({ plain: true })));

        console.log(plainWorkouts);

        const sortedWorkouts = plainWorkouts.slice().sort((a, b) => new Date(b.date) - new Date(a.date));
        console.log(sortedWorkouts);

        let prevCompletedWorkout;
        for (let i = 0; i < sortedWorkouts.length; i++) {
            if (sortedWorkouts[i].completed) {
                console.log('\nMost recent completed workout:');
                console.log(sortedWorkouts[i]);

                prevCompletedWorkout = sortedWorkouts[i];
                break;
            }
        }

        res.render('day', { 
            workouts,
            date: req.params.date,
            username: loggedInUsername,
            prevWorkout: prevCompletedWorkout
        });
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

// Show form to add new workout
router.get('/calendar/day/:date/workout', withAuth, async (req, res) => {
    const loggedInUsername = await findUsername(req);

    res.render('day', {
        addWorkout: req.query.addWorkout,
        date: req.params.date,
        username: loggedInUsername
    });
});

// Show form to edit the workout with same ID
router.get('/calendar/day/:date/workout/:id', withAuth, async (req, res) => {
    try {
        const workoutData = await Workout.findByPk(req.params.id);

        const workout = workoutData.get({ plain: true });
        const loggedInUsername = await findUsername(req);

        res.render('day', {
            workout,
            updateWorkout: req.query.updateWorkout,
            date: req.params.date,
            username: loggedInUsername
        });
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

module.exports = router;