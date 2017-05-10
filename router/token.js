const Database = require("./Database");

var database = new Database('movie-friends.db');

module.exports = function token (req, res) {
  var name = req.session.name;

  if (!name) {
    name = req.session.name = '';
  }

  database.getUser(req.body.username, function (user) {
    if (user === undefined) {
      res.redirect('/login');
    }
    else {
      if (req.body.password === user.password) {
        req.session.authenticated = true;
        req.session.userId = user.id;
        name = user.username;
        res.redirect('/movies');
      }
      else {
        res.redirect('/login');
      }
    }
  });
};
