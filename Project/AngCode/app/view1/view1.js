'use strict';

/* var AWS = require('aws-sdk');
var AWS = require('aws-sdk/global');
var S3 = require('aws-sdk/clients/s3'); */

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', [function() {
/* 	var params = {
	    Image: {
		Bytes: new Buffer('picture') || '4RBORXhpZgAATU0AKgAAAAgABQEaAAUAAAABAAAASgEbAAUAAAABAAAAUgEoAAMAAAABAAIAAAITAAMAAAABAAEAAIdpAAQAAAABAAAAWgAAALQAABJbAAAAMgAAElsAAAAyAAeQAAAHAAAABDAyMjGRAQAHAAAABAECAwCgAAAHAAAABDAxMDCgAQADAAAAAQABAACgAgAEAAAAAQAABEygAwAEAAAAAQAAAoSkBgADAAAAAQAAAAAAAAAAAAYBAwADAAAAAQAGAAABGgAFAAAAAQAAAQIBGwAFAAAAAQAAAQoBKAADAAAAAQACAAACAQAEAAAAAQAAARICAgAEAAAAAQAADzIAAAAAAAAASAAAAAEAAABIAAAAAf'
	    }
	};

	var rekognition = new AWS.Rekognition();
	rekognition.recognizeCelebrities(params, function (err, data) {
	    if (err) console.log(err, err.stack);
	    else console.log(data);
	}); */
}]);
