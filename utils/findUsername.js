const { User } = require('../models');

// Get username of the logged-in user
const findUsername = async (req) => {
    let loggedInUsername;
    if (req.session.loggedIn) {
        const loggedInUser = await User.findByPk(req.session.userId);
        loggedInUsername = loggedInUser.username;
    }

    return loggedInUsername;
};

module.exports = findUsername;