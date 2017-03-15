angular.module('myApp.controllers').
controller('NavCtrl', ['$scope','$location','SecurityService', function($scope, $location, SecurityService) {

$scope.logout = function() {
      SecurityService.logout(function(response) {
        console.log("Logout!");
        $location.url('/');
      });
}


}]);
