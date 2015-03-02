module.exports = function(){
  angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

    $routeProvider

      // home page
      .when('/', {
        templateUrl: '/views/home.html',
        controller: 'MainController'
      })
      .when('/signup', {
        templateUrl: '/views/signup.html',
        controller: 'SignupController'
      })
      .when('/login', {
        templateUrl: '/views/login.html',
        controller: 'LoginController'
      })
      .when('/profile', {
        templateUrl: '/views/profile.html',
        controller: 'ProfileController'
      })
      .when('/style', {
        templateUrl: '/views/styleguide.html',
        //controller: 'ParserController'
      });


    $locationProvider.html5Mode({enabled: true, requireBase: false});

  }]);
}
