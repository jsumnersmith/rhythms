module.exports = function(){
  angular.module('SignupCtrl', []).controller('SignupController', function($scope, $http, $location, $cookieStore) {
    $scope.signupForm = {};
    $scope.signup = function(){
      var signupData = JSON.stringify($scope.signupForm)
      $http.post('/api/signup', signupData)
        .success(function(data, status, headers, config) {
          $cookieStore.put('user', data);
          $location.path('/profile/');
        })
        .error(function(data, status, headers, config) {
          console.log("Sorry.", data);
        });
    }
  });
}
