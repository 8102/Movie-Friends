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

Database.prototype.getMovies = function(callback) {
  console.log("get all movies from database");
  var db = this.db;

  db.all("SELECT id, title, releaseYear, plot, image FROM movies", function(err, row) {
    if (!err) {
      callback(row);
    }
    else {
      console.log(err);
    }
  });
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
    "WHERE movies.id = (?)", id, function(err, row) {
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
    "WHERE movies.title = (?)", title, function(err, row) {
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

Database.prototype.addUser = function(username, password) {
  console.log("insert user into database");
  var db = this.db;
  db.serialize(function() {
    var stmt = db.prepare("INSERT INTO users VALUES (NULL,?,?)");
    stmt.run(username, password);
    stmt.finalize();
  });
};

Database.prototype.getUser = function(username, callback) {
  console.log("get user with username: " + username + " from database");
  var db = this.db;

  db.all("SELECT username, password FROM users WHERE users.username = (?)",
   username,
   function(err, row) {
      if (err) {
        console.log(err);
      }
      else {
        callback(row);
      }
    });

};

module.exports = Database;
