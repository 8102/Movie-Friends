const Database = require("./Database");

var database = new Database('movie-friends.db');

module.exports = function user (req, res) {
  if (!req.session.authenticated) {
    res.redirect('/login');
  }

  var same = false;
  var gender = 1;

  database.getUserById(req.params.id, function (user) {
    if (user) {
      database.getRatingsFromUserId(req.params.id, function (ratings) {
        if (req.session.userId == req.params.id) {
          console.log(req.session.userId);
          same = true;
        }
        database.getRoleById(req.session.userId, function (role) {
          console.log(role);
          if (role.role == 2)
          {
            same = true;
          }
          if (user.gender == 'F') {
            gender = 0;
          }
          res.render('user.hbs', {
            user: user,
            ratings: ratings,
            same: same,
            session: req.session
          });
        });
      });
    }
    else {
      res.redirect(404, '/users');
    }
  });
};
