angular.module("myApp.controllers",[])
        .controller("capacityController",["$rootScope", "$scope", "$filter", "products", "productService",
         "messages","productsByOpis",
    function($rootScope, $scope, $filter, products, productService, messages, productsByOpis) {

             $scope.productIndex="";
             $scope.productOpis="";

       $scope.searchProducts=function() {
           if($scope.productIndex === "" && $scope.productOpis === "") {
          products.query().$promise.then(function(data) {
              $scope.products=data;

           });
              }
           if($scope.productIndex !== "" && $scope.productOpis === "") {
              products.get({"productIndex":$scope.productIndex}).$promise.then(function(data) {
                $scope.products=[];
                $scope.products.push(data);
           });
           }
           if($scope.productOpis !== "" && $scope.productIndex === "") {
             console.log("opissssssssssssss");
            productsByOpis.query({"description":$scope.productOpis}).$promise.then(function(data) {
              $scope.products=data;
           });

           }

       };
       $scope.editProduct=function(p) {
         console.log('p:'+JSON.stringify(p));
        $scope.id=p._id;
        $scope.productIndex=p.productIndex;
        $scope.productOpis=p.description;
        $scope.pcbsnapanel=p.pcbsonpanel;
        $scope.pcbsnagodzina=p.pcbs100;

        console.log('valid:'+$scope.capacityForm.$valid);

       };

         $scope.deleteProduct=function(p) {
           productService.delete({id:p._id}, function(success) {
             console.log(success);
              messages("delete");
              $scope.products=[];
              console.log("list is updated");
           });
       };

       $scope.addProduct = function (isValid) {
        $scope.submitted = true;
         console.log("isValid:" + isValid);
         if(isValid) {
           var product = {
               _id:$scope.id || "",
               productIndex:$scope.productIndex,
               description:$scope.productOpis,
               pcbsonpanel:$scope.pcbsnapanel,
               pcbs100:$scope.pcbsnagodzina,
               username:$rootScope.currentUser.username,
               createdAt:new Date().toJSON().slice(0,10)
               };
           var id_exists;
           products.query().$promise.then(function(data) {
           id_exists = $filter('findId')(product._id, data);
           console.log('id_exists:'+id_exists);
        if (id_exists) {
             productService.update({"id":$scope.id}, product).$promise.then(function(success) {
               $scope.clearFields();
               $scope.capacityForm.$setPristine();
              //  $scope.capacityForm.$setValidity();
              //  $scope.capacityForm.$setUntouched();
               messages("update");
              $scope.products = [product];
              console.log('product update:'+JSON.stringify(success));
        });
      } else {
        products.save(product, function(success) {
          $scope.clearFields();
          messages("add");
          $scope.products = [product];
            console.log('product save:'+JSON.stringify(success));
        });
      }
         });

}

   };

       $scope.clearFields=function() {
            $scope.id="";
            $scope.productIndex="";
            $scope.productOpis="";
            $scope.pcbsnapanel="";
            $scope.pcbsnagodzina="";
            $scope.products=[];
             $scope.capacityForm.$setPristine();
            // $scope.capacityForm.$setValidity();
            // $scope.capacityForm.$setUntouched();
          }
  }]);
