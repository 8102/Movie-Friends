const Database = require("./Database");

var database = new Database('movie-friends.db');

module.exports = function user (req, res) {
  if (!req.session.authenticated) {
    res.redirect('/login');
  }

  database.getUserById(req.params.id, function (user) {
    if (user) {
      database.getRatingsFromUserId(req.params.id, function (ratings) {
        res.render('user.hbs', {
          user: user,
          ratings: ratings,
          session: req.session
        });
      });
    }
    else {
      res.redirect(404, '/users');
    }
  });
};
