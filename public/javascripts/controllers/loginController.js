app.controller('loginController',['$scope', '$location', 'AuthService', function($scope, $location, AuthService){
  console.log(AuthService.getUserStatus());

  $scope.error = false;
  $scope.disable = true;

  $scope.login = function () {
    AuthService.login($scope.loginForm.username, $scope.loginForm.password)
    .then( function () {
      $location.path('/');
      $scope.disable = true;
      $scope.loginForm = {};
    })
    .catch( function () {
      console.log("something")
      $scope.error = true;
      $scope.errorMessage = 'Password o username sbagliati';
      $scope.disable = false;
      $scope.form = {};
    });
  };
} ]);
