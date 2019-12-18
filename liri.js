require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);
var axios = require("axios");
var fs = require("fs");
var moment = require("moment");
var action = process.argv[2];
var userInput = process.argv.slice(3).join(" ");

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
    console.log("Spotify Link : "+ data.tracks.items[0].external_urls.spotify)
    console.log("Album Name: " +data.tracks.items[0].album.name)
  });
}
function switchFunction() {
  switch (action) {
    case "spotify-this-song":
      spotifyThisSong();
      break;
  }
}
switchFunction();
