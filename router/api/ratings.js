const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const Database = require("./../Database");
const secret = require("./secret.js");

var database = new Database('movie-friends.db');

module.exports = function ratings (req, res) {
  console.log("[API]");
  var authorization = req.headers.Authorization || req.headers.authorization;
  var token = authorization.split(' ')[1];

  jwt.verify(token, secret, function (err, payload) {
    if (err) {
      console.log(err);
      res.status(401).json();
    }
    else {
      var title = req.body.title;
      var plot = req.body.plot || "";
      var releaseYear = req.body.year;
      var imageUrl = req.body.imageUrl || "";
      var rating = req.body.rating;
      var userId = req.body.userId;

      database.getMovieFromTitle(title, function (movie) {
        if (movie) {
          console.log("movie found and adding rating");
          database.getRatingsFromUserId(userId, function (ratings) {
            var same = false;

            for (var i = 0; i < ratings.length; i++) {
              if (ratings[i].movieId == movie.id) {
                same = true;
              }
            }
            if (same) {
              console.log("Abort Rating");
              res.status(409).json();
            } else {
              database.addRating(movie.id, rating, userId);
              res.status(201).json();
            }
          });
        }
        else {
          console.log("movie not found");
          console.log("title: " + title + " | plot: " + plot + " | releaseYear: " + releaseYear + " | imageUrl: " + imageUrl + " | rating: " + rating);
          if (title && releaseYear && rating) {
            console.log("creating movie");
            database.addMovie(title, plot, releaseYear, imageUrl, function () {
              database.getMovieFromTitle(title, function (movie) {
                console.log("trying to add rating");
                if (movie) {
                  console.log("adding rating");
                  database.addRating(movie.id, rating, userId);
                  res.status(201).json();
                }
              });
            });
          }
          else {
            console.log("Something wrong happend");
            res.status(401).json();
          }
        }
      });
    }
  });

};
