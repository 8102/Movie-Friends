var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('movie-friends.db');


db.serialize(function() {

  var movies = [
    {id: 0, releaseYear: 2012, title: "Pulp Faction", plot: "Two faction. One answer.", image: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/3/movie-endersgame.jpg"},
    {id: 1, releaseYear: 2010, title: "The Moped", plot: "The story of a moped.", image: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/3/movie-endersgame.jpg"},
    {id: 2, releaseYear: 2011, title: "Top Gum", plot: "One man who's cheewing.", image: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/3/movie-endersgame.jpg"}
  ];

  db.run("CREATE TABLE if not exists movies (id INT, releaseYear INT, title TEXT, plot TEXT, image TEXT)");
  var stmt = db.prepare("INSERT INTO movies VALUES (?,?,?,?,?)");
  for (var i = 0; i < movies.length; i++) {
    stmt.run(movies[i].id, movies[i].releaseYear, movies[i].title, movies[i].plot, movies[i].image);
  }
  stmt.finalize();

  db.each("SELECT id, title FROM movies", function(err, row) {
      console.log(row.id + ": " + row.title);
  });
});

db.close();
