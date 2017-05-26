const Database = require("./Database");
const fetch = require('isomorphic-fetch');
const SparqlHttp = require('sparql-http-client');

SparqlHttp.fetch = fetch;

var database = new Database('movie-friends.db');
var endpoint = new SparqlHttp({
  endpointUrl: 'http://dbpedia.org/sparql'
});

module.exports = function addMovie (req, res) {
  if (!req.session.authenticated) {
    res.redirect('/login');
  }

  var title = req.body.title;
  var plot = req.body.plot || "";
  var releaseYear = req.body.releaseYear;
  var imageUrl = req.body.imageUrl || "";
  var rating = req.body.rating;
  var userId = req.session.userId;

  var query = "PREFIX dbo: <http://dbpedia.org/ontology/> SELECT ?abstract WHERE { ?movie rdf:type dbo:Film . ?movie rdfs:label \"" + title + "\"@en . ?movie dbo:abstract ?abstract}";

  endpoint.selectQuery(query).then(function(response){
    return(response.json());
  }).then( function (result){
    for (var i = 0; i < result.results.bindings.length; i++) {
      if (result.results.bindings[i].abstract['xml:lang'] == 'en') {
        return(result.results.bindings[i].abstract.value);
      }
    }
    return(null);
  }).then( function (plot) {
    console.log(plot);
    database.getMovieFromTitle(title, function (movie) {
      if (movie) {
        console.log("movie found and adding rating");
        database.addRating(movie.id, rating, userId);
        res.redirect(303, '/movies');
      }
      else {
        console.log("movie not found");
        console.log("title: " + title + " | plot: " + plot + " | releaseYear: " + releaseYear + " | imageUrl: " + imageUrl + " | rating: " + rating);
        if (title && releaseYear && rating) {
          console.log("creating movie");
          database.addMovie(title, plot, releaseYear, imageUrl, function () {
            database.getMovieFromTitle(title, function (movie) {
              console.log("trying to add rating");
              if (movie) {
                console.log("adding rating");
                database.addRating(movie.id, rating, userId);
                res.redirect(303, '/movies');
              }
            });
          });
        }
        else {
          console.log("Something wrong happend");
          res.redirect(400, '/rate');
        }
      }
    });
  }).catch( function(error){
    console.log(error);
  });
};
