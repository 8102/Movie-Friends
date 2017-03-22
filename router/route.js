const express = require('express');

// Our router with which we define each route.
const router = express.Router();

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
