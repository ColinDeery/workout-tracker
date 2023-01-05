const router = require('express').Router();
const { User } = require('../../models');

// Login existing user
router.post('/login', async (req, res) => {
    try {
        // Find User with same username provided
        const dbUserData = await User.findOne({
            where: {
                username: req.body.username
            }
        });

        // If no user found with provided username
        if (!dbUserData) {
            res.status(404).json({ message: 'Incorrect username or password. Please try again!' });
            return;
        }

        // If user found with username, check provided password against user's encrypted password
        const validPassword = await dbUserData.checkPassword(req.body.password);

        // If password is not the same as saved password in db
        if (!validPassword) {
            res.status(404).json({ message: 'Incorrect username or password. Please try again!' });
            return;
        }

        // If password correct, set loggedIn to true
        req.session.save(() => {
            req.session.loggedIn = true;
            req.session.userId = dbUserData.id;
            res.status(200).json({ user: dbUserData, message: 'Successfully logged in!' });
            return;
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// Sign up new user
router.post('/signup', async (req, res) => {
    try {
        // Check if username is already taken
        const findUser = await User.findOne(
            {
                where: {
                    username: req.body.username
                }
            }
        );

        // Found user with same username
        if (findUser !== null) {
            res.status(400).json(findUser);
            return;
        }

        // Create new User with provided username and password (if username is unique)
        const userData = await User.create({
            username: req.body.username,
            password: req.body.password
        });

        // Set loggedIn to true
        req.session.save(() => {
            req.session.loggedIn = true;
            req.session.userId = userData.id;
            res.status(200).json({ user: userData, message: 'Successfully signed up!' });
            return;
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

module.exports = router;