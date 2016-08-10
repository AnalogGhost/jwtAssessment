var app = angular.module('jwt',[]);

app.config(function ($httpProvider) {
  $httpProvider.interceptors.push('jwtInterceptor');
})
.service('jwtInterceptor', function jwtInterceptor(){
  //TODO: Attach the token to every request.
  return {
    request: function(config) {
      if (localStorage.jwt) {
        config.headers.Authorization = 'Bearer ' + localStorage.jwt;
      }
      return config;
    }
  }
})

app.controller('jwtController',['$scope','$http', function($scope,$http) {

  $scope.view = {};

  $scope.login = function() {
    $http.get('/login').then(function (res) {
      //TODO:Store token in localstorage
      localStorage.jwt = res.data.token;
    });
  };

  $scope.protected = function () {
    $http.get('/protected').then(function successfulCallback(response) {
      console.log(response.data)
      if (localStorage.jwt) {
        $scope.view.response = response.data;
      }
    });
  }
}]);
