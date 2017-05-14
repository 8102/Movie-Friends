const Database = require("./Database");

var database = new Database('movie-friends.db');

module.exports = function user (req, res) {
  if (!req.session.authenticated) {
    res.redirect('/login');
  }

  var same = false;

  database.getUserById(req.params.id, function (user) {
    if (user) {
      database.getRatingsFromUserId(req.params.id, function (ratings) {
        if (req.session.userId == req.params.id) {
          console.log(req.session.userId);
          same = true;
        }
        res.render('user.hbs', {
          test: 0,
          user: user,
          ratings: ratings,
          same: same,
          session: req.session
        });
      });
    }
    else {
      res.redirect(404, '/users');
    }
  });
};
