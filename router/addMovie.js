const Database = require("./Database");

var database = new Database('movie-friends.db');

module.exports = function addMovie (req, res) {
  var title = req.body.title;
  var plot = req.body.plot;
  var releaseYear = req.body.releaseYear;
  var imageUrl = req.body.imageUrl;
  var rating = req.body.rating;

  database.getMovieFromTitle(title, function (movie) {
    if (movie.id != -1) {
      database.addRating(movie.id, rating);
      res.redirect(303, '/movies');
    }
    else {
      if (title && plot && releaseYear && imageUrl) {
        database.addMovie(title, plot, releaseYear, imageUrl);
        database.getMovieFromTitle(title, function (movie) {
          if (movie.id != -1) {
            database.addRating(movie.id, rating);
            res.redirect(303, '/movies');
          }
        });    res.redirect(303, '/movies');
      }
      else {
        res.redirect(400, '/movieSuccess');
      }
    }
  });
};
