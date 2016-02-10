var app = angular.module('app', ['ngRoute']);

app.config([ '$routeProvider', function ( $routeProvider ) {
  $routeProvider
  .when('/', {
    templateUrl: 'views/home.html'
  })
  .when('/login', {
    templateUrl: 'views/login.html',
    controller: 'loginController'
  })
  .when('/logout', {
    controller: 'logoutController'
  })
  .when('/register', {
    templateUrl: 'views/register.html',
    controller: 'registerController'
  })
  .when('/fatture', {
    templateUrl: 'views/fatture.html'
  })
  .when('/stipendi',{
    templateUrl: 'views/stipendi'
  })
  .otherwise({ redirectTo: '/' });
} ]);
