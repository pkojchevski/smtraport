var app=angular.module("myApp.controllers")
        .controller("weeklyController",["$scope", "$filter", "$timeout", "columnChart",
    "pieChart","columnCharPP", "weeklyProductForPeriod", "weeklyRecordForPeriod",
    function($scope, $filter, $timeout, columnChart, pieChart, columnCharPP, weeklyProductForPeriod,
    weeklyRecordForPeriod) {

$scope.clear = function() {
  $scope.date = null;
  $scope.secDate = null;
};

$scope.formats = ['dd-MM-yy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
 $scope.format = $scope.formats[0];
 $scope.altInputFormats = ['dd-MM-yy'];

$scope.popup1 = {
   opened: false
 };


  $scope.dateOptions = {
    dateDisabled: disabled,
    formatYear: 'yy',
    formatMonth:'MM',
    formatDay:'dd',
    //maxDate: new Date(2020, 5, 22),
    // minDate: new Date(),
    startingDay: 1
  };

  // Disable selection of dates
  function disabled(data) {
    var date = data.date;
    var mode = data.mode;
    return mode === 'day' && (date.getDay() !== 1);
  }

  $scope.open = function() {
    $scope.popup1.opened = true;
  };

  function getDayClass(data) {
    var date = data.date,
      mode = data.mode;
    if (mode === 'day') {
      var dayToCheck = new Date(date).setHours(0,0,0,0);
      for (var i = 0; i < $scope.events.length; i++) {
        var currentDay = new Date($scope.events[i].date).setHours(0,0,0,0);

        if (dayToCheck === currentDay) {
          return $scope.events[i].status;
        }
      }
    }

    return '';
  }

    var x, y;
    $scope.weekArrDates = [];
    $scope.weekArrDays = [];
    $scope.start = false;

              function arrangeRecords(arr) {
                //console.log('arr:'+JSON.stringify(arr));
                  var out = [];
                  var firstday, day, name, text, details;
                  var values;
                  var arr2 = arr.map(function(i) {
                    return i.name;
                  });
                var arr3 = $filter('unique')(arr2);
                for (var j = 0; j <= arr3.length-1; j++) {
                  values = [0,0,0,0,0,0,0];
                    for (var i = 0; i <= arr.length-1; i++) {
                      if (arr[i].name === arr3[j]) {
                        day = moment(arr[i].dateOfProd).isoWeekday();
                        firstday = moment($scope.date).isoWeekday();
                        //console.log('day:'+day);
                        //console.log('firstday:'+firstday);
                        values[day - firstday] += parseInt(arr[i].value);
                        //details = (arr[i].details !== '') ? details + arr[i].details : '' ;
                        text = arr[i].text;
                      }
                  }
                  out[j] = {
                    name : arr3[j],
                    text : text,
                    calweek : moment($scope.date).isoWeek(),
                    values : values,
                    //details : details
                }
                }

                console.log('out:'+JSON.stringify(out));
                return out;
              }

              function arrangeProducts(arr) {
                    console.log('arr:'+JSON.stringify(arr));
                  var out = [];
                  var firstday, day, name, pcbsonpanel, pcbs100, description,productIndex;
                  var weeklyQuantity;
                  var arr2 = arr.map(function(i) {
                    return i.productIndex;
                  });
                  var arr3 = $filter('unique')(arr2);
                for (var j = 0; j <= arr3.length-1; j++) {
                  weeklyQuantity = [0,0,0,0,0,0,0];
                    for (var i = 0; i <= arr.length-1; i++) {
                      if (arr[i].productIndex === arr3[j]) {
                        productIndex = arr[i].productIndex;
                        day = moment(arr[i].prodData).isoWeekday();
                        firstday = moment($scope.date).isoWeekday();
                        weeklyQuantity[day-firstday] += parseInt(arr[i].dailyQuantity);
                        pcbsonpanel = arr[i].pcbsonpanel;
                        pcbs100 = arr[i].pcbs100;
                        description = arr[i].description;
                      }
                  }
                  out[j] = {
                    productIndex : productIndex,
                    calweek : moment($scope.date).isoWeek(),
                    weeklyQuantity : weeklyQuantity,
                    pcbs100 : pcbs100,
                    pcbsonpanel : pcbsonpanel,
                    description : description
                }
                }
                //console.log('out:'+JSON.stringify(out));
                return out;
              }


        //----------------------function when button is clicked------------------------------------//
        var getProducts = function() {
            weeklyProductForPeriod.query({date1:$scope.date, date2:$filter("addDays")($scope.date, 7)}).$promise.then(function(data){
                $scope.productsWeekly = arrangeProducts(data);
            });
        };
//
        var getRecords = function() {
            var k = 0;
            var j = 0;
            var l = 0;
            var pp = [];
            var np = [];
            var prodData = [];
            weeklyRecordForPeriod.query({date1:$scope.date, date2:$filter("addDays")($scope.date, 7)}).
            $promise.then(function(data) {
              //console.log("data for weekly record for period:"+JSON.stringify(data));
                for (var i = 0; i < data.length; i++) {
                    if (data[i].name.split(".")[0] === "prodDataTot") {
                        prodData[j] = data[i];
                        j=j+1;
                    }
                    if(data[i].name.split(".")[0] === "ppTot") {
                        pp[k] = data[i];
                        k=k+1;
                    }
                    if (data[i].name.split(".")[0] === "npTot") {
                        np[l] = data[i];
                        l=l+1;
                    }
                }
          //console.log('prodData:'+JSON.stringify(prodData));
            $scope.prodDataWeekly = arrangeRecords(prodData);
            $scope.ppTotWeekly = arrangeRecords(pp);
            $scope.npTotWeekly = arrangeRecords(np);
          //console.log('$scope.prodDataWeekly:'+JSON.stringify($scope.prodDataWeekly));
            });
        };

//         //--------------click button Show------------------------//

    $scope.showDataForPeriod = function() {
        var eff=[];
        var lo;
        var lc;
        var leff;
        var npstops;
            getProducts();
            getRecords();
            $timeout(function() {
                $scope.prodDataWeeklyTot = $filter("calcWeeklyRecordsTot")($scope.prodDataWeekly);
                $scope.ppTotWeeklyTot = $filter("calcWeeklyRecordsTot")($scope.ppTotWeekly);
                $scope.npTotWeeklyTot = $filter("calcWeeklyRecordsTot")($scope.npTotWeekly);
                $scope.productsWeeklyTot = $filter("calcWeeklyProductsTot")($scope.productsWeekly);
                //console.log("$scope.npTotWeeklyTot:"+$scope.npTotWeeklyTot);
                //console.log("$scope.ppTotWeeklyTot:"+JSON.stringify($scope.ppTotWeeklyTot));
                    for(var i = 0; i < $scope.ppTotWeeklyTot.length; i++) {
                        $scope.ppTotWeeklyTot[i].values[1] = $filter("calcStopsPercent")($scope.prodDataWeekly,$scope.ppTotWeekly,
                        "prodDataTot.lineClosedTot", $scope.ppTotWeeklyTot[i].name);
                    }
                    for(i = 0; i < $scope.npTotWeeklyTot.length; i++) {
                        $scope.npTotWeeklyTot[i].values[1] = $filter("calcStopsPercent")($scope.prodDataWeekly,$scope.npTotWeekly,
                        "prodDataTot.npStopsTot", $scope.npTotWeeklyTot[i].name);
                    }
                    for(i = 0; i < $scope.prodDataWeeklyTot.length; i++) {
                        if($scope.prodDataWeeklyTot[i].name === "prodDataTot.efficiencyTot") {
                           $scope.prodDataWeeklyTot[i].values[0] = $filter("calcWeeklyEff")($scope.prodDataWeekly);
                        }
                        if($scope.prodDataWeeklyTot[i].name === "prodDataTot.lineClosedTot") {
                           $scope.prodDataWeeklyTot[i].values[1] = $filter("calcWeeklyClosed")($scope.prodDataWeeklyTot);
                           lc = parseInt($scope.prodDataWeeklyTot[i].values[1]);
                        }

                        if($scope.prodDataWeeklyTot[i].name === "prodDataTot.lineOpenedTot") {
                           $scope.prodDataWeeklyTot[i].values[1] = $filter("calcWeeklyLineOpened")($scope.prodDataWeeklyTot);
                           lo = parseInt($scope.prodDataWeeklyTot[i].values[1]);
                        }
                        if($scope.prodDataWeeklyTot[i].name === "prodDataTot.npStopsTot") {
                           $scope.prodDataWeeklyTot[i].values[1] = $filter("calcWeeklynpStops")($scope.prodDataWeeklyTot);
                           npstops = parseInt($scope.prodDataWeeklyTot[i].values[1]);
                        }
                        if($scope.prodDataWeeklyTot[i].name === "prodDataTot.lineEffTot") {
                           $scope.prodDataWeeklyTot[i].values[1] = $filter("calcWeeklyLineEff")($scope.prodDataWeeklyTot);
                           leff = parseInt($scope.prodDataWeeklyTot[i].values[1]);
                        }
                    }


                $scope.ppTotWeekly.concat($scope.ppTotWeeklyTot);

                            //planed stops chart
                pieChart(lo,'Lotw.',lc,'PP','container3');
                           //unplaned stops chart
                pieChart(leff,'Leff.',npstops,'NP','container4');
//                           //wydajnośc SMT chart
                columnChart($filter("getWeeklyEff")($scope.prodDataWeekly),[80,80,80,80,80,80,80],$scope.weekArrDays,'container');
////                           //planned stops chart
                x = $filter('sorter')($filter("getStops")($scope.ppTotWeeklyTot), $filter("getNamesFromArray")($scope.ppTotWeeklyTot), 'x');
                y = $filter('sorter')($filter("getStops")($scope.ppTotWeeklyTot), $filter("getNamesFromArray")($scope.ppTotWeeklyTot), 'y');
                columnCharPP(x,[],y,'container5');
//                           //unplaned stops chart
                x = $filter('sorter')($filter("getStops")($scope.npTotWeeklyTot), $filter("getNamesFromArray")($scope.npTotWeeklyTot), 'x');
                y = $filter('sorter')($filter("getStops")($scope.npTotWeeklyTot), $filter("getNamesFromArray")($scope.npTotWeeklyTot), 'y');
                columnCharPP(x,[],y,'container6');

            }, 1500);

    };
}]);
