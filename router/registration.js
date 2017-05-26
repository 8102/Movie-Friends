const crypto = require('crypto');
const Database = require("./Database");

var database = new Database('movie-friends.db');

module.exports = function registration (req, res) {
  var username = req.body.username;
  var firstName = req.body.firstName;
  var lastName = req.body.lastName;
  var gender = req.body.gender;
  var canSee = req.body.canSee;

  if (req.body.password != req.body.passwordVerif) {
    res.redirect('/register');
  }

  database.getUser(username, function (user) {
    if (user === undefined) {
      var salt = crypto.randomBytes(32).toString('hex');
      var hash = crypto.createHash('sha256').update(req.body.password + salt).digest('hex');

      database.addUser(username, hash, salt, firstName, lastName, gender, canSee, function () {
        database.getUser(username, function (user) {
          database.addRole(user.id, 1, function () {
            req.session.authenticated = true;
            req.session.userId = user.id;
            res.redirect('/movies');
          });
        });
      });
    } else {
      res.redirect('/register');
    }
  });
};
