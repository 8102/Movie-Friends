const Database = require("./Database");

var database = new Database('movie-friends.db');

module.exports = function movies (req, res) {
  if (!req.session.authenticated) {
    res.redirect('/login');
  }

  database.getMovies(function (movies) {
    res.render('movies.hbs', {
      movies: movies,
      session: req.session
    });
  });

};
