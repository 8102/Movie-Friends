const sqlite3 = require('sqlite3');

module.exports = function movie (req, res) {
  var db = new sqlite3.Database('movie-friends.db');
  var movie = {
    id: -1,
    title: "",
    releaseYear: 0,
    plot: "",
    image: ""
  };

  console.log(db);

  db.each("SELECT id, title, releaseYear, plot, image FROM movies WHERE movies.id = " + req.params.id, function(err, row) {
    if (!err) {
      movie = {
        id: row.id,
        title: row.title,
        releaseYear: row.releaseYear,
        plot: row.plot,
        image: row.image
      };
    }
    else {
      console.log(err);
    }
    res.render('movie.hbs', {movie: movie});
  });

};
