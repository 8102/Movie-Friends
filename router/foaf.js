const Database = require("./Database");
const N3 = require('n3');

var database = new Database('movie-friends.db');

module.exports = function foaf (req, res) {
  if (!req.session.authenticated) {
    res.redirect('/login');
  }
  else {
    database.getUserById(req.params.id, function (user) {
      if (user) {
        var writer = N3.Writer({
          prefixes: {
            foaf: 'http://xmlns.com/foaf/0.1/'
          }
        });
        var userURL = req.get("host") + "/users/" + req.params.id;

        if (user.canSee) {
          writer.addTriple(
            {
              subject: userURL,
              predicate: 'foaf:firstName',
              object: user.firstName
            }
          );
          writer.addTriple(
            {
              subject: userURL,
              predicate: 'foaf:familyName',
              object: user.lastName
            }
          );
          writer.addTriple(
            {
              subject: userURL,
              predicate: 'foaf:gender',
              object: user.gender
            }
          );
        }
        database.getFriendsById(req.params.id, function (friends) {
          for (var i = 0; i < friends.length; i++) {
            var friendId = (user.id == friends[i].userIdFirst ? friends[i].userIdSecond : friends[i].userIdFirst);
            var friendURL = req.get("host") + "/users/" + friendId;

            writer.addTriple(userURL, 'foaf:knows', friendURL);

          }
          writer.end(function (error, profile) {
            console.log(profile);
            res.setHeader('Content-Type', 'application/json');
            res.status(200).send(profile);
          });
        });
      }
    });
  }
};
