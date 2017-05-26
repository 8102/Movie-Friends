var sqlite3 = require('sqlite3').verbose();
var crypto = require('crypto');
var db = new sqlite3.Database('movie-friends.db');

db.serialize(function() {

  var firstSalt = crypto.randomBytes(32).toString('hex');
  var secondSalt = crypto.randomBytes(32).toString('hex');
  var thirdSalt = crypto.randomBytes(32).toString('hex');

  var firstHash = crypto.createHash('sha256').update("totototo" + firstSalt).digest('hex');
  var secondHash = crypto.createHash('sha256').update("titititi" + secondSalt).digest('hex');
  var thirdHash = crypto.createHash('sha256').update("tototiti" + thirdSalt).digest('hex');

  var users = [
    {id: 0, username: "toto", password: firstHash, salt: firstSalt},
    {id: 1, username: "titi", password: secondHash, salt: secondSalt},
    {id: 2, username: "tototiti", password: thirdHash, salt: thirdSalt}
  ];

  db.run("CREATE TABLE if not exists users (id INTEGER PRIMARY KEY, username TEXT, password TEXT, salt TEXT)");
  db.run("CREATE TABLE if not exists roles (userId INT, role INT)");
  var stmt = db.prepare("INSERT INTO users VALUES (?,?,?,?)");
  var stmtRole = db.prepare("INSERT INTO roles VALUES (?,?)");
  for (var i = 0; i < users.length; i++) {
    stmt.run(users[i].id, users[i].username, users[i].password, users[i].salt);
    stmtRole.run(users[i].id, 1);
  }
  stmt.finalize();
  stmtRole.finalize();

  db.run("UPDATE roles SET role = (?) WHERE userId = (?)", 2, 0);

  db.each("SELECT id, username FROM users", function(err, row) {
      console.log(row.id + ": " + row.username);
  });
});

db.close();
