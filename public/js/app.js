var app = angular.module('jwt',[]);

app.config(function ($httpProvider) {
  $httpProvider.interceptors.push('jwtInterceptor');
})
.service('jwtInterceptor', function jwtInterceptor(){
  //TODO 3
  return {
    request: function(config){
      if (localStorage.jwt) {
        config.headers.Authorization = 'Bearer ' + localStorage.jwt;
      }
      return config;
    }
  };
})

app.controller('jwtController',['$scope','$http', function($scope,$http) {

  $scope.view = {};

  $scope.login = function() {
    $http.get('/login').then(function (res) {
      //TODO 2
      localStorage.jwt = res.data.token;
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
