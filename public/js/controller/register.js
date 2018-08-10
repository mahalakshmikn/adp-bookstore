app.controller('register', function($scope, $http,$location,$state,$window) {
    $scope.save = function() {
        var phone =$scope.formData.phone;
        console.log(phone);
         var phoneNum = /(7|8|9)\d{9}/;
            if(phone.match(phoneNum)==false) {
                $window.alert("Enter the correct phone number");
            }
        else {
       //console.log($scope.uname);
        $http.post('/uname',$scope.formData)
            .then(function(response){
            console.log(response);
            if(response.data.msg =="failure") {
               //$window.alert("This username already exists");
                var ele = document.getElementById("err")
                ele.innerHTML ="* This username already exists";
                ele.setAttribute("id","details");
            } else {
            
            console.log('success');
            $state.go('login');
            }
           
            
        })
            .catch(function(data) {
            console.log('failed');
        })
        }
    };
});