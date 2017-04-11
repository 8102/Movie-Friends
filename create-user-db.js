var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('movie-friends.db');


db.serialize(function() {

  var users = [
    {id: 0, username: "toto", password: "totototo"},
    {id: 1, username: "titi", password: "titititi"},
    {id: 2, username: "tototiti", password: "tototiti"}
  ];

  db.run("CREATE TABLE if not exists users (id INTEGER PRIMARY KEY, username TEXT, password TEXT)");
  var stmt = db.prepare("INSERT INTO users VALUES (?,?,?)");
  for (var i = 0; i < users.length; i++) {
    stmt.run(users[i].id, users[i].username, users[i].password);
  }
  stmt.finalize();

  db.each("SELECT id, username FROM users", function(err, row) {
      console.log(row.id + ": " + row.username);
  });
});

db.close();
