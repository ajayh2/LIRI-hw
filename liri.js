require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);
var axios = require("axios");
var fs = require("fs");
var moment = require("moment");
var action = process.argv[2];
var userInput = process.argv.slice(3).join(" ");

function switchFunction() {
  switch (action) {
    case "spotify-this-song":
      spotifyThisSong();
      break;
    case "concert-this":
      concertThis();
      break;
    case "movie-this":
      movieThis();
      break;
  }
}
function spotifyThisSong() {
  if (!userInput) {
    userInput = "The Sign";
  }
  var spotify = new Spotify({
    id: process.env.SPOTIFY_ID,
    secret: process.env.SPOTIFY_SECRET
  });
  spotify.search({ type: "track", query: userInput }, function(err, data) {
    if (err) {
      return console.log("Error occurred: " + err);
    }
    console.log("Artist : " + data.tracks.items[0].artists[0].name);
    console.log("Name: " + data.tracks.items[0].name);
    console.log("Spotify Link : " + data.tracks.items[0].external_urls.spotify);
    console.log("Album Name: " + data.tracks.items[0].album.name);
  });
}
function concertThis() {
  var conertURL =
    "https://rest.bandsintown.com/artists/" +
    userInput +
    "/events?app_id=codingbootcamp";

  axios.get(conertURL).then(function(response) {
    console.log("Artist/Band : " + userInput);
    console.log("Concert Hall: ", response.data[0].venue.name);
    console.log(
      "Location: " +
        response.data[0].venue.city +
        ", " +
        response.data[0].venue.region
    );
    console.log(
      "Time; ",
      moment(response.data[0].datetime).format("MM/DD/YYYY")
    );
  });
}

function movieThis() {
  var movieURL =
    "http://www.omdbapi.com/?t=" + userInput + "&y=&plot=short&apikey=trilogy";
  axios.get(movieURL).then(function(response) {
    console.log("Title : " + response.data.Title);
    console.log("Year : " + response.data.Year);
    console.log("IMDB Rating : " + response.data.imdbRating);
    console.log("Rotten Tomatoes Rating : " + response.data.Ratings[1].Value);
    console.log("Country Produced: " + response.data.Country);
    console.log("Language : " + response.data.Language);
    console.log("Plot : " + response.data.Plot);
    console.log("Actors : " + response.data.Actors);
  });
}

switchFunction();
