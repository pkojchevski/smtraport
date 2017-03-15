angular.module("myApp.controllers")
    .controller("dailyController", ["$scope", "$timeout", "$http", "$filter", "$interval","dailyProduct", "dailyProductService",
    "columnChart", "pieChart", "dailyRecord", "dailyRecordService", "weeklyRecord","weeklyRecordService", "dailyRecordServiceDel", "weeklyProduct",
    "dailyRecordServiceDel", "weeklyProductService", "columnCharPP", "dailyRecordByDate", "dailyProductByDate",
    "_","weeklyProductForData", 'rejectRate', 'reject',
    function($scope, $timeout, $http, $filter,$interval, dailyProduct, dailyProductService, columnChart,
            pieChart, dailyRecord, dailyRecordService, weeklyRecord,weeklyRecordService, dailyRecordServiceDel, weeklyProduct,
            dailyRecordServiceDel, weeklyProductService, columnCharPP, dailyRecordByDate, dailyProductByDate, _,
            weeklyProductForData, rejectRate, reject) {

        $scope.buttonClicked = false;
        $scope.productionDate = new Date().toJSON().slice(0,10);
        //$scope.productionDate = new Date("2017-02-06").toJSON().slice(0,10);
        //console.log("productionDate:"+$scope.productionDate);
        $scope.ppDailyChart = [];
        $scope.npDailyChart = [];
        $scope._=_;
        function init() {
          console.log("init is runing");
$scope.hour =  ["06-07","07-08","08-09","09-10","10-11","11-12","12-13","13-14",
                     "14-15","15-16","16-17","17-18","18-19","19-20","20-21","21-22"];

$scope.prodData = {
            efficiency:["eff[%]",0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            lineOpened:["Lin.Otwarta[min]",60,60,60,60,60,60,60,60,60,60,60,60,60,60,60,60],
            lineClosed:["Lin.Zamkn.[min]",0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            lineEff:["Lin.Eff.[min]",0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            npStops:["Niepl.Przest.[min]",0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            target:["cel[%]",80,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80],
            product1:["#pcbs/g",0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            product2:["#pcbs/g",0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            product3:["#pcbs/g",0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            product4:["#pcbs/g",0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            product5:["#pcbs/g",0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            product6:["#pcbs/g",0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            product7:["#pcbs/g",0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            product8:["#pcbs/g",0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            product9:["#pcbs/g",0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            product10:["#pcbs/g",0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
          };
$scope.np = {
            modelChange:["Zmiana modelu","",0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            changeSide:["Zmiana strony","",0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            changeVersion:["Zmiana wer.rynk.","",0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            missingComponent:["Brak komponentu","",0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            componentVerification:["Werifikacja komponentu","",0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            wrongPlStencil:["Żłe ułożony szablon","",0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            damagedStencil:["Uszkodzony szablon","",0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            DrukCleaningStencil:["Drukarka:Czyszczenie szablonu","",0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            DrukAddingPaste:["Drukarka:Dodanie pasty","",0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            DrukDodanieVigon:["Drukarka:Dodanie vigon","",0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            DrukProgramCorrection:["Drukarka:Korekprog","",0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            DrukPaperChange:["Drukarka:Wympapieru","",0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            PNPBadmark:["PNP:Badmarki","",0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            PNPpickComponent:["PNP:pobieranie komponentu","",0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            PNPprogramCorrection:["PNP:Korekcja programu","",0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            PNPtrayChange:["PNP:wymiana tacki","",0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            PNPcleaningNozzle:["PNP:czyszczenie ssawek","",0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            PNPfeederChange:["PNP:wymiana feedera","",0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            PNPripedFoil:["PNP:Zerwana taśma","",0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            Reflow:["Piec","",0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            AOIcorrection:["AOI korekcja programu","",0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            Transport:["Transport","",0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            Separation:["Separacja płytek","",0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            Validation:["Walidacja 1 płytki","",0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            othernp1:["Inny","",0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            othernp2:["Inny","",0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            othernp3:["Inny","",0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
      };

$scope.pp = {
        linePreparing:["Przygotow.Linii","",0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        meeting:["Zebranie","",0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        pause:["Przerwa","",0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        noPlan:["Zakończenie plany","",0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        preventive:["Konserwacja","",0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        inventory:["Inwentura","",0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        testy:["Testy(Trace, NPI,..)","",0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        missOperator:["Brak operatorów","",0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        missComponent:["Brak Komponentów","",0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        qualityIssue:["Problem Jakościowy","",0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        otherpp1:["inny","",0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        otherpp2:["inny","",0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        otherpp3:["inny","",0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
        };

$scope.dailyRecords=[
               {
             dailyRecordsId:"",
             arrName:"",
             arrIndex:"",
             arrIndexValue:""
         }];

$scope.product = {};
$scope.products=[product1={}, product2={}, product3={},product4={},product5={},product6={},
           product7={}, product8={}, product9={}, product10={}];

$scope.prodDataTot = {
    efficiencyTot:[0,0,0],
    lineOpenedTot:[0,0,0,0],
    lineClosedTot:[0,0,0,0],
    lineEffTot:[0,0,0,0],
    npStopsTot:[0,0,0,0],
    targetTot:[0,0,0],
    product1Tot:[0,0,0],
    product2Tot:[0,0,0],
    product3Tot:[0,0,0],
    product4Tot:[0,0,0],
    product5Tot:[0,0,0],
    product6Tot:[0,0,0],
    product7Tot:[0,0,0],
    product8Tot:[0,0,0],
    product9Tot:[0,0,0],
    product10Tot:[0,0,0]
};


$scope.ppTot = {
    linePreparingTot:[0,0,0,0],
    meetingTot:[0,0,0,0],
    pauseTot:[0,0,0,0],
    noPlanTot:[0,0,0,0],
    preventiveTot:[0,0,0,0],
    inventoryTot:[0,0,0,0],
    testyTot:[0,0,0,0],
    missOperatorTot:[0,0,0,0],
    missComponentTot:[0,0,0,0],
    qualityIssueTot:[0,0,0,0],
    otherpp1Tot:[0,0,0,0],
    otherpp2Tot:[0,0,0,0],
    otherpp3Tot:[0,0,0,0]
};


$scope.npTot ={
   modelChangeTot:[0,0,0,0],
   changeSideTot:[0,0,0,0],
   changeVersionTot:[0,0,0,0],
   missingComponentTot:[0,0,0,0],
   componentVerificationTot:[0,0,0,0],
   wrongPlStencilTot:[0,0,0,0],
   damagedStencilTot:[0,0,0,0],
   DrukCleaningStencilTot:[0,0,0,0],
   DrukAddingPasteTot:[0,0,0,0],
   DrukDodanieVigonTot:[0,0,0,0],
   DrukProgramCorrectionTot:[0,0,0,0],
   DrukPaperChangeTot:[0,0,0,0],
   PNPBadmarkTot:[0,0,0,0],
   PNPpickComponentTot:[0,0,0,0],
   PNPprogramCorrectionTot:[0,0,0,0],
   PNPtrayChangeTot:[0,0,0,0],
   PNPcleaningNozzleTot:[0,0,0,0],
   PNPfeederChangeTot:[0,0,0,0],
   PNPripedFoilTot:[0,0,0,0],
   ReflowTot:[0,0,0,0],
   AOIcorrectionTot:[0,0,0,0],
   TransportTot:[0,0,0,0],
   SeparationTot:[0,0,0,0],
   ValidationTot:[0,0,0,0],
   othernp1Tot:[0,0,0,0],
   othernp2Tot:[0,0,0,0],
   othernp3Tot:[0,0,0,0]
};
        }

/////////////// initialization ////////////////////
        init();

// refreshing page
var refreshProducts = function() {
     dailyProductByDate.query({"prodData":$scope.productionDate}).$promise.then(function(data) {
          for (var i = 0; i < $scope.products.length; i++) {
            //console.log('data:'+JSON.stringify(data));
            $scope.products[i] = data[i];
          }
    });
};
//
refreshProducts();
$scope.saveShowProductsDaily = function(obj) {
  //console.log("save product:"+JSON.stringify(obj));
  var exist = false;
  var rownumber = (obj.productId).substring(0,1);
  var id;
  dailyProductByDate.query({"prodData":$scope.productionDate}).$promise.then(function(data) {
     console.log('daily products:'+JSON.stringify(data));
     data.filter(function(i, item) {
      //  console.log('i:'+(i.productId).substring(0,1));
       if ((i.productId).substring(0,1) === rownumber) {
         exist = true;
         id = i._id;
       }
     });
      console.log('exist is:'+exist);
      console.log('data filter:'+JSON.stringify(data));
     if(!exist) {
       dailyProduct.save(obj, function(success) {
           refreshProducts();
         });
 } else {
   obj._id = id;
   dailyProductService.update({'id':id},obj).$promise.then(function(success) {
     console.log('success:'+JSON.stringify(success));
       refreshProducts();
     });
 }
  });
};



$scope.refreshDailyData = function() {
  var o ={};
    dailyRecordByDate.query({"prodData":$scope.productionDate}).$promise.then(function(data) {
             //write data in objects
             if(!angular.equals([],data)) {
           for(var i = 0; i < data.length; i++){
               var obj = data[i].name.split(" ")[0];
               var klasa = data[i].name.split(" ")[1];
               var id = data[i].index;
               var name = data[i].name;
               var x,y = [];

                   //write data from db to local objects
               if ($filter("checkForNumbers")(name, parseInt(id), parseInt(data[i].value))) {
                  $scope.$eval(obj+"."+klasa)[id] = data[i].value;
                  //console.log('here:'+JSON.stringify($scope.$eval(obj+"."+klasa)[id]));
                }
                if (!($filter("checkForNumbers")(name, parseInt(id), parseInt(data[i].value)))) {
                   $scope.$eval(obj + "." + klasa)[id] = data[i].details;
                 }
               };


                  //calculations
                     $filter('calcStops')($scope.prodData.lineClosed, $scope.pp);
                     $filter('calcStops')($scope.prodData.npStops,$scope.np);
                     $scope.prodData.lineOpened=$filter("getLineOpened")($scope.prodData.lineClosed);
                     $scope.prodData.efficiency = $filter("calcEffArr")($scope.products,
                     $scope.prodData.lineOpened, $scope.prodData);
                     $scope.prodData.lineEff=$filter("calcLineEff")($scope.prodData.efficiency, $scope.prodData.lineOpened);
                     //console.log('$scope.products:'+ $scope.products);
                     //console.log('scope.prodData:'+ JSON.stringify($scope.prodData));
                     //console.log('scope.prodDataTot:'+ JSON.stringify($scope.prodDataTot));
                     $filter('calcTot')($scope.prodData,$scope.prodDataTot);
                     $filter('calcTot')($scope.pp, $scope.ppTot);
                     $filter('calcTot')($scope.np, $scope.npTot);
                     $scope.prodDataTot.efficiencyTot[0]=$filter("calcAverageEff")(1,8,$scope.prodData.efficiency);
                     $scope.prodDataTot.efficiencyTot[1]=$filter("calcAverageEff")(9,16,$scope.prodData.efficiency);
                     $scope.prodDataTot.efficiencyTot[2]=$filter("calcAvgEffTot")($scope.prodDataTot.efficiencyTot[1],$scope.prodDataTot.efficiencyTot[0]);
                     $filter('calcRatioProdData')($scope.prodDataTot);
                     $filter('calcRatio')($scope.npTot, $scope.prodDataTot, "npStopsTot");
                     $filter('calcRatio')($scope.ppTot, $scope.prodDataTot, "lineClosedTot");

                              //planed stops chart
                   pieChart(parseInt($scope.prodDataTot.lineOpenedTot[3]),'Lotw.',parseInt($scope.prodDataTot.lineClosedTot[3]),'PP','container1');
                              //unplaned stops chart
                   pieChart(parseInt($scope.prodDataTot.lineEffTot[3]),'Leff.',parseInt($scope.prodDataTot.npStopsTot[3]),'NP','container2');
   //                           //wydajnośc SMT chart
                   columnChart($filter("getArrayNumbers")($scope.prodData.efficiency),$filter("getArrayNumbers")($scope.prodData.target),$scope.hour,'container');
   ////                           //planned stops chart
                    x = $filter('sorter')($filter("getEff")($scope.ppTot), $filter("getNames")($scope.pp), 'x');
                    y = $filter('sorter')($filter("getEff")($scope.ppTot), $filter("getNames")($scope.pp), 'y');
                  columnCharPP(x,[],y,'container10');

   //                           //unplaned stops chart
                    x = $filter('sorter')($filter("getEff")($scope.npTot), $filter("getNames")($scope.np), 'x');
                    y = $filter('sorter')($filter("getEff")($scope.npTot), $filter("getNames")($scope.np), 'y');
                  columnCharPP(x,[],y,'container11');
 }
              });
            };

        $scope.addDailyRecord = function(o) {
            dailyRecord.get({"recordId":o.recordId}).$promise.then(
          function(data) {
              if (JSON.stringify(data) !== '{}') {
                //put
                dailyRecordService.update({"recordId":o.recordId}, o).$promise.then(function(success) {
                      console.log("record is updated");
                });
            } else {
              dailyRecord.save(o, function(success) {
                    console.log("record is saved");
              });
            }
          });
        };

        $scope.addWeeklyProduct = function(o) {
            weeklyProductForData.query({"prodData":o.prodData}).$promise.then(function(data) {
              var updateProduct;
              var arr;
              updateProduct = angular.copy(o);
              if (JSON.stringify(data) !== '[]') {
                arr = [];
                for (var i = 0 ; i < data.length; i++) {
                  if(data[i].productIndex === updateProduct.productIndex) {
                    updateProduct.dailyQuantity = parseInt(updateProduct.dailyQuantity) + parseInt(data[0].dailyQuantity);
                    updateProduct._id = data[i]._id;
                    arr[i]=data[i].productIndex;
                  }
                }
                if(arr.length > 0) {
                //put
                weeklyProductService.update({"id":updateProduct._id}, updateProduct).$promise.then(function(success) {
                      console.log("product is updated");
                });
              } else {
                updateProduct._id='';
                weeklyProduct.save(updateProduct, function(success) {
                      console.log("product is saved!");
                });
              }

            } else {
              updateProduct._id='';
              weeklyProduct.save(updateProduct, function(success) {
                    console.log("product is saved!");
              });
            }

            dailyProductService.delete({"id":o._id}, function(success) {
             console.log("success:"+ JSON.stringify(success));
                   console.log("products deleted!");
               });
          });
        };

        $scope.refreshDailyData();
           $interval(function() {
             console.log('interval is running');
            $scope.refreshDailyData();
            $scope.productionDate = new Date().toJSON().slice(0,10);
          }, 600000);

        $scope.addWeeklyRecord = function(o) {
          weeklyRecord.get({"weeklyRecordId":o.weeklyRecordId}).$promise.then(
          function(data) {
              if (JSON.stringify(data) !== '{}') {
                //put
                o._id = data._id;
                weeklyRecordService.update({"id":o._id}, o).$promise.then(function(success) {
                      console.log("record is updated");
                });
            } else {
              weeklyRecord.save(o, function(success) {
                    console.log("record is saved");
              });
            }
             });
        };




//
// //--------------save weekly records1-------------------------------//

var saveWeekRec = function() {
    var weekObj={};
    var textarr;
    var textarr1;
    var name;
    var arrTotNames=$filter("getAllNames")($scope.npTot,"npTot.", $scope.ppTot,"ppTot.", $scope.prodDataTot,"prodDataTot.");
   //console.log('arrTotNames:'+arrTotNames);
        for(var i = 0; i < arrTotNames.length; i++) {
            if($scope.$eval(arrTotNames[i])[2] !== 0 && arrTotNames[i].indexOf("product") === -1) {
               textarr = arrTotNames[i].split(".")[1];
               textarr = textarr.substring(0, textarr.length-3);
               textarr1 = arrTotNames[i].split(".")[0];
               textarr1 = textarr1.substring(0, textarr1.length-3);
               name = (arrTotNames[i]);
                   weekObj = {
                        weeklyRecordId:textarr + i + $scope.productionDate,
                        name:arrTotNames[i],
                        text:$scope.$eval(textarr1 + "." + textarr)[0],
                        value:$scope.$eval(arrTotNames[i])[2],
                        dateOfProd:$scope.productionDate,
                        details:getDetails(name)//$scope.$eval(name.substring(0, name.length-3))[1] || ""
                      };
                      $scope.addWeeklyRecord(weekObj);
           }
              }
              dailyRecord.query().$promise.then(function(data) {
                 for(var i = 0; i < data.length; i++) {
                   dailyRecordServiceDel.delete({"id":data[i]._id}, function(success) {
                     console.log("delete records success");
                  });
                }

           });
       };

var getDetails = function(name) {
  var obj1 = (name).split(".")[0];
  var arr = (name).split(".")[1];
if(obj1 !== "prodDataTot") {
  return $scope.$eval(
    obj1.substring(0, obj1.length-3) + "." +
    arr.substring(0, arr.length-3)
  )[1];
} else {
  return "";
}
}

//save weekly products//////////////////////////////
var saveWeekProd = function() {
    var product;
    var i;
    dailyProduct.query().$promise.then(function(data) {
        for(i =0; i < data.length; i++) {
            product = data[i];
            //product.prodData = $scope.productionDate;
            $scope.addWeeklyProduct(product);
        }

    });
};

// //-----------------clicking reset button-------------------------------//
$scope.reset = function() {
    console.log("button reset clicked!");
    saveWeekProd();
    saveWeekRec();

    $scope.product = {};
    $scope.products=[product1={},product2={},product3={},product4={},product5={},product6={},
      product7={},product8={},product9={},product10={}];

    init();
      pieChart(parseInt($scope.prodDataTot.lineOpenedTot[3]),'Lotw.',parseInt($scope.prodDataTot.lineClosedTot[3]),'PP','container1');
//                           //unplaned stops chart
      pieChart(parseInt($scope.prodDataTot.lineEffTot[3]),'Leff.',parseInt($scope.prodDataTot.npStopsTot[3]),'NP','container2');
////                           //wydajnośc SMT chart
      columnChart($filter("getArrayNumbers")($scope.prodData.efficiency),$filter("getArrayNumbers")($scope.prodData.target),$scope.hour,'container');
//////                           //planned stops chart
     columnCharPP($filter("getEff")($scope.ppTot),[],$filter("getNames")($scope.pp),'container10');
////                           //unplaned stops chart
     columnCharPP($filter("getEff")($scope.npTot),[],$filter("getNames")($scope.np),'container11');
  };


//   function getWR(callback)  {
//     rejectRate.query().$promise.then(function(data) {
//       console.log('data:'+JSON.stringify(data));
//       callback();
//     });
// }
//
//   getWR(wait);


  var now = new Date();
  var starttime = new Date(now.getFullYear(), now.getMonth(),
                 now.getDate(),23,59,0,0);
 if (starttime < 0) {
   startime +=86400000;
 }
 console.log('now:'+now);
 console.log('starttime:'+starttime);
$timeout($scope.reset, starttime - now);

//--------------------------rejectRate--------------------------

function getReject(callback) {
  var onlyrejects;
  var data1;
  var mounts;
  var finalrejects = [];
  var finalreject = {};
  var rates = [];
  var components = [];
  var machines = [];
  var machines = [
    {serial:'Y30206', name:'YS24'},
    {serial:'Y30227', name:'YS12F'},
    {serial:'Y30814', name:'YS24X'}
  ];

  rejectRate.query().$promise.then(function(data) {
    console.log('rejectrate:'+new Date()+JSON.stringify(data));
    if(!angular.equals([], data)) {
      data1 = data.filter(function(obj) {
      if(obj['machineSerial'] !== 'Y28818') {
        return true;
      } else {
        return false;
      }
    });
    onlyrejects = data1.filter(function(obj) {
      if(obj['mountDone'] === '1') {
        return true;
      } else {
        return false;
      }
           });
    mounts = data1.filter(function(obj) {
    if(obj['mountDone'] === '0') {
      return true;
    } else {
      return false;
    }
  });

  for(let i = 0 ; i < onlyrejects.length; i++) {
    for(let j = 0 ; j < mounts.length; j++) {
      if (onlyrejects[i]['componentId'] === mounts[j]['componentId']) {
        finalreject['componentId'] = onlyrejects[i]['componentId'];
          angular.forEach(machines, function(val) {
            if(val['serial'] === onlyrejects[i]['machineSerial']) {
                  finalreject['machineSerial'] = val['name'];
            }
          });
        finalreject['mounted'] = onlyrejects[i]['licznik'];
        finalreject['rejected'] = mounts[i]['licznik'];
        finalreject['rejectrate'] = Number((100*onlyrejects[i]['licznik']/mounts[i]['licznik']).toFixed(2));
        finalreject['comment'] = onlyrejects[i]['comment'];
        finalrejects.push(finalreject);
        finalreject = {};
       }
     }
  }

  finalrejects = finalrejects.sort(function(a,b) {
        return  b.rejectrate-a.rejectrate;
  });

  angular.forEach(finalrejects, function(el, key) {
    rates.push(el.rejectrate);
    components.push(el['componentId']+' '+el['comment']+'('+el.machineSerial+')');
    machines.push(el.machineSerial);
  });
  reject(rates.slice(1,4),[2.5,2.5,2.5],components.slice(1,4),machines.slice(1,4),'container12');
  }
    callback();
  // })
  // .catch(function(err) {
  //   console.log('err:'+err);
     });
  }

getReject(wait);
//
// $interval(function() {
//   getReject();
// }, 3000);

function wait() {
  $timeout(function() {
    console.log('runing timeout:'+new Date());
    getReject(wait);
  }, 900000);
}


      }]);
