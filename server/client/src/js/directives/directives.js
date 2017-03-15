angular.module("myApp.directives",[]).
    directive("pkListen",["$timeout", "$filter", "$rootScope", "pieChart", "columnChart",
    "dailyProduct", "dailyProductService", "columnCharPP",
    "dailyProductByDate", "_",
        function($timeout, $filter, $rootScope, pieChart, columnChart, dailyProduct,
           dailyProductService, columnCharPP, dailyProductByDate, _ ){
        return {
          restrict:"A",

          link:function(scope, elem, attr) {
              var activeElement;
              var klasa;
              var obj;
              var productId;
              var cellNr;

                  elem.on("click", function() {
                      elem[0].select();
                  });

              elem.on("keydown keypress change", function(event) {
                      activeElement = document.activeElement;
                      if(event.which === 13) {
                            activeElement.blur();
                  }
              });
             elem.on("blur", function() {
                 klasa = (attr.class).split(" ")[1];
                 obj = (attr.class).split(" ")[0];
                 if (!isNaN(parseInt(elem.val())) && elem.val() !== "") {
                        if ($filter("checkForNumbers")(attr.class, parseInt(attr.id), parseInt(elem.val()))) {
                          var dailyRec = {
                              recordId:attr.id+klasa,
                              name:attr.class,
                              index:attr.id,
                              value:elem.val(),
                              details:"",
                              prodData:scope.productionDate
                          };
                          // console.log("dailyRec:"+JSON.stringify(dailyRec));
                         scope.addDailyRecord(dailyRec);
                            scope.$eval(obj+"."+klasa)[attr.id] = elem.val();
                            $filter('calcStops')(scope.prodData.lineClosed, scope.pp);
                            $filter('calcStops')(scope.prodData.npStops, scope.np);
                            scope.prodData.lineOpened=$filter("getLineOpened")(scope.prodData.lineClosed);
                            scope.prodData.efficiency = $filter("calcEffArr")(scope.products,
                                             scope.prodData.lineOpened,scope.prodData);
                            scope.prodData.lineEff = $filter("calcLineEff")(scope.prodData.efficiency, scope.prodData.lineOpened);
                            $filter('calcTot')(scope.prodData,scope.prodDataTot);
                            $filter('calcTot')(scope.pp, scope.ppTot);
                            $filter('calcTot')(scope.np, scope.npTot);
                            scope.prodDataTot.efficiencyTot[0]=$filter("calcAverageEff")(1,8,scope.prodData.efficiency);
                            scope.prodDataTot.efficiencyTot[1]=$filter("calcAverageEff")(9,16,scope.prodData.efficiency);
                            scope.prodDataTot.efficiencyTot[2]=$filter("calcAvgEffTot")(scope.prodDataTot.efficiencyTot[1],scope.prodDataTot.efficiencyTot[0]);
                            $filter('calcRatioProdData')(scope.prodDataTot);
                            $filter('calcRatio')(scope.npTot, scope.prodDataTot, "npStopsTot");
                            $filter('calcRatio')(scope.ppTot, scope.prodDataTot, "lineClosedTot");

                           //planed stops chart
                            pieChart(parseInt(scope.prodDataTot.lineOpenedTot[3]),'Lotw.',parseInt(scope.prodDataTot.lineClosedTot[3]),'PP','container1');
                                       //unplaned stops chart
                            pieChart(parseInt(scope.prodDataTot.lineEffTot[3]),'Leff.',parseInt(scope.prodDataTot.npStopsTot[3]),'NP','container2');
            //                           //wydajnośc SMT chart
                            columnChart($filter("getArrayNumbers")(scope.prodData.efficiency),$filter("getArrayNumbers")(scope.prodData.target),scope.hour,'container');
            ////               ////                           //planned stops chart
                             x = $filter('sorter')($filter("getEff")(scope.ppTot), $filter("getNames")(scope.pp), 'x');
                             y = $filter('sorter')($filter("getEff")(scope.ppTot), $filter("getNames")(scope.pp), 'y')
                              columnCharPP(x,[],y,'container10');
               //                           //unplaned stops chart
                             x = $filter('sorter')($filter("getEff")(scope.npTot), $filter("getNames")(scope.np), 'x');
                             y = $filter('sorter')($filter("getEff")(scope.npTot), $filter("getNames")(scope.np), 'y')
                              columnCharPP(x,[],y,'container11');

                            ///record dailyQuantity to products_daily

                    if(attr.class.indexOf("product") !== -1) {
                        var productNr;
                        dailyProductByDate.query({"prodData":scope.productionDate}).$promise.then(function(data) {
                            for (var i =0; i < data.length; i++) {
                              productNr = parseInt(data[i].productId.substring(0,1));
                                 if(scope.$eval("prodDataTot."+"product"+(productNr+1)+"Tot")[2] !== 0) {
                                     data[i].dailyQuantity = scope.$eval("prodDataTot."+"product"+(productNr+1)+"Tot")[2];
                                        dailyProductService.update({id:data[i]._id}, data[i]).$promise.then(function(success) {
                                     });
                                 }
                             }
                                 });
                             }
                           }
                         }

                           if(!($filter("checkForNumbers")(attr.class, attr.id, elem.val()))) {
                             if (elem.val() !== "") {
                             scope.$eval(obj+"."+klasa)[1] = elem.val();
                             console.log("elem.vaaaaaaal()"+elem.val());
                             var dailyRec = {
                                 recordId:attr.id+klasa,
                                 name:attr.class,
                                 index:attr.id,
                                 value:"",
                                 details:elem.val(),
                                 prodData:scope.productionDate
                             };
                              scope.addDailyRecord(dailyRec);
                           }
                         }
            });
          }
        };
}]).

    directive("pkListenProduct", ["dailyProduct" ,"products", "dailyProductService",
     function(dailyProduct, products, dailyProductService) {
        return {
            restrict:"A",
            link:function(scope,elem,attr) {
            var prevEl, currEl;
            var activeElem;
            var product={};
            var exists = false;
                elem.on("keydown keypress change", function(event) {
                      activeElement = document.activeElement;
                      if(event.which === 13) {
                        currEl = elem.val();
                        console.log('id:'+attr.id);
                          activeElement.blur();
                          //console.log('$scope.products:'+typeof(scope.products));
                          //console.log('xxxx:'+scope.products[parseInt(attr.id)]);
                          // if(scope.products[attr.id].productIndex !=='') {
                          //
                          // }
                        products.get({productIndex:elem.val()}).$promise.then(function(data) {
                            product._id = "";
                            product.productId = attr.id + scope.productionDate;
                            product.productIndex = data.productIndex;
                            product.description = data.description;
                            product.pcbsonpanel = data.pcbsonpanel;
                            product.pcbs100 = data.pcbs100;
                            product.prodData = scope.productionDate;
                            product.dailyQuantity = scope.$eval("prodDataTot."+"product"+(parseInt(attr.id)+1)+"Tot")[2];
                            scope.saveShowProductsDaily(product);
                          });
                        }
                      });

                        // dailyProductService.delete({'id':p.id}, function('success') {
                        //   console.log('product was deleted');
                        // });

                }

              }


}]).
    directive("pkLeave", ["$timeout", "$filter","messages", function($timeout, $filter, messages) {
        return {
            restrict:"A",
            link:function(scope,elem,attr) {
                elem.on("blur", function() {
                  if(scope.date) {
                    scope.secDate = new Date(scope.date.getFullYear(),scope.date.getMonth(),scope.date.getDate()+6);
                    console.log('secDate:'+scope.secDate);
                    for (var i = 0; i <= 6; i++) {
                      scope.weekArrDates[i] = $filter("addDays")(scope.date, i);
                      scope.weekArrDays[i] = moment(scope.weekArrDates[i]).format('dddd').substring(0,3);
                      scope.cw = moment(scope.date.toString()).isoWeek();
                    };
                    scope.start = true;
                  } else {
                    scope.secDate = null;;
                    console.log('secDate:'+scope.secDate);
                  }
                });
            }
        };
}]).
        directive("scrollup",["$document", function($document) {
            return {
                restrict:"A",
                link: function(scope, elem, attrs) {
                    elem.on("click", function() {
                        function scrollToTop(element, to, duration) {
                            if (duration<0) return;
                            var difference=to-element.scrollTop;
                            var perTick=difference/duration * 10;
                            setTimeout(function() {
                               element.scrollTop=element.scrollTop+perTick;
                               scrollToTop(element,to,duration-10);
                            },10);
                        }
                        scrollToTop($document[0].body, 0, 500);
                    });
                }
            };
}])
.directive('pkTooltip', function(){
    return {
        restrict: 'A',
        link: function(scope, element, attrs){
            $(element).hover(function(){
                // on mouseenter
                $(element).tooltip('show');
            }, function(){
                // on mouseleave
                $(element).tooltip('hide');
            });
        }
    };
})
.directive('myTooltip', function() {
  return {
    restrict: 'A',
    controller: function($scope, $element) {
      $scope.isShown = false;
      this.showHover = function() {
        $scope.isShown = $scope.isShown == true ? false : true;
      }
    },
    transclude: true,
    link: function(scope, element, attr, ctrl) {
      element.on('mouseenter', function() {
        scope.$apply(function() {
          ctrl.showHover();
        });
      });
      element.on('mouseleave', function() {
        scope.$apply(function() {
          ctrl.showHover();
        });
      });
    },
    template: '<p ng-show = "isShown" data-toggle="tooltip" data-placement="left" data-container="body" title="hi">text</p>'
  }
})
