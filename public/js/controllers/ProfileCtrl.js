module.exports = function(){
  angular.module('ProfileCtrl', []).controller('ProfileController', function($scope, $http, $location, $cookieStore) {
    $scope.user = $cookieStore.get('user');
    console.log($scope.user);
  });
}
