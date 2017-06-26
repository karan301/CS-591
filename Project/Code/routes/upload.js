var express = require('express');
var router = express.Router();

// Needed for image download/upload
var request = require('request');
var fs = require('fs');

// Configure AWS
var AWS = require('aws-sdk');
var AWS = require('aws-sdk/global');
var S3 = require('aws-sdk/clients/s3');
var s3 = new AWS.S3()
AWS.config.update({region: 'us-east-1'});

// Upload local image to S3
var upload = function(filename) {
	fs.readFile(filename, function (err, data) {
	  if (err) {throw err}
	  
  	var base64data = new Buffer(data, 'binary');
  	
  	s3.putObject({
    	Bucket: 'cs591-mean',
    	Key: filename,
    	Body: base64data
  	}, function (resp) {
    console.log('Image uploaded.');
  })
  	
	})
} 

router.get('/', function (req, res, next) {
    let filename = 'utest.jpg'
    upload(filename)
    res.send('Image uploaded')
})

module.exports = router;