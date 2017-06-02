const sqlite3 = require("sqlite3").verbose();

function Database(file) {
    this.db = new sqlite3.Database(file);
}

Database.prototype.addMovie = function(title, plot, releaseYear, imageUrl, callback) {
  console.log("insert movie into database");
  var db = this.db;
  db.serialize(function() {
    var stmt = db.prepare("INSERT INTO movies VALUES (NULL,?,?,?,?)");
    stmt.run(releaseYear, title, plot, imageUrl);
    stmt.finalize();
    if (callback) {
      callback();
    }
  });
};

Database.prototype.addRating = function(movieId, rating, userId) {
  console.log("insert rating into database");
  var db = this.db;
  db.serialize(function() {
    var stmt = db.prepare("INSERT INTO ratings VALUES (?,?,?)");
    stmt.run(movieId, rating, userId);
    stmt.finalize();
  });
};

Database.prototype.addUser = function(username, password, salt, firstName, lastName, gender, publicFirst, publicLast, publicGender, callback) {
  console.log("insert user into database");
  var db = this.db;
  db.serialize(function() {
    var stmt = db.prepare("INSERT INTO users VALUES (NULL,?,?,?,?,?,?,?,?,?)");
    stmt.run(username, password, salt, firstName, lastName, gender, publicFirst, publicLast, publicGender);
    stmt.finalize();
    callback();
  });
};

Database.prototype.addRole = function(userId, role, callback) {
  console.log("insert user into database");
  var db = this.db;
  db.serialize(function() {
    var stmt = db.prepare("INSERT INTO roles VALUES (?,?)");
    stmt.run(userId, role);
    stmt.finalize();
    callback();
  });
};

Database.prototype.addFriend = function(userId, friendId, callback) {
  console.log("insert friendship into database");
  var db = this.db;
  db.serialize(function() {
    var stmt = db.prepare("INSERT INTO friends VALUES (?,?)");
    stmt.run(userId, friendId);
    stmt.finalize();
    callback();
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
  var db = this.db;

  db.get("SELECT id, title, releaseYear, plot, image FROM movies " +
    "WHERE movies.id = (?)", id, function(err, row) {
      if (err) {
        console.log(err);
      }
      callback(row);
    });

};

Database.prototype.getMovieFromTitle = function(title, callback) {
  console.log("get movie with title: " + title + " from database");
  var db = this.db;

  db.get("SELECT id, title, releaseYear, plot, image FROM movies " +
    "WHERE movies.title = (?)", title, function(err, row) {
      if (err) {
        console.log(err);
      }
      callback(row);
    });

};

Database.prototype.getRatingsFromId = function(movieId, callback) {
  console.log("get Ratings from database");
  var db = this.db;

  db.all("SELECT rating, userId FROM ratings WHERE ratings.movieId = (?)",
   movieId,
   function(err, row) {
     if (!err) {
       callback(row);
     }
     else {
       console.log(err);
     }
   });
};

Database.prototype.getUser = function(username, callback) {
  console.log("get user with username: " + username + " from database");
  var db = this.db;

  db.get("SELECT username, password, id, salt, firstName, lastName, gender, publicFirst, publicLast, publicGender FROM users WHERE users.username = (?)",
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

Database.prototype.getUsers = function(callback) {
  console.log("get all users from database");
  var db = this.db;

  db.all("SELECT username, id FROM users", function(err, row) {
    if (!err) {
      callback(row);
    }
    else {
      console.log(err);
    }
  });
};

Database.prototype.getUserById = function(id, callback) {
  console.log("get user with id: " + id + " from database");
  var db = this.db;

  db.get("SELECT * FROM users WHERE users.id = (?)",
   id,
   function(err, row) {
      if (err) {
        console.log(err);
      }
      else {
        callback(row);
      }
    });

};

Database.prototype.getRatingsFromUserId = function(userId, callback) {
  console.log("get Ratings for userId: " + userId + " from database");
  var db = this.db;

  db.all("SELECT title, releaseYear, rating, movieId FROM ratings, movies WHERE ratings.movieId = movies.id AND ratings.userId = (?)",
   userId,
   function(err, row) {
     if (!err) {
       callback(row);
     }
     else {
       console.log(err);
     }
   });
};

Database.prototype.getRoleById = function(userId, callback) {
  console.log("get role for user with id: " + userId + " from database");
  var db = this.db;

  db.get("SELECT role, userId FROM roles WHERE userId = (?)",
    userId,
    function(err, row) {
      if (err) {
        console.log(err);
      }
      else {
        callback(row);
      }
    });
};

Database.prototype.getFriendsById = function(userId, callback) {
  console.log("get all friends of user " + userId + " from database");
  var db = this.db;

  db.all("SELECT * FROM friends WHERE userIdFirst = (?) OR userIdSecond = (?)", userId, userId, function(err, row) {
    if (!err) {
      callback(row);
    }
    else {
      console.log(err);
    }
  });
};

Database.prototype.deleteRating = function(movieId, userId, callback) {
  console.log("delete a Rating");
  var db = this.db;

  db.serialize(function() {
    db.run("DELETE FROM ratings WHERE movieId = (?) AND userId = (?)", movieId, userId, function (err) {
      if (err) {
        console.log(err);
      }
      callback();
    });
  });
};

Database.prototype.deleteMovie = function(movieId, callback) {
  console.log("delete a Movie");
  var db = this.db;

  db.serialize(function() {
    db.run("DELETE FROM movies WHERE id = (?)", movieId, function (err) {
      if (err) {
        console.log(err);
      }
      callback();
    });
  });
};

module.exports = Database;
