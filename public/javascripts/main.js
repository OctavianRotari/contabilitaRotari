var app = angular.module('app', ['ngRoute', 'ngCookies']);

app.run(function ($rootScope, $location, $route, AuthService) {
  $rootScope.$on('$routeChangeStart', function (event, next, current) {
    if ( next.access.restricted && AuthService.isLoggedIn() === false) {
      $location.path('/login');
      $route.reload();
    }
    if (next.access.restricted && !AuthService.getUserStatus()) {
      $location.path('/');
    }
  });
});

app.config([ '$routeProvider', function ( $routeProvider ) {
  $routeProvider
  .when('/', {
    templateUrl: 'views/home.html',
    access: { restricted: true }
  })
  .when('/login', {
    templateUrl: 'views/login.html',
    controller: 'loginController',
    access: { restricted: false }
  })
  .when('/logout', {
    controller: 'logoutController'
  })
  .when('/register', {
    templateUrl: 'views/register.html',
    controller: 'registerController',
    access: { restricted: false }
  })
  .when('/fatture', {
    templateUrl: 'views/fatture.html',
    access: { restricted: true }
  })
  .when('/stipendi',{
    templateUrl: 'views/stipendi',
    access: { restricted: true }
  })
  .otherwise({ redirectTo: '/' });
} ]);
