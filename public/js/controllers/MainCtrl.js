var $ = require('jquery');
module.exports = function(){
  angular.module('MainCtrl', []).controller('MainController', function($scope, $http) {

    // $scope.signupForm = {};
    // $scope.signup = function(){
    //   $http({
    //     method  : 'POST',
    //     url     : '/api/signup',
    //     data    : JSON.stringify($scope.poemForm),  // pass in data as strings
    //     headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
    //   })
    // }

  });
}
