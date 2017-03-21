const express = require('express');
const bodyParser = require('body-parser');

const router = require('./router/route.js');

const app = express();

// Port dedicated to backend server
var port = process.env.PORT || 80;

// Enable retrieving data from POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Set the view engine to handlebars
app.set("view engine", "hbs");

// bind router
app.use(router);

// Listen on PORT
app.listen(port, function () {
  console.log('listening on port ' + port);
});

module.exports = app;
