const Database = require("./Database");

var database = new Database('movie-friends.db');

module.exports = function addMovie (req, res) {
  if (!req.session.authenticated) {
    res.redirect('/login');
  }

  var title = req.body.title;
  var plot = req.body.plot || "";
  var releaseYear = req.body.releaseYear;
  var imageUrl = req.body.imageUrl || "";
  var rating = req.body.rating;
  var userId = req.session.userId;

  database.getMovieFromTitle(title, function (movie) {
    if (movie) {
      console.log("movie found and adding rating");
      database.addRating(movie.id, rating, userId);
      res.redirect(303, '/movies');
    }
    else {
      console.log("movie not found");
      console.log("title: " + title + " | plot: " + plot + " | releaseYear: " + releaseYear + " | imageUrl: " + imageUrl + " | rating: " + rating);
      if (title && releaseYear && rating) {
        console.log("creating movie");
        database.addMovie(title, plot, releaseYear, imageUrl, function () {
          database.getMovieFromTitle(title, function (movie) {
            console.log("trying to add rating");
            if (movie) {
              console.log("adding rating");
              database.addRating(movie.id, rating, userId);
              res.redirect(303, '/movies');
            }
          });
        });
      }
      else {
        console.log("Something wrong happend");
        res.redirect(400, '/rate');
      }
    }
  });
};
