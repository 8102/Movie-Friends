const Database = require("./../Database");

var database = new Database('movie-friends.db');

module.exports = function movies (req, res) {
  console.log("[API]");
  database.getMovies(function (movies) {
    res.status(200).json(movies);
  });
};
