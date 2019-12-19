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
    var conertURL = "https://rest.bandsintown.com/artists/" + userInput + "/events?app_id=codingbootcamp";

    axios.get(conertURL).then(
        function (response) {
            console.log("Artist/Band : "+userInput)
            console.log("Concert Hall: ", response.data[0].venue.name);
            console.log("Location: " + response.data[0].venue.city + ", " + response.data[0].venue.region);
            console.log("Time; ", moment(response.data[0].datetime).format("MM/DD/YYYY"));
        })
}
switchFunction();
