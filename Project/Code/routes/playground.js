var express = require('express');
var router = express.Router();

var i2b = require('imageurl-base64');

var AWS = require('aws-sdk');
var AWS = require('aws-sdk/global');
var S3 = require('aws-sdk/clients/s3');

AWS.config.update({region: 'us-east-1'});

function img () {
	i2b("https://images-na.ssl-images-amazon.com/images/M/MV5BOTI3ODk1MTMyNV5BMl5BanBnXkFtZTcwNDEyNTE2Mg@@._V1_UY317_CR6,0,214,317_AL_.jpg", function(err,data) {
		if (err) {console.log('i2b Error')}
		if (data) {return data.base64}
	})
}      
  
var params = {
	Image: {
		Bytes: img(),
	}
};

var rekognition = new AWS.Rekognition();

router.get('/', function(req, res, next) {
  rekognition.recognizeCelebrities(params, function (err, data) {
	if (err) console.log(err, err.stack);
	else {
		name = data.CelebrityFaces[0].Name; // Pulls celebrity name from response
		id = data.CelebrityFaces[0].Urls[0].match(/nm(.*)/)[0]; // Pulls IMDB ID using RegEx
			
	} 
	});
});

module.exports = router; 