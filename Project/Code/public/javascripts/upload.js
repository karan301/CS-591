angular.module('cs411', [])
    .directive('nameDisplay', function() {
        return {
            scope: true,
            restrict: 'EA',
            template: "<b>This can be anything {{name}}</b>"}
    })
    .controller('cs411ctrl', function($scope, $http){ 

	var albumBucketName = 'cs-591';
var bucketRegion = 'us-west-2';
var IdentityPoolId = 'us-west-2:cecc58ed-0cc4-438d-aba1-8cc4b11d2cec';

AWS.config.update({
  region: bucketRegion,
  credentials: new AWS.CognitoIdentityCredentials({
    IdentityPoolId: IdentityPoolId
  })
});

var s3 = new AWS.S3({
  apiVersion: '2006-03-01',
  params: {Bucket: albumBucketName}
});
	
	$scope.addPhoto = function addPhoto(albumName) {
	  var files = document.getElementById('photoupload').files;
	  if (!files.length) {
	    return alert('Please choose a file to upload first.');
	  }
	  var file = files[0];
	  var fileName = file.name;
	  var albumPhotosKey = encodeURIComponent(albumName) + '//';
	
	  var photoKey = albumPhotosKey + fileName;
	  s3.upload({
	    Key: photoKey,
	    Body: file,
	    ACL: 'public-read'
	  }, function(err, data) {
	    if (err) {
	      return alert('There was an error uploading your photo: ', err.message);
	    }
	    alert('Successfully uploaded photo.');
	    viewAlbum(albumName);
	  });
	}

//}