app.factory('AuthService',['$q', '$timeout', '$http', '$cookieStore', function ( $q, $timeout, $http, $cookieStore ) {
  var user = null;

  function isLoggedIn() {
    if (user) {
      return true;
    }
    else {
      return false;
    }
  }

  function getUserStatus() {
    // create a new instance of deferred
    var deferred = $q.defer();
    // send a get request to the server
    $http.get('/user/auth')
    // handle success
    .success(function (data) {
      user = true;
      deferred.resolve();
    })
    // handle error
    .error(function (data) {
      user = false;
      deferred.reject();
    });
    // return promise object
    return deferred.promise;
  }

  function login(username, password) {
    var deferred = $q.defer();
    $http.post('/user/login', { username: username, password: password, online: true })
    .success(function ( data, status ) {
      if ( status === 200 && data.status ) {
        user = true;
        deferred.resolve();
      }
      else {
        user = false;
        deferred.reject();
      }
    })
    .error( function ( data ) {
      user = false;
      deferred.reject( data );
    });
    return deferred.promise;
  }

  function logout() {
    var deferred = $q.defer();
    $http.get('/user/logout')
    .success( function ( data ) {
      user = false;
      deferred.resolve(data);
    })
    .error( function ( data ) {
      user = false;
      deferred.reject(data);
    });
    return deferred.promise;
  }

  function register( username, password ) {
    var deferred = $q.defer();
    $http.post('/user/register', { username: username, password: password })
    .success( function (data, status) {
      if (status === 200 && data.status ) {
        user = true;
        deferred.resolve();
      }
      else {
        deferred.reject();
      }
    })
    .error( function (data) {
      deferred.reject(data);
    });
    return deferred.promise;
  }
  return ({
    isLoggedIn: isLoggedIn,
    getUserStatus: getUserStatus,
    login: login,
    logout: logout,
    register: register
  });
}
]);
