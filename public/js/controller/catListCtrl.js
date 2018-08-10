app.controller('catListCtrl', function($scope, $http,$location,$state,$stateParams,$window,$rootScope) {
    //$scope.showMy = false;
    $scope.user = $rootScope.user;
    console.log('inside CatList Ctrl' + $scope.user);
    $scope.payVar = false;
    $scope.flag = 0;
    console.log('title:' + $scope.titles);
        console.log('author' + $scope.authors);
    
    //console.log("inside catListCtrl");
     //var user = $stateParams.user;
    //console.log('inside catList_controller ' + user);
        //$scope.user = user;
    
    $scope.getSs = function() {
        //$scope.showMy = false;
        $scope.myVar=false;
        console.log("inside get_css function");
       //console.log($scope.uname);
        $http.post('/ss',$scope.data)
            .then(function(response){
            console.log(response);
            console.log('success');
            $scope.shortstory = response.data.anthology;
            console.log($scope.shortstory)
            //$state.go('login')
           
            
        })
            .catch(function(data) {
            console.log('failed');
        })
    };
    $scope.addToCart = function(x) {
       console.log(x);
        $scope.myVar = true;
        var img = document.getElementById("simages");
        img.setAttribute("src",x.image);
        var t = document.getElementById("titles");
        t.innerHTML = x.title;
        //$scope.titles = x.title;
        //console.log('addToCart' + $scope.titles);
        var a = document.getElementById("authors");
        a.innerHTML = x.author;
        //$scope.authors = x.author;
         //console.log('addToCart' + $scope.authors);
        var desc = document.getElementById("description");
        desc.innerHTML = x.description;
        var ref = document.getElementById("refNo");
        ref.innerHTML = x.refNo;
        var isbn = document.getElementById("isbn");
        isbn.innerHTML = x.ISBN;
        var page = document.getElementById("pages");
        page.innerHTML = x.numOfPages;
}
    $scope.makePayment = function() {
        console.log("inside payment");
        $scope.payVar = false;
        
        var t = document.getElementById("titles");
        tit=t.innerHTML;
        $rootScope.titles = tit;
        var a = document.getElementById("authors");
        auth = a.innerHTML
        $rootScope.authors = auth;
        $scope.obj = {
            user:$scope.user,
            title:tit,
            author:auth,
            price:350,
            return:false,
            due:1,
            date:1,
        }
        console.log($scope.obj);
         $http.post('/book',$scope.obj)
            .then(function(response){
             console.log('success inside makepayment');
            //console.log(response);
             console.log(response.data);
             if(response.data.err=='failure') {
                 $scope.payVar = false;
                 $window.alert("You have already taken this book.Please buy a new book.")
             }
            else if(response.data.err=='success') {
                //$scope.payVar = true;
                console.log('inside else');
                
                $scope.ButtonText="booked";
                $scope.dsblBtn = true;
                $scope.flag=1;
             $window.alert("Your booking has been confirmed");
              $state.go('payment');  
            }
        
           
            
        })
            .catch(function(data) {
            console.log('failed');
        })
        
    }
    if($rootScope.flags==1) {
       
       console.log('inside CatlistCtrl' +$rootScope.flags);
        $rootScope.flags =0;
        //var t = document.getElementById("titles");
        //tit=t.innerHTML;
        //var a = document.getElementById("authors");
        //auth = a.innerHTML
        console.log('title:' + $scope.titles);
        console.log('author' + $scope.authors);
        $rootScope.date1 = new Date();
        $scope.obj = {
            user:$scope.user,
            title:$rootScope.titles,
            author:$rootScope.authors,
            price:350,
            return:false,
            due:1,
            date:$rootScope.date1,
            button:'return'
        }
        console.log($scope.obj);
         $http.post('/pay',$scope.obj)
            .then(function(response){
             console.log('success inside makepayment');
            //console.log(response);
             console.log(response.data);
             if(response.data.err=='failure') {
                 $scope.payVar = false;
                 $window.alert("You have already taken this book.Please buy a new book.")
             }
            else if(response.data.err=='success') {
                //$scope.payVar = true;
                console.log('inside else');
                
                $scope.ButtonText="booked";
                $scope.dsblBtn = true;
                $scope.flag=1;
             $window.alert("Your payment is done. Track your booking in myAccount");
              $state.go('account');  
                
            }
        
           
            
        })
            .catch(function(data) {
            console.log('failed');
        })
       
    }
    
    
    
    }); 