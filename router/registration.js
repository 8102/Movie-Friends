const crypto = require('crypto');
const Database = require("./Database");

var database = new Database('movie-friends.db');

module.exports = function registration (req, res) {
  var name = req.session.name;

  if (!name) {
    name = req.session.name = '';
  }

  if (req.body.password != req.body.passwordVerif) {
    res.redirect('/register');
  }

  database.getUser(req.body.username, function (user) {
    if (user === undefined) {
      var salt = crypto.randomBytes(32).toString('hex');
      var hash = crypto.createHash('sha256').update(req.body.password + salt).digest('hex');

      database.addUser(req.body.username, hash, salt);
      req.session.authenticated = true;
      req.session.userId = user.id;
      name = user.username;
      res.redirect('/movies');
    } else {
      res.redirect('/register');
    }
  });
};
