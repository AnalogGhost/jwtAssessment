var app = angular.module('jwt', []);

app.config(function($httpProvider) {
        $httpProvider.interceptors.push('jwtInterceptor');
    })
    .service('jwtInterceptor', function jwtInterceptor() {
        return {
            request: function(config) {
                if (localStorage.token) {
                    config.headers.Authorization = 'Bearer ' + localStorage.token;
                }
                return config;
            }
        }
    })

app.controller('jwtController', ['$scope', '$http', function($scope, $http) {

    $scope.view = {};

    $scope.login = function() {
        $http.get('/login').then(function(res) {
            localStorage.token = res.data.token;
        });
    };

    $scope.protected = function() {
        $http.get('/protected').then(function successfulCallback(response) {
            $scope.view.response = response.data;
        }, function errorCallback(response) {
            $scope.view.response = "ERROR";
        });
    }
}]);
