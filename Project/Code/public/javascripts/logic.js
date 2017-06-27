
angular.module('cs591', [])
    .directive('nameDisplay', function() {
        return {
            scope: true,
            restrict: 'EA',
            template: "<b>This can be anything {{name}}</b>"}
    })
    .controller('cs591ctrl', function($scope, $http){

        // Get results of search
        $scope.searchImage = function() {
            var downrequest = {
                method: 'post',
                url: 'http://45.56.104.88:3000/download',
                data: {
                    uri: $scope.uri
                }
            };
            var uprequest = {
            	method: 'get',
		        url: 'http://45.56.104.88:3000/upload'
		    };
		    $http(downrequest)
		    	.then(function(response) {
		    		setTimeout(function() {
		    			$http(uprequest)
		    			.then(function(response) {
		    				setTimeout(function() {
		    					$scope.getMovies()
		    				}, 1000)
		    			})
		    		}, 1000)
		    	})
        }
        
        // Perform search query
        $scope.getMovies = function() {
            $http.get('http://45.56.104.88:3000/imdb')
                .then(function(response) {
                    $scope.users = response.data;
                    $scope.h3message = "Showing results for ";
                })
            $http.get('http://45.56.104.88:3000/amazon')
                .then(function(response){
                    $scope.h3celeb = response.data;
                })
        };
        
        // Save to Database
        $scope.saveResults = function() {
        	var dbrequest = {
                method: 'post',
                url: 'http://45.56.104.88:3000/db',
                data: {
                    name: $scope.h3celeb
                }
            };
            $http(dbrequest)
        }
        
        // Get list from Database
        $scope.viewResults = function() {
            $http.get('http://45.56.104.88:3000/db')
                .then(function(response) {
                	$scope.h3message = "Showing saved searches"
                	$scope.h3celeb = ""
                    $scope.users = response.data;
                })
        }
        
        // Remove all from Database
        $scope.removeAll = function() {
            $http.delete('http://45.56.104.88:3000/db')
            	.then(function(response) {
            		setTimeout(function() {
		    			$scope.viewResults()
		    		}, 500)
            	})
        }  

      // Initialize the form and stuff
      $scope.initApp = function () {
          $scope.buttonState = "create";
          $scope.h2message="Welcome to IMDB Search";
          $scope.buttonMessage = "Upload Image";
      }
    })
    //This controller handles toggling the display of details in the user list
    .controller('listController', function ($scope){
        $scope.display = false;

        $scope.showInfo = function() {
            $scope.display = !$scope.display;
        }


    });