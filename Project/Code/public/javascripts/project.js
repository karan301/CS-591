
angular.module('cs591', [])
    .directive('nameDisplay', function() {
        return {
            scope: true,
            restrict: 'EA',
            template: "<b>This can be anything {{name}}</b>"}
    })
    .controller('cs591ctrl', function($scope, $http){

        // READ (GET)
        $scope.getMovies = function() {
            $http.get('http://45.56.104.88:3000/imdb')
                .then(function(response){
                    $scope.users = response.data;

                })
        };
        
        //CREATE (POST)
        $scope.searchImage = function() {
            var downrequest = {
                method: 'post',
                url: 'http://45.56.104.88:3000/download',
                data: {
                    uri: $scope.uri
                }
            };
            $http(downrequest)
                .then(function(response){
                    var uprequest = {
		                method: 'get',
		                url: 'http://45.56.104.88:3000/upload'
		            };
	            	$http(uprequest)
                    $scope.getMovies();
                })
            }
        }   
        
        //UPDATE (PUT)
        $scope.setUserUpdate = function(user) {
            $scope.buttonMessage = "Update User";
            $scope.h2message="Updating ";
            $scope.name=user.name;
            $scope.UID = user.UID;
            $scope.dbID = user._id;
            $scope.department=user.department;

        };
        $scope.updateUser = function (userID) {
            var request = {
                method: 'put',
                url: 'http://localhost:3000/api/db/' + userID ,
                data: {
                    name: $scope.name,
                    UID: $scope.UID,
                    department: $scope.department,
                    _id: userID
                }
            };
            $http(request)
                .then(function(response){
                    $scope.inputForm.$setPristine();
                    $scope.name = $scope.UID = $scope.department = '';
                    $scope.h2message="Add user";
                    $scope.buttonMessage = "Add User";
                    $scope.getUsers();
                    $scope.dbID = null;
                })

        };

        //DELETE (DELETE)
        $scope.deleteUser = function (_id) {

            var request = {
                method: 'delete',
                url: 'http://localhost:3000/api/db/' + _id ,
            };
            $http(request)
                .then(function(response){
                    $scope.inputForm.$setPristine();
                    $scope.name = $scope.UID = $scope.department = '';
                    $scope.getUsers();
                })

        };
      $scope.initApp = function () {
          $scope.buttonState = "create";
          $scope.h2message="IMDB Image Search (beta 3)";
          $scope.buttonMessage = "Upload Image";
          $scope.getMovies();
      }
    })
    //This controller handles toggling the display of details in the user list
    .controller('listController', function ($scope){
        $scope.display = false;

        $scope.showInfo = function() {
            $scope.display = !$scope.display;
        }


    });
