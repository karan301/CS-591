// Downloads image from URL to local

var express = require('express');
var router = express.Router();

// Needed for image download/upload
var request = require('request');
var fs = require('fs');

// Configure AWS
var AWS = require('aws-sdk');
var AWS = require('aws-sdk/global');
var S3 = require('aws-sdk/clients/s3');
AWS.config.update({region: 'us-east-1'});

// Download image to local
var download = function(uri, filename, callback) {
  request.head(uri, function(err, res, body) {
    console.log('content-type:', res.headers['content-type']);
    console.log('content-length:', res.headers['content-length']);

    request(uri).pipe(fs.createWriteStream(filename)).on('close', callback)
  })
}

router.post('/', function (req, res, next) {
    let uri = req.body.uri
    let filename = 'utest.jpg'
    
    console.log(uri)
    
    download(uri, filename, function() {
    	console.log('File downloaded.')
    })
    
    res.send ('Ready to go.')
    
})

module.exports = router;