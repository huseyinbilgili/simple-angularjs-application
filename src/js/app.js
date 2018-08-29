var ajs = angular.module('personalization', ['ngRoute', 'ngStorage'])
  .constant('Endpoints', (function () {
    var API_DOMAIN = "http://0.0.0.0:8005";
    return {
      createRole: API_DOMAIN + "/users/role/create_role/",
    }
  })())
  .config(['$locationProvider', function ($locationProvider) {
    $locationProvider.hashPrefix('');
  }])
  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider.
      when('/login', {
        redirectTo: function (routeParams) {
          window.location = '/login.html';
        },
      }).
      when('/', {
        templateUrl: '/views/home/index.html',
        controller: 'HomeController'
      }).
      when('/404', {
        templateUrl: '/views/helpers/404.html'
      }).
      otherwise({
        redirectTo: '/404'
      });
  }]);
