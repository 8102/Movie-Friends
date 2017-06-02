const Database = require("./Database");

var database = new Database('movie-friends.db');

module.exports = function logout (req, res) {
  if (!req.session.authenticated) {
    res.redirect('/login');
  }
  else {
    req.session.destroy();
    res.redirect(303, '/');
  }
};
