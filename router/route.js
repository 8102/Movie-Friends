const express = require('express');

// Our router with which we define each route.
const router = express.Router();

// web server

// handling index page.
router.get('/', require('./index'));

// handling about page.
router.get('/about', require('./about'));

// handling movies page.
router.get('/movies', require('./movies'));

// handling single movie page.
router.get('/movies/:id', require('./movie'));

// handling movie rating page.
router.get('/rate', require('./rate'));

// handling movie rating page.
router.post('/addMovie', require('./addMovie'));

// handling login page.
router.get('/login', require('./login'));

// handling token page.
router.post('/token', require('./token'));

// handling registration page.
router.get('/register', require('./register'));

// handling registration method page.
router.post('/registration', require('./registration'));


// REST API



// handling unknown route and ouput an error message.
router.get('*', require('./error'));

// Export the router.
module.exports = router;
