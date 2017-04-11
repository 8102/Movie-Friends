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
    if (user[0] === undefined) {
      database.addUser(req.body.username, req.body.password);
      req.session.authenticated = true;
      name = user.username;
      res.redirect('/movies');
    } else {
      res.redirect('/register');
    }
  });
};
