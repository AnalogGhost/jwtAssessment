var app = angular.module('jwt',[]);

app.config(function ($httpProvider) {
  $httpProvider.interceptors.push('jwtInterceptor');
})
.service('jwtInterceptor', function jwtInterceptor(){
  return {
    request: function(config){
      config.headers.user = localStorage.jwt;
      console.log(config.headers.user);
      return config;
    }
  }
})

app.controller('jwtController',['$scope','$http', function($scope,$http) {

  $scope.view = {};

  $scope.login = function() {
    $http.get('/login').then(function (res) {
      localStorage.jwt = res.data.token
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
