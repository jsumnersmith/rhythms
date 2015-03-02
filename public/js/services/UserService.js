module.exports = function(){
  angular.module('UserService', []).factory('LoginService', ['$http', function($http) {

    return {
      // call to get all nerds
      logIn: function() {
        return $http.post('/api/login', data);
      },
      logOut: function(){
        return $http.post('/api/logout', data);
      },
      signUp: function(data){
        return $http.post('/api/signup', data);
      }


      // // these will work when more API routes are defined on the Node side of things
      // // call to POST and create a new poem
      // create : function(nerdData) {
      //   return $http.post('/api/poems', poemData);
      // },
      //
      // // call to DELETE a poem
      // delete : function(id) {
      //   return $http.delete('/api/poems/' + id);
      // }
    }

  }]);
}
