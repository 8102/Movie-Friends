const Database = require("./Database");

var database = new Database('movie-friends.db');

module.exports = function users (req, res) {
  if (!req.session.authenticated) {
    res.redirect('/login');
  }

  database.getUsers(function (users) {
    res.render('users.hbs', {
      users: users,
      session: req.session
    });
  });

};
