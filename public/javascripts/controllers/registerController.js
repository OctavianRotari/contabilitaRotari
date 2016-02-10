app.controller('registerController', ['$scope', '$location', 'AuthService', function ( $scope, $location, AuthService) {
  console.log(AuthService.getUserStatus());

  $scope.register = function () {
    $scope.error = false;
    $scope.disabled = true;

    AuthService.register( $scope.registerForm.username, $scope.registerForm.password )
    .then(function () {
      $location.path('/login');
      $scope.disabled = false;
      $scope.registerForm = {};
    })

    .catch(function () {
      $scope.error = true;
      $scope.errorMessage = 'Something went wrong!';
      $scope.disabled = false;
      $scope.registerForm = {};
    });
  };
} ]);
