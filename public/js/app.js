var app = angular.module('jwt',[]);

app
  .config($httpProvider => $httpProvider.interceptors.push('jwtInterceptor'))
  .service('jwtInterceptor', function(){return {request: config => { // angular needs to bind this scope
    if(localStorage.token) config.headers.Authorization = "Bearer " + localStorage.token;
    return config;
  }}})
  .controller('jwtController',['$scope','$http', ($scope, $http) => {
    $scope.view = {};
    $scope.login = () => $http.get('/login').then(res => localStorage.token = res.data.token);
    $scope.protected = () => {
      $http.get('/protected').then(response => {
        $scope.view.response = response.data;
      }, response => {
        $scope.view.response = "ERROR";
        console.log(response);
      });
    }
  }]);
