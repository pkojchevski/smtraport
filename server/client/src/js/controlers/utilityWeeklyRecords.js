angular.module("myApp.controllers")
        .controller("utilityWeeklyRecords",["$scope","$filter", "weeklyRecord","weeklyRecordService",
        "messages", "weeklyRecordForData",
        function($scope, $filter, weeklyRecord, weeklyRecordService, messages, weeklyRecordForData) {
          $scope.weeklyRecordsList = [];

                 $scope.searchWeeklyRecords=function() {
                   console.log('button searched is clicked');
                   if(typeof $scope.dateOfProd === 'undefined') {
                     weeklyRecord.query().$promise.then(function(data) {
                         $scope.weeklyRecordsList=data;
                      });
                   }
                   if($scope.dateOfProd !== '') {
                        weeklyRecordForData.query({'dateOfProd':$scope.dateOfProd}).$promise.then(function(data) {
                          $scope.weeklyRecordsList=data;
                        });
                   }

                    //  if($scope.WeeklyRecordIndex === "" && $scope.WeeklyRecordOpis === "") {
                    // weeklyRecords.query().$promise.then(function(data) {
                    //     $scope.weeklyRecords=data;
                    //
                    //  });
                    //     }
                    //  if($scope.WeeklyRecordIndex !== "" && $scope.WeeklyRecordOpis === "") {
                    //     weeklyRecords.get({"WeeklyRecordIndex":$scope.WeeklyRecordIndex}).$promise.then(function(data) {
                    //       $scope.weeklyRecords=[];
                    //       $scope.weeklyRecords.push(data);
                    //  });
                    //  }
                    //  if($scope.WeeklyRecordOpis !== "" && $scope.WeeklyRecordIndex === "") {
                    //    console.log("opissssssssssssss");
                    //   weeklyRecordsByOpis.query({"description":$scope.WeeklyRecordOpis}).$promise.then(function(data) {
                    //     $scope.weeklyRecords=data;
                    //  });
                    //
                    //  }
                    //
                 };

                 $scope.editWeeklyRecord = function(p) {
                   console.log('p:'+JSON.stringify(p));
                  $scope.id=p._id;
                  $scope.details=p.details;
                  $scope.dateOfProd=p.dateOfProd;
                  $scope.value=p.value;
                  $scope.text=p.text;
                  $scope.name=p.name;
                  $scope.weeklyRecordId=p.weeklyRecordId;
                 };

                   $scope.deleteWeeklyRecord=function(p) {
                     weeklyRecordService.delete({id:p._id}, function(success) {
                       console.log(success);
                        messages("delete");
                        $scope.weeklyRecordsList=[];
                        console.log("list is updated");
                     });
                 };

                 $scope.addWeeklyRecord = function (isValid) {
                  $scope.submitted = true;
                   console.log("isValid:" + isValid);
                   if(isValid) {
                     var WeeklyRecord = {
                         _id:$scope.id || "",
                         WeeklyRecordId:$scope.WeeklyRecordId,
                         details:$scope.details,
                         text:$scope.text,
                         name:$scope.name,
                         value:$scope.value,
                         dateOfProd:$scope.dateOfProd
                         };
                     var id_exists;
                     weeklyRecord.query().$promise.then(function(data) {
                     id_exists = $filter('findId')(WeeklyRecord._id, data);
                     console.log('id_exists:'+id_exists);
                  if (id_exists) {
                       weeklyRecordService.update({"id":$scope.id}, WeeklyRecord).$promise.then(function(success) {
                         $scope.clearFields();
                         $scope.uForm.$setPristine();
                         messages("update");
                        $scope.weeklyRecordsList = [WeeklyRecord];
                        console.log('WeeklyRecord update:'+JSON.stringify(success));
                  });
                } else {
                  weeklyRecord.save(WeeklyRecord, function(success) {
                    $scope.clearFields();
                    messages("add");
                    $scope.weeklyRecordsList = [WeeklyRecord];
                      console.log('WeeklyRecord save:'+JSON.stringify(success));
                  });
                }
                   });

          }

             };
                 $scope.clearFields=function() {
                      $scope.id="";
                      $scope.WeeklyRecordId="";
                      $scope.text="";
                      $scope.value="";
                      $scope.name="";
                      $scope.dateOfProd="";
                      $scope.details="";
                      $scope.uForm.$setPristine();
                    }
            }]);
