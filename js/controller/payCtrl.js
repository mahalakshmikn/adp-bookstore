app.controller('payCtrl',function($scope,$rootScope,$http,$location,$state,$stateParams,$window) {
    
          $scope.changeStatus = function() {
        if($scope.month >12 || $scope.year < 2019) {
            $window.alert("Invalid month");
        }
        else {
            //$window.alert("Payment is successful and Track your order in 'My Account'")
            console.log('inside successful payment');
            $rootScope.flags =1;
            $state.go('categories');
        }
          }
        
    });  
           