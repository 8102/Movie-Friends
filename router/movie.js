const Database = require("./Database");

var database = new Database('movie-friends.db');

module.exports = function movie (req, res) {
  if (!req.session.authenticated) {
    res.redirect('/login');
  }

  var sum = [0, 0, 0, 0, 0];

  database.getMovie(req.params.id, function (movie) {
    if (movie.id != -1) {
      database.getRatingsFromId(movie.id, function (ratings) {
        for (var i = 0; i < ratings.length; i++) {
          sum[ratings[i].rating - 1]++;
        }
        var rating = {
          one: sum[0],
          two: sum[1],
          three: sum[2],
          four: sum[3],
          five: sum[4]
        };
        res.render('movie.hbs', {
          movie: movie,
          rating: rating,
          session: req.session
        });
      });
    }
    else {
      res.redirect(404, '/movies');
    }
  });
};
