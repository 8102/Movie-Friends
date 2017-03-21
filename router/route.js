const express = require('express');

// Our router with which we define each route.
const router = express.Router();

// Default behavior for any routes
router.use(function(req, res, next) {
    // Authentication of users using NARMS server.

    // Ensure to pass through all routes.
    next();
});

// handling index page.
router.get('/', require('./index'));

// handling about page.
router.get('/about', require('./about'));

// handling movies page.
router.get('/movies', require('./movies'));

// handling single movie page.
router.get('/movies/:id', require('./movie'));


// handling unknown route and ouput an error message.
router.get('*', require('./error'));


// Export the router.
module.exports = router;
