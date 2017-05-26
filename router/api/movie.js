const Database = require("./../Database");

var database = new Database('movie-friends.db');

module.exports = function movies (req, res) {
  console.log("[API]");
  database.getMovie(req.params.id, function (movie) {
    if (movie) {
      database.getRatingsFromId(movie.id, function (ratings) {
        var dataRating = [];
        for (var i = 0; i < ratings.length; i++) {
          dataRating.push(ratings[i].rating);
        }
        data = {
          id: movie.id,
          title: movie.title,
          year: movie.releaseYear,
          plot: movie.plot,
          image: movie.image,
          ratings: dataRating
        };
        res.status(200).json(data);
      });
    }
    else {
      res.status(404).json();
    }
  });
};
