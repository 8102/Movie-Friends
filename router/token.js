const Database = require("./Database");

var database = new Database('movie-friends.db');

module.exports = function token (req, res) {
  var name = req.session.name;

  if (!name) {
    name = req.session.name = '';
  }

  database.getUser(req.body.username, function (user) {
    if (user[0] === undefined) {
      res.redirect('/login');
    } else {
      if (req.body.password === user[0].password) {
        req.session.authenticated = true;
        name = user.username;
        res.redirect('/movies');
      }
    }
  });
};
