const withAuth = (req, res, next) => {
    // If the user is not logged in, redirect the request to the login route
    if (!req.session.loggedIn) {
        res.redirect('/login');
    // If user logged in, proceed with route logic
    } else {
        next();
    }
};

module.exports = withAuth;