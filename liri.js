require("dotenv").config();
var moment = require('moment');
var Spotify = require("node-spotify-api");
var axios = require("axios");
var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);
var fs = require("fs");
var argvArr = process.argv.splice(2);

function venueLocation(city,region,country){
    if(city!=""){
        var parsedCity = city;
    }
    else{
        var parsedCity = "";
    }
    if(region!=""){
        var parsedRegion = ", " + region;
    }
    else{
        var parsedRegion = "";
    }
    if(country!=""){
        var parsedCountry = ", " + country;
    }
    else{
        var parsedCountry = "";
    }

    return parsedCity + parsedRegion + parsedCountry;
}

if(argvArr[0]==="concert-this"){
    var artist = argvArr.splice(1).join("%20")
    concertThis(artist);
}

else if(argvArr[0]==="spotify-this-song"){
    if(!argvArr[1]){
        song = "The Sign Ace of Base"
    }
    else{
        var song = argvArr.splice(1).join(" ");
    }
    spotifyThis(song);
}

else if(argvArr[0]==="movie-this"){
    if(!argvArr[1]){
        console.log("If you haven't watched 'Mr. Nobody', then you should: <http://www.imdb.com/title/tt0485947/\>")
        console.log("It's on Netflix!")
    }
    else{
        var movie = argvArr.splice(1).join("+")
        movieThis(movie);  
    }
}

else if(argvArr[0]==="do-what-it-says"){
    dwis();
};

function spotifyThis(song){
    spotify.search({ type: 'track', query: song, limit: 1}, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }
        var artists = "";
        data.tracks.items[0].artists.forEach(function(art){
            artists = artists + "\n" + art.name;
        })
        console.log("Artist(s): " + artists);
        console.log("Song's name: " + data.tracks.items[0].name); 
        console.log("Preview link: " + data.tracks.items[0].external_urls.spotify);
        console.log("Album name: " + data.tracks.items[0].album.name);
    });
}

function concertThis(artist){
    axios.get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp")
        .then(function(res){
            res.data.forEach(function(event){
                console.log("---------------------------------------------------------------------------------")
                console.log("Venue name: " + event.venue.name)
                console.log("Venue location: " + venueLocation(event.city,event.region,event.country));
                var parsedDate = moment(event.datetime).format("MM/DD/YYYY")
                console.log("Date of the event: " + parsedDate);
            })
        })
}

function movieThis(movie){
    axios.get("http://www.omdbapi.com/?t=" + movie + "&apikey=75b406e")
        .then(function(res){
            console.log("Title: " + res.data.Title);
            console.log("Year: " + res.data.Year);
            console.log("IMDB Rating: " + res.data.imdbRating);
            var rotRat = "";
            res.data.Ratings.forEach(function(rat){
                if(rat.Source === "Roten Tomatoes"){
                    rotRat = rat.Value;
                }
            })
            console.log("Rotten Tomatoes Rating: " + rotRat);
            console.log("Country: " + res.data.Country);
            console.log("Language: " + res.data.Language);
            console.log("Plot: " + res.data.Plot);
            console.log("Actors: " + res.data.Actors);
        })
}

function dwis(){
    fs.readFile("./random.txt", 'utf8', function(err, data){
        if(!err){
            var dwisArray = data.split(",");
            dwisArray[1] = dwisArray[1].replace(/"/g,"");
            if(dwisArray[0] === "concert-this"){
                concertThis(dwisArray[1]);
            }
            else if(dwisArray[0] === "spotify-this-song"){
                spotifyThis(dwisArray[1]);
            }
            else if(dwisArray[0] === "movie-this"){
                movieThis(dwisArray[1]);
            }
            else{
                console.log("The file random.txt does not contain a valid command")
            }
        } 
        else{
            console.log(err);
            return;
        }
    });
    // 
}