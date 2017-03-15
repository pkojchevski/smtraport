angular.module('myApp.controllers').
controller("loginController", ['$scope','$location','$rootScope', 'SecurityService','messages',
 function($scope, $location, $rootScope, SecurityService, messages) {

$scope.login = function(user) {
  console.log("user:"+user.username+' password:'+user.password);
  SecurityService.login(user, function(userCallback) {
    console.log("usuario:"+JSON.stringify(userCallback));
    if(userCallback === "Unauthorized") {
      messages(userCallback);
      $scope.user.username = "";
      $scope.user.password = "";
    } else {
      $location.url('/daily');
    }

  });
};




}]);
