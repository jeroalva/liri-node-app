# LIRI Bot

### Overview

This app let's you search for 3 different things:
1 - Spotify songs
2 - Movies
3 - Concerts

It let's you search through the CLI directly with arguments or you can use a TXT file to write the arguments and run the txt file with a 4th option that we call "Do what it says"

### Technology

To retrieve the data that powers this app, we use the `axios` package for:
 1 - Spotify songs: Spotify API
 2 - Movies: OMDB API
 3 - Concerts: Bands in Town API  

    * [Node-Spotify-API](https://www.npmjs.com/package/node-spotify-api)

    * [Axios](https://www.npmjs.com/package/axios)

    * [OMDB API](http://www.omdbapi.com) and the [Bands In Town API](http://www.artists.bandsintown.com/bandsintown-api)

We also use the following packages:

    * Moment to transform the date format that we get in the Concerts functionality of the APP [Moment](https://www.npmjs.com/package/moment)

    * DotEnv to get the API Keys from a .env file and therefore be able to ignoge via Git Ignore the .env file and not share our personal keys to the web [DotEnv](https://www.npmjs.com/package/dotenv)


### Instructions

1. We ran `npm init -y` to initialize a `package.json` file for our project. The `package.json` file stores the different packages' information that the APP uses so that other people can install them to run the APP

2. We created a gitignore file in the root folder to specify that the .env did not have to be pushed to git because that is where our spotify keys are stored

3. We created a JavaScript file named `keys.js` that is used to extract the information from the particular .env file of each client

4. The .env file is where each client stores it's spotify keys and it is referenced inside the keys.js file

5. We also created a random.txt file that is used for the functionality do-what-it says. In this file the client can change the contents to run other examples

6. The `liri.js` is the main file for the project. Inside we created 3 different functions (one for each functionality that we described above):
    - spotifyThis: The spotifyThis takes 1 parameter (song) and uses the node spotify api to search spotify for information of this song
    - movieThis: The movieThis uses axios to request information from the OMDB API taking in one parameter which is the name of the movie
    - concertThis: The concertThis uses axios to get information from the bands in town api using one parameter which is the name of the artist and logs the information that we get from bands in town

We also define one other function which is venueLocation which parses the city, region and country that we have recieved in the concertThis function into a string with "," (commas)

We then catch the arguments from the console and depending on the command run the corresponding function
