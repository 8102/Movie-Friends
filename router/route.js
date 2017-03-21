const express = require('express');

// Our router with which we define each route.
const router = express.Router();

// Default behavior for any routes
router.use(function(req, res, next) {
    // Authentication of users using NARMS server.

    // Ensure to pass through all routes.
    next();
});

// middleware handling login event.
router.get('/', require('./index'));

// Export the router.
module.exports = router;
