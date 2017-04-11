const sqlite3 = require('sqlite3');

module.exports = function movies (req, res) {
  var db = new sqlite3.Database('movie-friends.db');
  var movies = [];

  console.log(db);

  db.each("SELECT id, title, releaseYear, plot, image FROM movies", function(err, row) {
    if (!err) {
      movies.push({
        id: row.id,
        title: row.title,
        releaseYear: row.releaseYear,
        plot: row.plot,
        image: row.image
      });
    }
    else {
      console.log(err);
    }
  });

  res.render('register.hbs', { session: req.session });
};
