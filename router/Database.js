const sqlite3 = require("sqlite3").verbose();

function Database(file) {
    this.db = new sqlite3.Database(file);
}

Database.prototype.addMovie = function(title, plot, releaseYear, imageUrl) {
  console.log("insert movie into database");
  var db = this.db;
  db.serialize(function() {
    var stmt = db.prepare("INSERT INTO movies VALUES (NULL,?,?,?,?)");
    stmt.run(releaseYear, title, plot, imageUrl);
    stmt.finalize();
  });
};

Database.prototype.addRating = function(movieId, rating) {
  console.log("insert rating into database");
  var db = this.db;
  db.serialize(function() {
    var stmt = db.prepare("INSERT INTO ratings VALUES (?,?)");
    stmt.run(movieId, rating);
    stmt.finalize();
  });
};

Database.prototype.getMovies = function() {
  console.log("get all movies from database");
  var movies = [];
  var db = this.db;

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

  return movies;
};

Database.prototype.getMovie = function(id, callback) {
  console.log("get movie with id: " + id + " from database");
  var movie = {
    id: -1,
    title: "",
    releaseYear: 0,
    plot: "",
    image: ""
  };
  var db = this.db;

  db.each("SELECT id, title, releaseYear, plot, image FROM movies " +
    "WHERE movies.id = " + id, function(err, row) {
      if (!err) {
        movie.id = row.id;
        movie.title = row.title;
        movie.releaseYear = row.releaseYear;
        movie.plot = row.plot;
        movie.image = row.image;
      }
      else {
        console.log(err);
      }
      callback(movie);
    });

};

Database.prototype.getMovieFromTitle = function(title, callback) {
  console.log("get movie with title: " + title + " from database");
  var movie = {
    id: -1,
    title: "",
    releaseYear: 0,
    plot: "",
    image: ""
  };
  var db = this.db;

  db.each("SELECT id, title, releaseYear, plot, image FROM movies " +
    "WHERE movies.title = \'" + title + "\'", function(err, row) {
      if (!err) {
        movie.id = row.id;
        movie.title = row.title;
        movie.releaseYear = row.releaseYear;
        movie.plot = row.plot;
        movie.image = row.image;
      }
      else {
        console.log(err);
      }
      callback(movie);
    });

};

module.exports = Database;
