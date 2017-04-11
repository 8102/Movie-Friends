const Database = require("./Database");

var database = new Database('movie-friends.db');

module.exports = function movies (req, res) {
  database.getMovies(function (movies) {
    res.render('movies.hbs', {
      movies: movies,
      session: req.session
    });
  });

};
