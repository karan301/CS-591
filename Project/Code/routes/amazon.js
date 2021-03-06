// Used to talk to AWS and Rekognition

var express = require('express');
var router = express.Router();

// Connect and configure AWS
var AWS = require('aws-sdk');
var AWS = require('aws-sdk/global');
var S3 = require('aws-sdk/clients/s3');
AWS.config.update({region: 'us-east-1'});

// Uploads the image to an S3 bucket
// You can change the variable names (see GitHub documentation)
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
			name = data.CelebrityFaces[0].Name; // Pulls celebrity name from response
			id = data.CelebrityFaces[0].Urls[0].match(/nm(.*)/)[0]; // Pulls IMDB ID using RegEx
			res.send(name)
			
		} 
	});
});

module.exports = router;