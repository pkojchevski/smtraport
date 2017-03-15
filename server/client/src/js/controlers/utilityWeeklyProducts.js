angular.module("myApp.controllers")
        .controller("utilityWeeklyProducts",["$scope","$filter", "weeklyProduct","weeklyProductService",
         "messages", "weeklyProductForData",
        function($scope, $filter, weeklyProduct, weeklyProductService, messages, weeklyProductForData) {
        $scope.WeeklyProducts = [];

                 $scope.searchWeeklyProducts=function() {
                   console.log('search is clicked');
                   console.log($scope.prodData);
                      if(typeof $scope.prodData === 'undefined') {
                     weeklyProduct.query().$promise.then(function(data) {
                         $scope.WeeklyProducts=data;
                      });
                         }

                         if($scope.prodData !=='') {
                        weeklyProductForData.query({'prodData':$scope.prodData}).$promise.then(function(data) {
                            $scope.WeeklyProducts=data;
                         });
                            }


                    //  if($scope.WeeklyProductIndex === "" && $scope.WeeklyProductOpis === "") {
                    // WeeklyProducts.query().$promise.then(function(data) {
                    //     $scope.WeeklyProducts=data;
                    //
                    //  });
                    //     }
                    //  if($scope.WeeklyProductIndex !== "" && $scope.WeeklyProductOpis === "") {
                    //     WeeklyProducts.get({"WeeklyProductIndex":$scope.WeeklyProductIndex}).$promise.then(function(data) {
                    //       $scope.WeeklyProducts=[];
                    //       $scope.WeeklyProducts.push(data);
                    //  });
                    //  }
                    //  if($scope.WeeklyProductOpis !== "" && $scope.WeeklyProductIndex === "") {
                    //    console.log("opissssssssssssss");
                    //   WeeklyProductsByOpis.query({"description":$scope.WeeklyProductOpis}).$promise.then(function(data) {
                    //     $scope.WeeklyProducts=data;
                    //  });
                    //
                    //  }
                    //
                 };

                 $scope.editWeeklyProduct = function(p) {
                   console.log('p:'+JSON.stringify(p));
                  $scope.id=p._id;
                  $scope.productId=p.productId;
                  $scope.dailyQuantity=p.dailyQuantity;
                  $scope.description=p.description;
                  $scope.prodData=p.prodData;
                  $scope.pcbs100=p.pcbs100;
                  $scope.pcbsonpanel=p.pcbsonpanel;
                  $scope.productIndex=p.productIndex;
                 };

                   $scope.deleteWeeklyProduct=function(p) {
                     weeklyProductService.delete({id:p._id}, function(success) {
                       console.log(success);
                        messages("delete");
                        $scope.WeeklyProducts=[];
                        console.log("list is updated");
                     });
                 };

                 $scope.addWeeklyProduct = function (isValid) {
                  $scope.submitted = true;
                   console.log("isValid:" + isValid);
                   if(isValid) {
                     var WeeklyProduct = {
                         _id:$scope.id || "",
                         productId:$scope.productId,
                         dailyQuantity:$scope.dailyQuantity,
                         description:$scope.description,
                         prodData:$scope.prodData,
                         pcbs100:$scope.pcbs100,
                         pcbsonpanel:$scope.pcbsonpanel,
                         productIndex:$scope.productIndex
                         };
                     var id_exists;
                     weeklyProduct.query().$promise.then(function(data) {
                     id_exists = $filter('findId')(WeeklyProduct._id, data);
                     console.log('id_exists:'+id_exists);
                  if (id_exists) {
                       weeklyProductService.update({"id":$scope.id}, WeeklyProduct).$promise.then(function(success) {
                         $scope.clearFields();
                         $scope.uForm.$setPristine();
                         messages("update");
                        $scope.WeeklyProducts = [WeeklyProduct];
                        console.log('WeeklyProduct update:'+JSON.stringify(success));
                  });
                } else {
                  weeklyProduct.save(WeeklyProduct, function(success) {
                    $scope.clearFields();
                    messages("add");
                    $scope.WeeklyProducts = [WeeklyProduct];
                      console.log('WeeklyProduct save:'+JSON.stringify(success));
                  });
                }
                   });

          }

             };
                 $scope.clearFields=function() {
                      $scope.id="";
                      $scope.productId='';
                      $scope.dailyQuantity='';
                      $scope.description='';
                      $scope.prodData='';
                      $scope.pcbs100='';
                      $scope.pcbsonpanel='';
                      $scope.productIndex='';
                      $scope.uForm.$setPristine();
                    }
            }]);
