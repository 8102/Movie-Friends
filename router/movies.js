const Database = require("./Database");

var database = new Database('movie-friends.db');

module.exports = function movies (req, res) {
  var movies = database.getMovies();

  res.render('movies.hbs', { movies: movies });
};
