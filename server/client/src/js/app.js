var app=angular.module("myApp",['ngRoute',"ngMessages","myApp.controllers", "myApp.services","myApp.directives",
    '720kb.datepicker',"myApp.filters",'angular-growl', 'ui.bootstrap']).constant('_', window._);

app.config(["growlProvider", function(growlProvider) {
     growlProvider.globalTimeToLive(3000);
}]);


app.config(['$routeProvider','$httpProvider','growlProvider',
function($routeProvider, $httpProvider, growlProvider) {
    $routeProvider
                .when("/login", {
                templateUrl:"views/login.html",
                controller:"loginController"
            })
                .when("/daily", {
                templateUrl:"views/daily.html",
                controller:"dailyController",
                resolve   : {
                  loggedin : checkLoggedIn
                }
    })
                .when("/weekly", {
                    templateUrl:"views/weekly.html",
                    controller:"weeklyController"
    })
                .when("/monthly", {
                templateUrl:"views/monthly.html",
                controller:"monthlyController"
    })
                .when("/yearly", {
                templateUrl:"views/yearly.html",
                controller:"yearlyController"
    })
                .when("/capacity", {
                templateUrl:"views/capacity.html",
                controller:"capacityController",
                resolve   : {
                  loggedin : checkLoggedIn
                }
    })
                .when("/utilityWeekRec", {
                templateUrl:"views/utilityWeekRec.html",
                controller:"utilityWeeklyRecords"
    })
                 .when("/utilityWeekProd", {
                 templateUrl:"views/utilityWeekProd.html",
                 controller:"utilityWeeklyProducts"
})
                .otherwise({
                  redirectTo:'/'
                });


    $httpProvider.interceptors.push(function($q, $location, $rootScope, messages) {
      return {
        response:function(response) {
          $rootScope.unauthorized = true;
          return response;
        },
        responseError:function(response) {
          if(response.status === 401) {
            $location.url('/login');
            return $q.reject(response);
            console.log("unauthorized");
            $rootScope.unauthorized = false;
          };
          if(response.status === 404) {
            $location.url('/login');
              messages('userNotFound');
            return $q.reject(response);
          }
          if(response.status === 403) {
            messages('forbidden');
          return $q.reject(response);
          }
        }
      }
    });

  growlProvider.globalPosition('bottom-center');

  }]);

    var checkLoggedIn = function ($q, $location, $http, $timeout, $rootScope) {
      var deferred = $q.defer();
      $http.get('http://localhost:3000/loggedin').success(function(user) {
        $rootScope.errorMessage = null;
        if(user != 0) {
          console.log('checkLoggedIn');
          $rootScope.currentUser = user;
          if (user.role === 'admin') {
            $rootScope.checkRole = 'false';
          }
           if (user.role !== 'admin') {
            $rootScope.checkRole = 'true';
          }
          deferred.resolve();
        } else {
          $rootScope.errorMessage = "You need to login";
          deferred.reject();
          $location.url('/login');
        }
      });
      console.dir("deferred.promise:"+ JSON.stringify(deferred.promise));
      return deferred.promise;
    };



  app.config(function ($httpProvider) {
  $httpProvider.defaults.headers.common = {};
  $httpProvider.defaults.headers.put['Content-Type'] =  'application/json';
  $httpProvider.defaults.headers.post['Content-Type'] =  'application/json';
  $httpProvider.defaults.headers.delete = {};
  $httpProvider.defaults.headers.patch = {};
  $httpProvider.defaults.headers.options = {};
});
