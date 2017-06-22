var express = require('express');
var router = express.Router();

// Initiate mongoose connection
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/cs591/')
const db = mongoose.connection
db.once('open', function () {
  console.log('Connection successful.')
})

// Define schema as len
const Schema = mongoose.Schema
const celebSchema = new Schema({
    name: String
})
const celeb = mongoose.model('celeb', celebSchema)


var AWS = require('aws-sdk');
var AWS = require('aws-sdk/global');
var S3 = require('aws-sdk/clients/s3');

AWS.config.update({region: 'us-east-1'});

var params = {
	Image: {
		S3Object: {
			Bucket: 'cs591-mean',
			Name: 'kid.JPG'
		}
	}
};

var rekognition = new AWS.Rekognition();

router.get('/', function(req, res, next) {
  rekognition.recognizeCelebrities(params, function (err, data) {
	if (err) console.log(err, err.stack);
	else {
		name = data.CelebrityFaces[0].Name; // Pulls celebrity name from response
		id = data.CelebrityFaces[0].Urls[0].match(/nm(.*)/)[0]; // Pulls IMDB ID using RegEx
		
		const newCeleb = new celeb ({name: name});
		newCeleb.save(function(err) {
			if (err) {res.send(err)}
			else {res.send (newCeleb)}
	    });	
	} 
	});
});

module.exports = router;