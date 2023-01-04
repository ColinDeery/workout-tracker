const router = require('express').Router();

const userRoutes = require('./userRoutes');
const workoutRoutes = require('./workoutRoutes');
const previousWorkoutRoutes = require('./previousWorkoutRoutes');

router.use('/users', userRoutes);
router.use('/workout', workoutRoutes);
router.use('/:date', previousWorkoutRoutes);

module.exports = router;