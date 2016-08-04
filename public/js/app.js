var app = angular.module('jwt',[]);

app.config(function ($httpProvider) {
  $httpProvider.interceptors.push('jwtInterceptor');
})
.service('jwtInterceptor', function jwtInterceptor(){
  //TODO: Attach the token to every request.
})

app.controller('jwtController',['$scope','$http', function($scope,$http) {

  $scope.view = {};

  $scope.login = function() {
    $http.get('/login').then(function (res) {
      //TODO:Store token in localstorage
    });
  };

  $scope.protected = function () {
    $http.get('/protected').then(function successfulCallback(response) {
      $scope.view.response = response.data;
    }, function errorCallback(response) {
      $scope.view.response = "ERROR";
      console.log(response);
    });
  }
}]);
