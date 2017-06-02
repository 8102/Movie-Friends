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

// handling users page.
router.get('/users', require('./users'));

// handling single user page.
router.get('/users/:id', require('./user'));

// handling movie rating page.
router.post('/delMovie', require('./delMovie'));

// handling friend adding page.
router.get('/addFriend/:id', require('./addFriend'));

// handling foaf page.
router.get('/foaf/:id', require('./foaf'));

// handling logout.
router.post('/logout', require('./logout'));

// REST API

// handling movies API.
router.get('/api/movies', require('./api/movies'));

// handling single movie API.
router.get('/api/movies/:id', require('./api/movie'));

// handling login API.
router.post('/api/tokens', require('./api/token'));

// handling ratings API.
router.post('/api/ratings', require('./api/ratings'));

// handling deleting of ratings API.
router.delete('/api/ratings', require('./api/delRatings'));


// handling unknown route and ouput an error message.
router.get('*', require('./error'));

// Export the router.
module.exports = router;
