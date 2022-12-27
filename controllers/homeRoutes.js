const router = require('express').Router();
const { User, Workout } = require('../models');
// const withAuth = require('../utils/auth');

// router.get('/'), render login page
router.get('/', async (req, res) => {

});

// router.get('/calendar'), render calendar

// router.get('/day/id'), render day (id = date)
router.get('/day/:id', async (req, res) => {
    res.render("day")
});

module.exports = router;