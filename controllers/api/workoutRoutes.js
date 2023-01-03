const router = require('express').Router();
const { User, Workout } = require('../../models');
// // Custom middleware to check whether user is logged in or not
// const withAuth = require('../utils/withAuth');

// At /api/workout/, add new workout for given date
router.post('/', async (req, res) => {
    console.log('\nReached /api/workout/ \n');
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
router.delete('/:id', async (req, res) => {
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
router.put('/:id', async (req, res) => {
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

router.get('/:date', async (req, res) => {
    console.log('Reached /api/workout/:date');
    try {
        const workoutData = await Workout.findAll({
            where: {
                date: req.params.date
            }
        });

        res.status(200).json(workoutData);
    } catch (err) {
        console.error(err);
        res.status(500).json();
    }
});

module.exports = router;