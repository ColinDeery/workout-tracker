const router = require('express').Router();
const { User, Workout } = require('../../models');
const withAuth = require('../../utils/withAuth');

// At /api/workout/, add user's new workout for given date
router.post('/', withAuth, async (req, res) => {
    console.log('\nReached /api/workout/ \n');
    req.body.user_id = req.session.userId;
    console.log(req.body);
    try {
        const workoutData = await Workout.create(req.body);
        res.status(200).json(workoutData);
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

// At /api/workout/:id, delete user's workout with same ID
router.delete('/:id', withAuth, async (req, res) => {
    try {
        const workoutData = await Workout.destroy({
            where: {
                id: req.params.id
            }
        });

        if (!workoutData) {
            res.status(404).json({ message: 'No workout found with this ID!'});
            return;
        }

        res.status(200).json(workoutData);
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

// At /api/workout/:id, update user's workout with same ID
router.put('/:id', withAuth, async (req, res) => {
    console.log('\n Reached /api/workout/:id');
    
    try {
        const workoutData = await Workout.update(
            req.body,
            {
                where: {
                    id: req.params.id
                }
            }
        );

        if (!workoutData) {
            res.status(404).json({ message: 'No workout found with this ID!'});
            return;
        }

        res.status(200).json(workoutData);
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

// At /api/workout/:date, return all of user's workouts for given date
router.get('/:date', withAuth, async (req, res) => {
    console.log('Reached /api/workout/:date');
    try {
        const workoutData = await Workout.findAll({
            where: {
                date: req.params.date,
                user_id: req.session.userId
            }
        });

        res.status(200).json(workoutData);
    } catch (err) {
        console.error(err);
        res.status(500).json();
    }
});

// At /api/workout/, return all of user's workouts (regardless of date)
router.get('/', withAuth, async (req, res) => {
    console.log('\nReached GET req at /api/workout/');
    try {
        const workoutData = await Workout.findAll({
            where: {
                user_id: req.session.userId
            }
        });

        res.status(200).json(workoutData);
    } catch (err) {
        console.error(err);
        res.status(500).json();
    }
});

module.exports = router;