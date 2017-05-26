const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const Database = require("./../Database");
const secret = require("./secret.js");

var database = new Database('movie-friends.db');

module.exports = function tokens (req, res) {
  console.log("[API]");

  database.getUser(req.body.username, function (user) {
    if (user === undefined) {
      res.status(401).json();
    }
    else {
      var hash = crypto.createHash('sha256').update(req.body.password + user.salt).digest('hex');

      if (hash === user.password) {
        var payload = {
          username: user.username,
          userId: user.id,
        };

        jwt.sign(payload, secret, {}, function (err, tokenValue) {
          if (err) {
            console.log(err);
          }
          var data = {
            token: tokenValue
          };
          res.status(201).json(data);
        });
      }
      else {
        res.status(401).json();
      }
    }
  });
};
