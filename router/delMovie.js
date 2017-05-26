const Database = require("./Database");

var database = new Database('movie-friends.db');

module.exports = function delMovie (req, res) {
  if (!req.session.authenticated) {
    res.redirect('/login');
  }

  var movieId = req.body.id;
  var userId = req.session.userId;

  database.deleteRating(movieId, userId, function () {
    database.getRatingsFromId(movieId, function (ratings) {
      if (!ratings) {
        database.deleteMovie(movieId, function () {
          res.redirect(303, '/users/' + userId);
        });
      }
    });
  });
};
