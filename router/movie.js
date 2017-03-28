const Database = require("./Database");

var database = new Database('movie-friends.db');

module.exports = function movie (req, res) {
  database.getMovie(req.params.id, function (movie) {
    if (movie.id != -1) {
      res.render('movie.hbs', {movie: movie});
    }
    else {
      res.redirect(404, '/movies');
    }
  });
};
