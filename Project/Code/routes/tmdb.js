// Used to talk to the TMDB API

var express = require('express');
var router = express.Router();

// Grab config for TMDB
// See installation section of GitHub documentation for more
const tmdbConfig = require('../config/tmdb')
var api_key = tmdbConfig.API_KEY

// Lots of code from `./amazon.js` repeated here
// See that (or documentation) for more
var request = require('request-promise');
var AWS = require('aws-sdk');
var AWS = require('aws-sdk/global');
var S3 = require('aws-sdk/clients/s3');
AWS.config.update({region: 'us-east-1'});

var params = {
	Image: {
		S3Object: {
			Bucket: 'cs591-mean',
			Name: 'utest.jpg'
		}
	}
};

var rekognition = new AWS.Rekognition();

router.get('/', function(req, res, next) {
	rekognition.recognizeCelebrities(params, function (err, data) {
		if (err) console.log(err, err.stack);
		else {
			name = data.CelebrityFaces[0].Name; // Pulls celebrity name from response9
			id = data.CelebrityFaces[0].Urls[0].match(/nm(.*)/)[0]; // Pulls IMDB ID using RegEx
			
			// Here's the stuff unique to TMDB
			request('https://api.themoviedb.org/3/find/' + id + '?api_key=' + api_key + '&language=en-US&external_source=imdb_id') // API call
				.then (function (response) {
					list = JSON.parse(response).person_results[0].known_for // Parse JSON for 'known for'
					// Add the movies they're known for to an array
					movies = []
					for (i = 0; i < list.length; i++) {
						movies[i] = list[i].title
					}
					console.log(movies)
					res.json(movies)
				});	
		} 
	});
});

module.exports = router;