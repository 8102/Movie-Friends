module.exports = function login (req, res) {
  var movies = [
    {id: 0, releaseYear: 2012, title: "Pulp Faction", plot: "Two faction. One answer.", image: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/3/movie-endersgame.jpg"},
    {id: 1, releaseYear: 2010, title: "The Moped", plot: "The story of a moped.", image: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/3/movie-endersgame.jpg"},
    {id: 2, releaseYear: 2011, title: "Top Gum", plot: "One man who's cheewing.", image: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/3/movie-endersgame.jpg"}
  ];
  res.render('movie.hbs', {movie: movies[req.params.id]});
};
