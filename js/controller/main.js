app.module('app.controllers',[]).controller('main',function($scope,$rootScope,$http,$location,$state,$stateParams) {
    console.log("rootscope" + $rootScope.user);
    $scope.user = $rootScope.user;
    console.log("this scope" + $scope.user);
    //var user = $stateParams.user;
    if($scope.user==null) {
        console.log('Not logged in');
        $state.go('main');
    } else {
    console.log('inside main_controller ' + $scope.user);
        
    }
    $scope.logout = function() {
        $rootScope.user=null;
        $state.go('main');
    }
    
    $scope.display = function () {
        //$scope.showMy = true;
        $state.go('myAccount');
        
    }
            
});
            