var services=angular.module("myApp.services",["ngResource"]);
  var localhost = "localhost:";
         services.factory('products', function($resource) {
           return $resource("http://"+localhost+"3000/products/:productIndex", {} , {
               get:{method:'GET', params:{productIndex:'@productIndex'}, isArray:false}

           });
           });

           services.factory("productService", function($resource) {
            return $resource("http://"+localhost+"3000/products/:id", {}, {
                 update:{method:"PUT", params:{id:'@id'}},
                 delete:{method:'DELETE', params:{id:"@id"}}
            });
                  });

          services.factory("productsByOpis", function($resource) {
           return $resource("http://"+localhost+"3000/products/description/:description", {}, {
                query:{method:"GET", params:{description:"@description"}, isArray:true}
           });
                 });

           services.factory("dailyRecord", function($resource) {
               return $resource("http://"+localhost+"3000/dailyrecords/:recordId",{}, {
                  get:{method:'GET', params:{recordId:'@recordId'}, isArray:false}
               });
           });

           services.factory("dailyRecordByDate", function($resource) {
               return $resource("http://"+localhost+"3000/dailyrecords/bydate/:prodData",{}, {
                  query:{method:'GET', params:{prodData:'@prodData'}, isArray:true}
               });
           });

           services.factory("dailyRecordService",function($resource) {
               return $resource("http://"+localhost+"3000/dailyrecords/:recordId",{}, {
                   update: {method:"PUT",params:{recordId:"@recordId"}},

               });
           });

           services.factory("dailyRecordServiceDel",function($resource) {
               return $resource("http://"+localhost+"3000/dailyrecords/:id",{}, {
                   delete: {method:"DELETE", params:{id:"@id"}}

               });
           });


           services.factory("dailyProduct",function($resource) {
               return $resource("http://"+localhost+"3000/dailyproducts/:productIndex",{}, {
                   get:{method:"GET", params:{productIndex:"@productIndex"}, isArray:false},
               });
           });

           services.factory("dailyProductByDate",function($resource) {
               return $resource("http://"+localhost+"3000/dailyproducts/bydate/:prodData",{}, {
                   update:{method:"GET", params:{prodData:"@prodData"}, isArray:true},
               });
           });

           services.factory("dailyProductService",function($resource) {
               return $resource("http://"+localhost+"3000/dailyproducts/:id",{}, {
                   update: {method:"PUT",params:{id:"@id"}},
                   delete:{method:'DELETE', params:{id:"@id"}}
               });
           });

           services.factory("weeklyRecord",function($resource) {
               return $resource("http://"+localhost+"3000/weeklyrecords/:weeklyRecordId",{}, {
                   get:{method:"GET", params:{weeklyRecordId:"@weeklyRecordId"}, isArray:false},
                   query:{method:"GET", isArray:true},
                   delete:{method:"DELETE", params:{id:"@weeklyRecordId"}}
               });
           });

           services.factory("weeklyRecordForPeriod",function($resource) {
               return $resource("http://"+localhost+"3000/weeklyrecords/period/:date1/:date2",{}, {
                   update:{method:"GET", params:{date1:"@date1", date2:"@date2"}, isArray:true},
               });
           });

           services.factory("weeklyRecordForData",function($resource) {
               return $resource("http://"+localhost+"3000/weeklyrecords/date/:dateOfProd",{}, {
                   update:{method:"GET", params:{dateOfProd:"@dateOfProd"}, isArray:true},
               });
           });

           services.factory("weeklyRecordService", function($resource) {
               return $resource("http://"+localhost+"3000/weeklyrecords/:id",{}, {
                   update: {method:"PUT",params:{id:"@id"}},
                   delete:{method:'DELETE', params:{id:"@id"}}
               });
           });

           services.factory("weeklyProduct",function($resource) {
               return $resource("http://"+localhost+"3000/weeklyproducts/:recordId",{}, {
                   query:{method:"GET", params:{recordId:"@recordId"}, isArray:true},
               });
           });

           services.factory("weeklyProductForData",function($resource) {
               return $resource("http://"+localhost+"3000/weeklyproducts/date/:prodData",{}, {
                   query:{method:"GET", params:{prodData:"@prodData"}, isArray:true},
               });
           });

           services.factory("weeklyProductForPeriod",function($resource) {
               return $resource("http://"+localhost+"3000/weeklyproducts/period/:date1/:date2",{}, {
                   query:{method:"GET", params:{date1:"@date1", date2:"@date2"}, isArray:true},
               });
           });

           services.factory("weeklyProductService", function($resource) {
               return $resource("http://"+localhost+"3000/weeklyproducts/:id",{}, {
                   update: {method:"PUT", params:{id:"@id"}},
                   delete:{method:'DELETE', params:{id:"@id"}}
               });
           });

           services.factory("rejectRate", function($resource) {
               return $resource("http://"+localhost+"3000/rejectRate",{}, {
                  query:{method:"GET", isArray:true}
               });
           });


services.factory("SecurityService", ['$http','$rootScope','$location','messages',
      function($http, $rootScope, $location, messages) {
        return {
          login : function(user, callback) {
            console.log("user in security Service:"+ JSON.stringify(user));
            $http.post('http://'+localhost+'3000/login', user).success(function(user) {
              $rootScope.currentUser = user;
              callback(user);
            }).
            error(function(error) {
              callback(error);
            });
          },

          logout : function(callback) {
            $http.post('http://'+localhost+'3000/logout').success(function() {
              $rootScope.currentUser = null;
              callback();
               $location.url('/login')
           });
          }

        }

      }]);







           services.factory("columnChart", function() {
            return function(eff,target,xvalues,container) {
                Highcharts.chart(container, {
            chart: {
                type: 'column',
                options3d: {
		enabled: true,
                alpha: 10,
                beta: 30,
                depth: 40 ,
                borderColor:'#303030',
                 frame: {
                            back: {
                                color: '#A3A3C2',
                                size: 4
                            },
                            bottom: {
                                color: '#DBB8FF',
                                size: 10
                            },
                            side: {
                                color: '#8099E6',
                                size: 2
                            }
                       }
            }
        },
        title: {text: ''},
        xAxis: {categories: xvalues},
        yAxis: {min:0,max:100,title:{text:"[%]"}},
        plotOptions: {
               series: {
                edgeColor:'#000000'
            },
    column: {
        borderColor:"black",
        zones: [{
            value: 80, // Values up to 80 (not including) ...
            color: '#ff4000' // ... have the color blue.
        },{
            color: '#00ff80' // Values from 80 (including) and up have the color red

        }]
          }
                  },

        series: [
//            {
//            type:"spline",
//            name:"Target[%]",
//            data:target,
//            showInLegend:false,
//            lineColor: Highcharts.getOptions().colors[10]
//        },
         {
            type:"column",
            name: '[%]',
            showInLegend:false,
            data: eff,
            borderColor:"black"
            //color: Highcharts.getOptions().colors[9]
        }
    ]
 });
 };
           });







      services.factory("columnCharPP", function() {
            return function(eff,target,xvalues,container) {
                Highcharts.chart(container, {
            chart: {
                type: 'column',
                options3d: {
 	enabled: true,
                alpha: 15,
                beta: 15,
                depth: 50
            }
        },
        title: {text: ''},
        xAxis: {categories: xvalues},
        yAxis: {min:0,title:{text:"[%]"}},

        series: [
        //     {
        //     type:"spline",
        //     name:"Target[%]",
        //     data:target,
        //     showInLegend:false,
        //     lineColor: Highcharts.getOptions().colors[10]
        // },
         {
            type:"column",
            name: '[%]',
            showInLegend:false,
            data: eff,
            color: Highcharts.getOptions().colors[9]
        }
    ]
 });
 };
           });

           services.factory("reject", function() {
                 return function(eff,target,xvalues,xvalues2,container) {
                   Highcharts.chart(container, {
               chart: {
                   type: 'column',
           },
           title: {text: 'RejectRate'},
           xAxis: {
             categories: xvalues,
             labels: {
             style: {
                 color: 'black',
                 font: '7px Arial, sans-serif'
             }
         }
     },
           yAxis: {min:0,title:{text:"[%]"}},
           plotOptions: {
                  series: {
                   edgeColor:'#000000'
               },
       column: {
           borderColor:"black",
           zones: [{
               value: 2.5, // Values up to 80 (not including) ...
               color: '#00ff80' // ... have the color blue.
           },{
               color: '#ff4000' // Values from 80 (including) and up have the color red

           }]
             }
                     },

           series: [
          //     {
          //     type:"spline",
          //     name:"Target[%]",
          //     data:target,
          //     showInLegend:false,
          //     lineColor: Highcharts.getOptions().colors[10]
          // },
            {
               type:"column",
               name: '[%]',
               showInLegend:false,
               data: eff,
               borderColor:"black"
               //color: Highcharts.getOptions().colors[9]
           }
       ]
    });
    };
              });

            services.factory("pieChart", function() {
               return function(eff, efftext, stops, stopstext, container) {
                 Highcharts.chart(container, {
                     chart: {type: 'pie', options3d: {enabled: true,alpha: 45,beta: 0 } },
                          title: { text: '',
                              style: { display:'none'}
                          },
                          tooltip: {
                              pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                          },
                          plotOptions: {
                              pie: {
                                  allowPointSelect: true,
                                  cursor: 'pointer',
                                  depth: 15,
                                  dataLabels: {enabled: true, format: '{point.name}'}
                              }
                          },
                          series: [{type: 'pie', name: '', data: [
                 {
                     name: efftext,
                     y: eff,
                     sliced: true,
                     selected: true
                 },
                [stopstext, stops]
             ]
                          }]
                      });
                  };
                             });

      services.factory("messages",["growl",function(growl) {
            return function(type) {
    var config = {};
    switch (type) {
      case "success":
        growl.success("Done!!!", config);
        break;
        case "add":
        growl.info("Produkt jest dodany!!!", config);
        break;
        case "update":
        growl.info("Produkt jest zaaktualizowany!!! ", config);
        break;
        case "delete":
        growl.info("Produkt jest usunięty!", config);
        break;
         case "error":
        growl.error("", config);
        break;
         case "wrongcode":
        growl.error("Błędny kod !!!", config);
        break;
        case "Unauthorized":
       growl.error("Wrong username or password!!!", config);
       break;
       case "userNotFound":
      growl.info("User not found!!!", config);
      break;
      case "wrongDay":
     growl.info("Proszę wybierz Ponedziałek!", config);
     break;
     case 'forbidden':

     growl.info("Action Forbidden!", config);
     break;
        default:
        growl.error("Pojawił się błąd, sprobuj ponownie!!!", config);
    }
  };
     }]);
