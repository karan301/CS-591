var express = require('express');
var router = express.Router();

var i2b = require('imageurl-base64');
var request = require('request');
var fs = require('fs');
var Upload = require('s3-uploader');
var s3img = require('s3img');

var AWS = require('aws-sdk');
var AWS = require('aws-sdk/global');
var S3 = require('aws-sdk/clients/s3');

AWS.config.update({region: 'us-east-1'});
/* 
function img () {
	i2b("https://images-na.ssl-images-amazon.com/images/M/MV5BOTI3ODk1MTMyNV5BMl5BanBnXkFtZTcwNDEyNTE2Mg@@._V1_UY317_CR6,0,214,317_AL_.jpg", function(err,data) {
		if (err) {console.log('i2b Error')}
		if (data) {return data.base64}
	})
}       */
/*
var fs = require('fs'),
    request = require('request');

var download = function(uri, filename, callback){
  request.head(uri, function(err, res, body){
    console.log('content-type:', res.headers['content-type']);
    console.log('content-length:', res.headers['content-length']);

    request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
  });
};

download('https://images-na.ssl-images-amazon.com/images/M/MV5BMjQ1MjI5ODI3Nl5BMl5BanBnXkFtZTcwNTQzOTM0Mw@@._V1_UY317_CR7,0,214,317_AL_.jpg', 's3test.JPG', function(){
  console.log('done');
*/
/*
// Read in the file, convert it to base64, store to S3
fs.readFile('s3test.JPG', function (err, data) {
  if (err) { throw err; }

  var base64data = new Buffer(data, 'binary');

  var s3 = new AWS.S3();
  s3.putObject({
    Bucket: 'cs591-mean',
    Key: 's3test.jpg',
    Body: base64data,
  },function (resp) {
    console.log(arguments);
    console.log('Successfully uploaded package.');
  });

});
*/
var params = {
	Image: {
		S3Object: {
			Bucket: 'cs591-mean',
			Name: 's3test.jpg'
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
			console.log(name)
		} 
	});
});

module.exports = router; 