// const router = require('express').Router();
// const { User } = require('../../models');

// // Login
// router.post('/login', async (req, res) => {
//     try {
//         // Find User with same username provided
//         const dbUserData = await User.findOne({
//             where: {
//                 username: req.body.username
//             }
//         });

//         // If no user found with provided username
//         if (!dbUserData) {
//             res.status(404).json({ message: 'Incorrect username or password. Please try again!' });
//             return;
//         }

//         // If user found with username, check provided password against user's encrypted password
//         const validPassword = await dbUserData.checkPassword(req.body.password);

//         // If password is not the same as saved password in db
//         if (!validPassword) {
//             res.status(404).json({ message: 'Incorrect username or password. Please try again!' });
//             return;
//         }

//         // If password correct, set loggedIn to true
//         req.session.save(() => {
//             req.session.loggedIn = true;
//             req.session.userId = dbUserData.id;
//             console.log('\nLogged in\n');
//             res.status(200).json({ user: dbUserData, message: 'Successfully logged in!' });
//             return;
//         });
//     } catch (err) {
//         console.log(err);
//         res.status(500).json(err);
//     }
// });

// // Sign up
// router.post('/signup', async (req, res) => {
//     try {
//         const userData = await User.create({
//             username: req.body.username,
//             password: req.body.password
//         });

//         req.session.save(() => {
//             req.session.loggedIn = true;
//             req.session.userId = userData.id;
//             console.log('\nSigned up\n');
//             res.status(200).json(userData);
//             return;
//         });
//     } catch (err) {
//         console.log(err);
//         res.status(500).json(err);
//     }
// });

// // Log out
// router.post('/logout', (req, res) => {
//     console.log('\nReached logout route\n');
//     if (req.session.loggedIn) {
//         req.session.destroy(() => {
//             console.log('\nLogging out\n');
//             res.redirect('/');
//         });
//     } else {
//         res.status(404).end();
//     }
// });

module.exports = router;