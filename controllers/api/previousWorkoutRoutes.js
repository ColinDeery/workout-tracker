const router = require('express').Router();
const { User, Workout } = require('../../models');

// At /api/:date, adds previous workout data from most recent completed workout
router.post('/', async (req, res) => {
    try {
      const previousWorkout = await Workout.create({
        ...req.body,
        user_id: req.session.user_id,
      });
      console.log("PING");
      console.log(req.body);
      console.log("PING");
      res.status(200).json(previousWorkout);

    } catch (err) {
      res.status(400).json(err);
      console.log("NOT WORKING");
    }
  });
  
 
  
  module.exports = router;
  