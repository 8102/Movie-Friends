const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const Database = require("./../Database");
const secret = require("./secret.js");

var database = new Database('movie-friends.db');

module.exports = function delRatings (req, res) {
  console.log("[API]");
  var authorization = req.headers.Authorization || req.headers.authorization;
  var token = authorization.split(' ')[1];
  var movieId = req.query.movieId;
  var userId = req.query.userId;

  jwt.verify(token, secret, function (err, payload) {
    if (err) {
      console.log(err);
      res.status(401).json();
    }
    else {
      database.getUserById(userId, function (user) {
        if (!user) {
          res.status(404).json();
        }
        else {
          database.getRoleById(userId, function (role) {
            console.log(role);
            if (typeof role !== 'undefined' || role.role == 2 || userId == payload.userId) {
              database.getRatingsFromUserId(userId, function (ratings) {
                var same = false;

                for (var i = 0; i < ratings.length; i++) {
                  if (ratings[i].movieId == movieId) {
                    same = true;
                  }
                }
                if (same) {
                  database.deleteRating(movieId, userId, function () {
                    database.getRatingsFromId(movieId, function (ratings) {
                      console.log(ratings);
                      if (ratings.length === 0) {
                        database.deleteMovie(movieId, function () {
                          res.status(204).json();
                        });
                      } else {
                        res.status(204).json();
                      }
                    });
                  });
                } else {
                  console.log("Del of rating failed");
                  res.status(404).json();
                }
              });
            }
          else {
            console.log("No right to del this rating");
            res.status(404).json();
          }
          });
        }
      });
    }
  });
};
