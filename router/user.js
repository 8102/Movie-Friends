const Database = require("./Database");

var database = new Database('movie-friends.db');

module.exports = function user (req, res) {
  if (!req.session.authenticated) {
    res.redirect('/login');
  }
  else {
    var sameUser = false;
    var admin = false;
    var canAdd = false;
    var gender = 1;
    var friendList = [];

    database.getUserById(req.params.id, function (user) {
      if (user) {
        database.getRatingsFromUserId(req.params.id, function (ratings) {
          if (req.session.userId == req.params.id) {
            sameUser = true;
          }
          database.getRoleById(req.session.userId, function (role) {
            if (role.role == 2) {
              admin = true;
            }
            if (user.gender == 'F') {
              gender = 0;
            }
            database.getFriendsById(req.params.id, function (friends) {
              for (var i = 0; i < friends.length; i++) {
                if (friends[i].userIdFirst != req.session.userId && friends[i].userIdSecond != req.session.userId) {
                  canAdd = true;
                }
                else {
                  canAdd = false;
                }

                var friendId = (user.id == friends[i].userIdFirst ? friends[i].userIdSecond : friends[i].userIdFirst);

                database.getUserById(friendId, function (user) {
                  friendList.push(user);
                });
              }
              if (friends.length === 0) {
                canAdd = true;
              }
              res.render('user.hbs', {
                user: user,
                ratings: ratings,
                sameUser: sameUser,
                admin: admin,
                canAdd: canAdd,
                friends: friendList,
                session: req.session
              });
            });
          });
        });
      }
      else {
        res.redirect(404, '/users');
      }
    });
  }
};
