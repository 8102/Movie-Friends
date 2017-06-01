const Database = require("./Database");

var database = new Database('movie-friends.db');

module.exports = function addFriend (req, res) {
  if (!req.session.authenticated) {
    res.redirect('/login');
  }

  var userId = req.session.userId;
  var friendId = req.params.id;

  database.addFriend(userId, friendId, function () {
    res.redirect(303, '/users/' + friendId);
  });
};
