var app =angular.module('myApp', ['ui.router'])
            .run(function($rootScope) {
                $rootScope.n = "";
                $rootScope.flags = 0;
                 $rootScope.titles="";
                $rootScope.authors="";
                $rootScope.price ="";
                $rootScope.date1="";
                $rootScope.owner="";
                $rootScope.owner_id="";
                //$rootScope.ownerVar = false;
                
                              })
.config(['$locationProvider', '$stateProvider','$urlRouterProvider', function ($locationProvider, $stateProvider,$urlRouterProvider) {
    $urlRouterProvider.otherwise('/');
        $stateProvider
        .state('home', {
            url: '/home',
            views: {
                'header': {
                    templateUrl: "/templates/main.htm",
                    controller:"main"
                    
                },
                'content': {
                    templateUrl: '/templates/content.htm'
                }
            }
        })
    .state('about', {
            url: '/about',
            views: {
                
                'content': {
                    templateUrl: '/templates/about.htm'
                }
            }
        })
    .state('how', {
            url: '/how',
            views: {
                
                'content': {
                    templateUrl: '/templates/how.htm'
                }
            }
        })
    .state('contact', {
            url: '/contact',
            views: {
                
                'content': {
                    templateUrl: '/templates/contact.htm'
                }
            }
        })
    .state('ownerhome', {
            url: '/ownerhome',
            views: {
                'header': {
                    templateUrl: "/templates/ownermain.htm",
                    controller:"ownermain"
                    
                },
                'content': {
                    templateUrl: '/templates/content.htm'
                }
            }
        })
    
     .state('signup', {
            url: '/signup',
            views: {
                'header': {
                    templateUrl: "/templates/signup1.htm",
                    controller:"register"
                    
            }
                
            }
        })
    .state('login', {
            url: '/login',
            views: {
                'header': {
                    templateUrl: "/templates/login.htm",
                    controller:"login"
                    
                },
                'content': {
                    templateUrl: '/templates/content.htm'
                }
            }
        })
    .state('main', {
            url: '/',
            views: {
                'header': {
                    //templateUrl: "/templates/main.htm",
                    templateUrl:"/templates/login.htm",
                    //controller:"main"
                    controller:"login"
                    
                },
                'content': {
                    templateUrl: '/templates/content.htm'
                }
            }
        })
    .state('categories', {
            url: '/categories',
            views: {
                'header': {
                    templateUrl: "/templates/main.htm",
                    controller:"main"
                    
                    
                },
                
                'content': {
                    templateUrl: '/templates/cat_list.htm',
                    controller:"catListCtrl"
                }
                
            }
        })
    .state('myAccount', {
            url: '/account',
            views: {
                'header': {
                    templateUrl: "/templates/main.htm",
                    controller:"main"
                    
                    
                },
                
                'content': {
                    templateUrl: '/templates/display.htm',
                    controller:"displayCtrl"
                }
                
            }
        })
    .state('myOrders', {
            url: '/myorder',
            views: {
                'header': {
                    templateUrl: "/templates/ownermain.htm",
                    controller:"ownermain"
                    
                    
                },
                
                'content': {
                    templateUrl: '/templates/orderdisplay.htm',
                    controller:"orderDisplayCtrl"
                }
                
            }
        })
    .state('addBooks', {
            url: '/addBook',
            views: {
                'header': {
                    templateUrl: "/templates/ownermain.htm",
                    controller:"ownermain"
                    
                    
                },
                
                'content': {
                    templateUrl: '/templates/addbooks.htm',
                    controller:"addbooksCtrl"
                }
                
            }
        })
    .state('myHistory', {
            url: '/myhistory',
            views: {
                'header': {
                    templateUrl: "/templates/ownermain.htm",
                    controller:"ownermain"
                    
                    
                },
                
                'content': {
                    templateUrl: '/templates/orderhistory.htm',
                    controller:"orderHistoryCtrl"
                }
                
            }
        })
    .state('userHistory', {
            url: '/history',
            views: {
                'header': {
                    templateUrl: "/templates/main.htm",
                    controller:"main"
                    
                    
                },
                
                'content': {
                    templateUrl: '/templates/userhistory.htm',
                    controller:"userHistoryCtrl"
                }
                
            }
        })
    .state('payment', {
            url: '/payment',
            views: {
                'header': {
                    templateUrl: "/templates/main.htm",
                    controller:"main"
                    
                    
                },
                
                'content': {
                    templateUrl: '/templates/pay.htm',
                    controller:"payCtrl"
                }
                
            }
        })
    
    .state('owner', {
            url:'/ownerLogin',
                views: {
                    
                    'content': {
                        
                       templateUrl: '/templates/ownerlogin.htm',
                    controller:"ownerloginCtrl" 
                    }
                    
                }
        })
    .state('myBooks', {
            url:'/myBooks',
                views: {
                    'header': {
                    templateUrl: "/templates/ownermain.htm",
                    controller:"ownermain"
                    
                    
                },
                
                    
                    'content': {
                        
                       templateUrl: '/templates/mybooks.htm',
                       controller:"myBooksCtrl" 
                    }
                    
                }
        })
    .state('ownersignup', {
            url:'/ownerSignup',
                views: {
                    
                    'content': {
                        
                       templateUrl: '/templates/ownersignup.htm',
                    controller:"ownersignupCtrl" 
                    }
                    
                }
        });
    
    
    
    }]); 


app.controller('register', function($scope, $http,$location,$state,$window) {
    $scope.save = function() {
        
       //console.log($scope.uname);
        $http.post('/uname',$scope.formData)
            .then(function(response){
            console.log(response);
            if(response.data.msg =="failure") {
               //$window.alert("This username already exists");
                var ele = document.getElementById("err")
                ele.innerHTML ="* This username already exists";
                ele.setAttribute("class","details");
            } else {
            
            console.log('success');
            $state.go('login');
            }
           
            
        })
            .catch(function(data) {
            console.log('failed');
        })
        
    };
});
            
app.controller('login',function($scope,$http,$location,$state,$rootScope) {
    
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
            
app.controller('main',function($scope,$rootScope,$http,$location,$state,$stateParams) {
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
     $scope.displayhistory = function () {
        //$scope.showMy = true;
        $state.go('userHistory');
        
    }
            
});
            
app.controller('displayCtrl',function($scope,$http,$location,$state,$rootScope,$compile,$window) {
    
     $scope.user = $rootScope.user;
        $scope.object =
            {
                name:$scope.user
            }
    
    
        $http.post('/getPurchase',$scope.object)
        .then(function(response) {
            console.log('inside display' + response.data);
            $scope.categories = response.data;
            for(var i=0;i<response.data.length;i++)
                {
                    console.log(response.data[i].title);
                    console.log(response.data[i].button);
                    console.log(response.data[i].date);
                   
                }
            
            console.log('successfully got purchase details of the user');
            
    
        })
    
    $scope.returnBook = function(x) {
              $scope.ack = false;
              console.log('inside return');
              console.log('return status' + x.returns);
              
        $scope.returns = true;
        x.returns = $scope.returns;
        $scope.refund="refund pending";
        x.refund = $scope.refund;
        
var date2 = new Date();
        console.log("user returned date:" + date2);
var date1 = new Date(x.date);
var timeDiff = Math.abs(date2.getTime() - date1.getTime());
$scope.dayDifference = Math.ceil(timeDiff / (1000 * 3600 * 24));
console.log($scope.dayDifference);
                if(x.price > $scope.dayDifference) {
        $scope.due =x.price - $scope.dayDifference;
        x.due=$scope.due;
        
                }
                else 
                    {
                      $scope.due =0
                      x.due=0 
                    }
        
        $scope.obj = x;
        $scope.obj['user']=$scope.user;
        $http.post('/returnBook',$scope.obj)
        .then(function(response) {
            console.log('inside returnbook' + response.data.returnValue);
            console.log('successfully changed the return status');
            
            
            
    
        })
        .catch(function(data) {
            console.log("failed");
        });
    
       

        $window.alert("Thank you for returning. We are on our way to pick up the book.")
}
          
          
}); 
            


            
app.controller('catListCtrl', function($scope, $http,$location,$state,$stateParams,$window,$rootScope) {
    //$scope.showMy = false;
    $scope.user = $rootScope.user;
    console.log('inside CatList Ctrl' + $scope.user);
    $scope.payVar = false;
    $scope.flag = 0;
    console.log('title:' + $scope.titles);
        console.log('author' + $scope.authors);
    
    
    
    $scope.getSs = function() {
        //$scope.showMy = false;
        $scope.myVar=false;
        console.log("inside get_css function");
       //console.log($scope.uname);
        $http.post('/ss',$scope.data)
            .then(function(response){
            console.log(response);
            console.log('success');
            $scope.shortstory = response.data;
            console.log($scope.shortstory)
            //$state.go('login')
           
            
        })
            .catch(function(data) {
            console.log('failed');
        })
    };
    
    $scope.getCh = function() {
        //$scope.showMy = false;
        $scope.myVar=false;
        console.log("inside get_ch function");
       //console.log($scope.uname);
        $http.post('/ch',$scope.data)
            .then(function(response){
            console.log(response);
            console.log('success');
            $scope.shortstory = response.data;
            console.log($scope.shortstory)
            //$state.go('login')
           
            
        })
            .catch(function(data) {
            console.log('failed');
        })
    };
    
    $scope.getBi = function() {
        //$scope.showMy = false;
        $scope.myVar=false;
        console.log("inside get_bi function");
       //console.log($scope.uname);
        $http.post('/bi',$scope.data)
            .then(function(response){
            console.log(response);
            console.log('success');
            $scope.shortstory = response.data;
            console.log($scope.shortstory)
            //$state.go('login')
           
            
        })
            .catch(function(data) {
            console.log('failed');
        })
    };
    
    $scope.addToCart = function(x) {
       console.log(x);
        $rootScope.owner_id = x.ownerId;
        console.log("owner" + $rootScope.owner_id);
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
        var price = document.getElementById("price");
        price.innerHTML = x.price;
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
        var p = document.getElementById("price");
        price = p.innerHTML
        $rootScope.price = price;
        $scope.obj = {
            user:$scope.user,
            title:tit,
            author:auth,
            price:price,
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
        console.log('title:' + $scope.titles);
        console.log('author' + $scope.authors);
        console.log('owner' + $rootScope.owner_id);
        $rootScope.date1 = new Date();
        $scope.obj = {
            user:$scope.user,
            title:$rootScope.titles,
            author:$rootScope.authors,
            price:$rootScope.price,
            return:false,
            due:1,
            date:$rootScope.date1,
            owner: $rootScope.owner_id,
            button:'return',
            regood:'received good',
            rebad:'received bad',
            refund:'not refunded'
        }
        console.log($scope.obj);
         $http.post('/pay',$scope.obj)
            .then(function(response){
             console.log('success inside payment');
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
          $scope.bookCancel = function() {
              $window.alert("your booking has been cancelled.")
              $state.go('categories');
          }
        
    });  

 app.controller('ownerloginCtrl',function($scope,$rootScope,$http,$location,$state,$stateParams,$window) {
        $rootScope.ownerVar = !$rootScope.ownerVar;
          console.log("owner:"+$rootScope.owner);
          if($rootScope.owner !="")
              {
                  $rootScope.ownerVar = !$rootScope.ownerVar;
                  $state.go('ownerhome');
              }
          $scope.login = function() {
              $rootScope.ownerVar = true;
              $http.post('/ownersignin',$scope.formData)
        .then(function(response) {
            console.log(response.data.msg);
            console.log(response.data.name);
            //$scope.user = response.data.name;
            $rootScope.owner = response.data.name;
            $scope.user = $rootScope.user;
            if(response.data.msg =="success") {
            console.log('signed in successfully');
            //$state.go('categories', {user:$scope.user});
                $state.go('ownerhome');
            }
            else {
                $scope.formData ={};
                $state.go('login');
            }
        })
              
          }
        
    });  
app.controller('ownersignupCtrl', function($scope, $http,$location,$state,$window) {
    $scope.save = function() {
        
       //console.log($scope.uname);
        $http.post('/owneruname',$scope.formData)
            .then(function(response){
            console.log(response);
            if(response.data.msg =="failure") {
               //$window.alert("This username already exists");
                var ele = document.getElementById("err")
                ele.innerHTML ="* This ownerid already exists";
                ele.setAttribute("id","details");
            } else {
            //console.log("inside else");
            console.log('success');
            $state.go('owner');
            }
           
            
        })
            .catch(function(data) {
            console.log('failed');
        })
        
    };
});

app.controller('ownermain',function($scope,$rootScope,$http,$location,$state,$stateParams) {
    console.log("rootscope" + $rootScope.owner);
    $scope.owner = $rootScope.owner;
    console.log("this scope" + $scope.owner);
    //var user = $stateParams.user;
    if($scope.owner==null) {
        console.log('Not logged in');
        $state.go('owner');
    } else {
    console.log('inside owner_main_controller ' + $scope.owner);
        
    }
    $scope.logout = function() {
        //$rootScope.ownerVar = false;
        $rootScope.owner="";
        $state.go('owner');
    }
    $scope.books = function() {
        $state.go("myBooks");
    }
    
    $scope.display = function () {
        //$scope.showMy = true;
        $state.go('myOrders');
        
    }
    
    $scope.displayhistory = function () {
        //$scope.showMy = true;
        $state.go('myHistory');
        
    }
            
});

app.controller('orderDisplayCtrl',function($scope,$http,$location,$state,$rootScope,$compile,$window) {
     $scope.user = $rootScope.user;
     $scope.owner = $rootScope.owner;
     
        $scope.object =
            {
                name:$scope.owner
            }
    
    
        $http.post('/getOrders',$scope.object)
        .then(function(response) {
            console.log('inside display' + response.data);
            $scope.myorders = response.data;
            
            
            console.log('successfully got order details of the user');
            
            $scope.calc = function(x) {
                console.log("x" + x.user);
                $scope.user = x.user;
               console.log("inside calc");
                $scope.returns = true;
                x.returns = true;
                
   //console.log("inside calc order" + x.price) ;             
var date2 = new Date();
console.log("owner acknowledged date:" + date2);
var date1 = new Date(x.date);
var timeDiff = Math.abs(date2.getTime() - date1.getTime());
$scope.dayDifference = Math.ceil(timeDiff / (1000 * 3600 * 24));
console.log($scope.dayDifference);
                if(x.price > $scope.dayDifference) {
        $scope.due =x.price - $scope.dayDifference;
        x.due=$scope.due;
                }
                else 
                    {
                      $scope.due =0
                      x.due=0 
                    }
                $scope.rb = true;
                
            
            
            $scope.obj = x;
                
        $scope.obj['user']=$scope.user;
            $scope.obj['due'] =$scope.due;
            $scope.obj['owner'] = $scope.owner;
        $http.post('/refund',$scope.obj)
        .then(function(response) {
            console.log('inside refund' + response.data.returnValue);
            console.log('successfully updated the refund amount');
            $window.alert("Thank you for your acknowledgement!!!. Rs. " + $scope.due + " is refunded to " + $scope.user +  ". The process is successfully completed.");
            /*var popup = document.getElementById("myPopup");
    popup.classList.toggle("show");

    $scope.close=function(){
        var popup = document.getElementById("myPopup");
    popup.classList.hide("show");
        
    }*/
        });
            }
            
            $scope.norefund = function(x)
            {
                  $scope.user = x.user;
                $scope.old_due = x.due;
                //$scope.rg=true;
                console.log("no refund");
                $scope.due =0;
                      x.due=0;
                $scope.obj = x;
                $scope.obj['user']=$scope.user;
                $scope.obj['due'] =$scope.due;
                $scope.obj['owner'] = $scope.owner;
                $http.post('/norefund',$scope.obj)
        .then(function(response) {
            console.log('inside refund' + response.data.returnValue);
            console.log('successfully updated the refund amount');
                    $window.alert("Thank you for your acknowledgement!!!. The refund amount of Rs. " + $scope.old_due + " is cancelled to " + $scope.user +  ". The process is successfully completed.");
                    
        });
            }
        });
});

app.controller('orderHistoryCtrl',function($scope,$http,$location,$state,$rootScope,$compile,$window) {
     $scope.user = $rootScope.user;
     $scope.owner = $rootScope.owner;
     
        $scope.object =
            {
                name:$scope.owner
            }
    
    
        $http.post('/getHistory',$scope.object)
        .then(function(response) {
            console.log('inside display' + response.data);
            $scope.myhistory = response.data;
            
            
            console.log('successfully got history details of the owner ');
        });
});

app.controller('userHistoryCtrl',function($scope,$http,$location,$state,$rootScope,$compile) {
     $scope.user = $rootScope.user;
     $scope.owner = $rootScope.owner;
     
        $scope.object =
            {
                name:$scope.user
            }
    
    
        $http.post('/getuserHistory',$scope.object)
        .then(function(response) {
            console.log('inside display' + response.data);
            $scope.history = response.data;
            
            
            console.log('successfully got history details of the user ');
        });
});

app.controller('myBooksCtrl',function($scope,$http,$location,$state,$rootScope,$compile,$window) {
     
     $scope.owner = $rootScope.owner;
    //$scope.archVar = "true";
    $scope.unarchVar ="false";
     
        $scope.object =
            {
                name:$scope.owner
            }
    
    
        /*$http.post('/getownerBooks',$scope.object)
        .then(function(response) {
            console.log($scope.owner);
            console.log('inside myBooksCtrl' + response.data.anthology);
            if($scope.owner === "ownerid_1") {
            $scope.myBooks = response.data.anthology;
            }
            else if($scope.owner=== "ownerid_2") {
                $scope.myBooks = response.data.children;
            }
            else if($scope.owner=== "ownerid_3") {
                $scope.myBooks = response.data.biography;
            }
        console.log('successfully got book details of the owner ');
        });*/
    
   
    if($scope.owner ==="ownerid_1") {
        $http.post('/ownerss',$scope.data)
            .then(function(response){
            console.log(response);
            console.log('success');
            $scope.myBooks = response.data;
            console.log($scope.myBooks)
            //$state.go('login')
           
            
        })
            .catch(function(data) {
            console.log('failed');
        })
        
    }
    else if($scope.owner==="ownerid_2") {
        $http.post('/ownerch',$scope.data)
            .then(function(response){
            console.log(response);
            console.log('success');
            $scope.myBooks = response.data;
            console.log($scope.myBooks)
            //$state.go('login')
           
            
        })
            .catch(function(data) {
            console.log('failed');
        })
        
    }
    else if($scope.owner==="ownerid_3") {
        $http.post('/ownerbi',$scope.data)
            .then(function(response){
            console.log(response);
            console.log('success');
            $scope.myBooks = response.data;
            console.log($scope.myBooks)
            //$state.go('login')
           
            
        })
            .catch(function(data) {
            console.log('failed');
        })
        
    }
     $scope.addbooks = function() {
        $state.go('addBooks')
    }
     $scope.delete = function(x) {
         $scope.delobj = x;
         console.log("inside delete");
         console.log("archive status:" + x.archbtn);
         
         //$scope.archVar = "true";
         if(x.archbtn=="archive") 
         {
          x.archbtn="unarchive";     
         console.log($scope.owner);
         if($scope.owner==="ownerid_1")
             {
               $http.post('/delBook1',$scope.delobj)
        .then(function(response) {
        console.log('successfully archived books from the database');
        $window.alert("successfully archived this book from the database");
        });  
             }
         else if($scope.owner=="ownerid_2") {
             $http.post('/delBook2',$scope.delobj)
        .then(function(response) {
        console.log('successfully archived books from the database');
        $window.alert("successfully archived this book from the database");
        });  
             
         }
         else if($scope.owner=="ownerid_3") {
             $http.post('/delBook3',$scope.delobj)
        .then(function(response) {
        console.log('successfully archived books from the database');
        $window.alert("successfully archived this book from the database");         
        });  
             
         }
         }
         else if(x.archbtn=="unarchive") {
             console.log("archive status" + x.archbtn);
             x.archbtn="archive";
             if($scope.owner==="ownerid_1")
             {
               $http.post('/unarchBook1',$scope.delobj)
        .then(function(response) {
        console.log('successfully unarchived books from the database');
        $window.alert("successfully unarchived this book from the database");
        });  
             }
         else if($scope.owner=="ownerid_2") {
             $http.post('/unarchBook2',$scope.delobj)
        .then(function(response) {
        console.log('successfully unarchived books from the database');
        $window.alert("successfully unarchived this book from the database");
        });  
             
         }
         else if($scope.owner=="ownerid_3") {
             $http.post('/unarchBook3',$scope.delobj)
        .then(function(response) {
        console.log('successfully unarchived books from the database');
        $window.alert("successfully unarchived this book from the database");         
        });  
             
         }
             
         }
     }
     $scope.delete1 = function(x) {
         $scope.unarchVar ="true";
     }
});
             
 app.controller('addbooksCtrl',function($scope,$http,$location,$state,$rootScope,$compile,$window) {
     
     $scope.owner = $rootScope.owner;
     
        $scope.object =
            {
                name:$scope.owner
            }
    
    
        
    
    $scope.add = function() {
        $scope.addobj = {
            
            title : $scope.formData.newtitle,
            author:$scope.formData.newauthor,
            description:$scope.formData.newdesc,
            price:$scope.formData.newprice,
            refNo:$scope.formData.newref,
            ISBN:$scope.formData.newisbn,
            numOfPages:$scope.formData.newpageno,
            ownerId:$scope.owner,
            button:"BUY",
            edit:"edit",
            delete:"delete",
            archive:"false"
    }
        console.log($scope.addobj);
        if($scope.owner==="ownerid_1") {
            console.log("inside if");
        $http.post('/addBook1',$scope.addobj)
        .then(function(response) {
            console.log(response.data);
            if(response.data.name=="success") {
        console.log('successfully added books in the database');
        $window.alert("successfully added this book in the database");
            }
            else  if(response.data.name=="failure")  {
                console.log('failed to add books in the database');
        $window.alert("This book already exists in your database!!!");
            }
        })
            .catch(function(data) {
                console.log("failed");
            })
        }
        else if($scope.owner==="ownerid_2") {
        $http.post('/addBook2',$scope.addobj)
        .then(function(response) {
        if(response.data.name=="success") {
        console.log('successfully added books in the database');
        $window.alert("successfully added this book in the database");
            }
            else  if(response.data.name=="failure")  {
                console.log('failed to add books in the database');
        $window.alert("This book already exists in your database!!!");
            } 
        });
        }
        else if($scope.owner==="ownerid_3") {
        $http.post('/addBook3',$scope.addobj)
        .then(function(response) {
        if(response.data.name=="success") {
        console.log('successfully added books in the database');
        $window.alert("successfully added this book in the database");
            }
            else  if(response.data.name=="failure")  {
                console.log('failed to add books in the database');
        $window.alert("This book already exists in your database!!!");
            }  
        });
        }
        
    }
    

});            
               
            
    
    

       


            
