app.module('app.controllers',[]).controller('login',function($scope,$http,$location,$state,$rootScope) {
    
    $scope.login = function() {
        $http.post('/signin',$scope.formData)
        .then(function(response) {
            console.log(response.data.msg);
            console.log(response.data.name);
            //$scope.user = response.data.name;
            $rootScope.user = response.data.name;
            $scope.user = $rootScope.user;
            if(response.data.msg =="success") {
            console.log('signed in successfully');
            //$state.go('categories', {user:$scope.user});
                $state.go('home');
            }
            else {
                $scope.formData ={};
                $state.go('login');
            }
        })
    }
    
}); 