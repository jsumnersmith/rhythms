module.exports = function(){
  angular.module('LoginCtrl', []).controller('LoginController', function($scope, $http, $location, $cookieStore) {
    $scope.loginForm = {};
    $scope.login = function(){
      var loginData = JSON.stringify($scope.loginForm)
      $http.post('/api/login', loginData)
        .success(function(data, status, headers, config) {
            $cookieStore.put('user', data);
            $location.path('/profile/'+data.id);
        })
        .error(function(data, status, headers, config) {
          // called asynchronously if an error occurs
          // or server returns response with an error status.
          console.log("Sorry.", data);
        });
    }
  });
}
