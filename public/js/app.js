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
    $scope.cancel = function() {
        $scope.formData ={};
        $state.go('home');
    }
});
            
app.controller('login',function($scope,$http,$location,$state,$rootScope) {
    var ad1 = document.getElementById("ad1");
    var ad2 = document.getElementById("ad2");
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
    $scope.cancel = function() {
        $scope.formData="";
        $state.go("home");
    }
    $scope.closead1 = function() {
        ad1.style.visibility="hidden";
    }
    $scope.closead2 = function() {
        ad2.style.visibility="hidden";
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
    var refund = document.getElementById("refund");
    var modal = document.getElementById('myModal');
    var modal2 = document.getElementById('myModal2');
     $scope.user = $rootScope.user;
    $scope.x ={};
    $scope.returns="";
    $scope.due="";
    $scope.refund="";
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
    
    $scope.return = function(x) {
       modal2.style.display="block" ;
        $scope.x =
            {
           
                                title:x.title,
                                author:x.author,
                                price:x.price,
                                returns:x.return,
                                due:x.due,
                                date:x.date,
                                button:x.button,
                                regood: x.regood,
                                rebad: x.rebad,
                                refund:x.refund
        }
        x.returns = true;
        x.refund="refund pending";
        
    }
    
    $scope.returnBook = function() {
        $scope.retVar = true;
        console.log($scope.x);
             //btn.target.disabled= true;
              //$scope.ack = false;
              console.log('inside return');
              console.log('return status' + $scope.x.returns);
              
        $scope.returns = true;
        $scope.x.returns = true;
        $scope.refund="refund pending";
        $scope.x.refund = "refund pending";
        //refund.style.color="blue";
        
        var date2 = new Date();
        console.log("user returned date:" + date2);
        var date1 = new Date($scope.x.date);
        var timeDiff = Math.abs(date2.getTime() - date1.getTime());
        $scope.dayDifference = Math.ceil(timeDiff / (1000 * 3600 * 24));
        console.log($scope.dayDifference);
                if($scope.x.price > $scope.dayDifference) {
        $scope.due =$scope.x.price - $scope.dayDifference;
        $scope.x.due=$scope.due;
        
                }
                else 
                    {
                      $scope.due =0
                      $scope.x.due=0 
                    }
        
        $scope.obj = $scope.x;
        $scope.obj['user']=$scope.user;
        $http.post('/returnBook',$scope.obj)
        .then(function(response) {
            console.log('inside returnbook');
            console.log('successfully changed the return status');
            modal2.style.display ="none";
            
            
    
        })
        .catch(function(data) {
            console.log("failed");
        });
    
       

        //$window.alert("Thank you for returning. We are on our way to pick up the book.")
        modal.style.display ="block";
}
    $scope.close = function() {
        modal.style.display="none";
    }
    $scope.close1 = function() {
        modal2.style.display="none";
    }
          
          
}); 
            


            
app.controller('catListCtrl', function($scope, $http,$location,$state,$stateParams,$window,$rootScope) {
    
    var modal = document.getElementById('myModal');
    var modal2 = document.getElementById('myModal2');
    var modal3 = document.getElementById('myModal3');
// Get the button that opens the modal
    var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
   var span = document.getElementsByClassName("close")[0];
    
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
    
    $scope.getNew = function() {
        //$scope.showMy = false;
        $scope.myVar=false;
        console.log("inside get_new function");
       //console.log($scope.uname);
        $http.post('/new',$scope.data)
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
    $scope.getBest = function() {
        //$scope.showMy = false;
        $scope.myVar=false;
        console.log("inside get_new function");
       //console.log($scope.uname);
        $http.post('/getbest',$scope.data)
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
    $scope.myFunction = function()
    {
    console.log("inside myFunction");
        console.log($scope.input);
    var input, filter, booklist,book, a, i;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
        booklist = document.getElementById("booklist");
        book = booklist.getElementsByTagName("div");
        console.log("book" + book.length);
    //ul = document.getElementById("title");
    //li = ul.getElementsByTagName("li");
    for (i = 0; i < book.length; i++) {
        console.log("inside for");
        a = book[i].getElementsByTagName("p")[0];
        if (a.innerHTML.toUpperCase().indexOf(filter) > -1) {
            console.log("inside if");
            book[i].style.display = "";
        } else {
            console.log("inside else");
            book[i].style.display = "none";
        }
    }

    }
    
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
                 //$window.alert("You have already taken this book.Please buy a new book.")
                 modal3.style.display="block";
             }
            else if(response.data.err=='success') {
                //$scope.payVar = true;
                console.log('inside else');
                
                
                //$scope.dsblBtn = true;
                $scope.flag=1;
             //$window.alert("Your booking has been confirmed");
                //modal.style.display="block";
            
              $state.go('payment');  
            }
        
           
            
        });
            //.catch(function(data) {
            //console.log('failed');
        //})
        
    }
    $scope.close= function() {
                modal.style.display = "none";
            }
          $scope.close1= function() {
                modal2.style.display = "none";
            }
           $scope.close2= function() {
                modal3.style.display = "none";
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
                modal3.style.display="block";
             }
            else if(response.data.err=='success') {
                //$scope.payVar = true;
                console.log('inside else');
                
                $scope.ButtonText="booked";
                $scope.dsblBtn = true;
                $scope.flag=1;
             //$window.alert("Your payment is done. Track your booking in myAccount");
                modal.style.display="block";
              //$state.go('account');  
                
            }
             
                 console.log("this book is eligible for best seller");
                 $scope.obj['count']=response.data.count;
                 $http.post('/best',$scope.obj)
                 .then(function(response) {
                     $scope.best_obj = response.data;
                     console.log($scope.best_obj);
                     if(response.data.count >=3) {
                 console.log("this book is eligible for best seller");
                           $http.post('/addbest',$scope.best_obj)
                             .then(function(response){
                                console.log("succcessfully added the best seller");
                            })
                             .catch(function(response){
                                    console.log("failed addbest");
                                    });
                         
                     }
                         
                 })
                 .catch(function(response){
                     console.log("failed best");
                 });
             
        
           
            
        })
            .catch(function(data) {
            console.log('failed pay');
        })
       
    }
    
    
}); 


app.controller('payCtrl',function($scope,$rootScope,$http,$location,$state,$stateParams,$window) {
     
          var modal = document.getElementById('myModal');
          var modal2 = document.getElementById('myModal2');
   var ad1 = document.getElementById("ad1");
    var ad2 = document.getElementById("ad2");
        
    
          $scope.changeStatus = function() {
        if($scope.month >12 || $scope.year < 2019) {
            //$window.alert("Invalid month");
            modal.style.display="block";
        }
        else {
            //$window.alert("Payment is successful and Track your order in 'My Account'")
            
            console.log('inside successful payment');
            $rootScope.flags =1;
            $state.go('categories');
        }
          }
          $scope.bookCancel = function() {
              //$window.alert("your booking has been cancelled.")
               modal2.style.display = "block";
              //$state.go('categories');
          }
          $scope.close = function() {
              modal.style.display="none";
          }
          $scope.close1 = function() {
              modal2.style.display="none";
          }
          $scope.closead1 = function() {
        ad1.style.visibility="hidden";
    }
    $scope.closead2 = function() {
        ad2.style.visibility="hidden";
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
                $state.go('owner');
            }
        })
              
          }
          $scope.cancel = function() {
              console.log("inside cancel");
              $scope.formData.ownerid="";
              //$rootScope.owner="";
              $state.go('owner');
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
    if($rootScope.owner==="") {
        $state.go("owner");
    } 
    else {
    var modal = document.getElementById('myModal');
    var modal2 = document.getElementById('myModal2');
// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];
    

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
            modal.style.display = "block";
            
        });
            }
            $scope.close= function() {
                modal.style.display = "none";
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
                    //$window.alert("Thank you for your acknowledgement!!!. The refund amount of Rs. " + $scope.old_due + " is cancelled to " + $scope.user +  ". The process is successfully completed.");
                    modal2.style.display = "block";
                    
        });
            }
            $scope.close1= function() {
                modal2.style.display = "none";
            }
        });
    }
});

app.controller('orderHistoryCtrl',function($scope,$http,$location,$state,$rootScope,$compile,$window) {
    if($rootScope.owner=="") {
        $state.go("owner");
    }
    else {
     $scope.user = $rootScope.user;
     $scope.owner = $rootScope.owner;
     var refund = document.getElementById("refund");
        $scope.object =
            {
                name:$scope.owner
            }
    
    
        $http.post('/getHistory',$scope.object)
        .then(function(response) {
            console.log('inside display' + response.data);
            $scope.myhistory = response.data;
            var refundstatus = response.data.refund;
            if(refundstatus =="refunded") {
                refund.style.color="green";
            }
            else if(refundstatus=="refund cancelled") {
                refund.style.color="red";
            }
            
            console.log('successfully got history details of the owner ');
        });
    }
});

app.controller('userHistoryCtrl',function($scope,$http,$location,$state,$rootScope,$compile) {
     $scope.user = $rootScope.user;
     $scope.owner = $rootScope.owner;
     var refund = document.getElementById("refund");
        $scope.object =
            {
                name:$scope.user
            }
    
    
        $http.post('/getuserHistory',$scope.object)
        .then(function(response) {
            console.log('inside display' + response.data);
            $scope.history = response.data;
            var refundstatus = response.data.refund;
            if(refundstatus =="refunded") {
                refund.style.color="green";
            }
            else if(refundstatus=="refund cancelled") {
                refund.style.color="red";
            }
            
            
            console.log('successfully got history details of the user ');
        });
});

app.controller('myBooksCtrl',function($scope,$http,$location,$state,$rootScope,$compile,$window) {
    if($rootScope.owner=="") {
        $state.go("owner");
    }
    else {
     var modal = document.getElementById('myModal');
    var modal2 = document.getElementById('myModal2');
     $scope.owner = $rootScope.owner;
    //$scope.archVar = "true";
    $scope.unarchVar ="false";
     
        $scope.object =
            {
                name:$scope.owner
            }
    
    
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
        //$window.alert("successfully archived this book from the database");
                   modal.style.display="block";
        });  
             }
         else if($scope.owner=="ownerid_2") {
             $http.post('/delBook2',$scope.delobj)
        .then(function(response) {
        console.log('successfully archived books from the database');
        //$window.alert("successfully archived this book from the database");
                 modal.style.display="block";
        });  
             
         }
         else if($scope.owner=="ownerid_3") {
             $http.post('/delBook3',$scope.delobj)
        .then(function(response) {
        console.log('successfully archived books from the database');
        //$window.alert("successfully archived this book from the database"); 
        modal.style.display="block";
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
        //$window.alert("successfully unarchived this book from the database");modal.style.display="block";
                   modal2.style.display="block";
        });  
             }
         else if($scope.owner=="ownerid_2") {
             $http.post('/unarchBook2',$scope.delobj)
        .then(function(response) {
        console.log('successfully unarchived books from the database');
        //$window.alert("successfully unarchived this book from the database");
                 modal2.style.display="block";
        });  
             
         }
         else if($scope.owner=="ownerid_3") {
             $http.post('/unarchBook3',$scope.delobj)
        .then(function(response) {
        console.log('successfully unarchived books from the database');
        //$window.alert("successfully unarchived this book from the database"); 
                 modal2.style.display="block";
        });  
             
         }
             
         }
     }
     $scope.delete1 = function(x) {
         $scope.unarchVar ="true";
     }
     $scope.close = function() {
         modal.style.display="none";
     }
     $scope.close1 = function() {
         modal2.style.display="none";
     }
    }
});
             
 app.controller('addbooksCtrl',function($scope,$http,$location,$state,$rootScope,$compile,$window) {
     
     $scope.owner = $rootScope.owner;
     
        $scope.object =
            {
                name:$scope.owner
            }
    
    
      $scope.bookCancel = function() {
              $state.go("myBooks");
               //modal2.style.display = "block";
              //$state.go('categories');
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
            archive:"false",
            archbtn:"archive",
            count:0
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
                console.log('failed to add books in the addbook1 database');
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
                console.log('failed to add books in the addbook2 database');
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
               
            
    
    

       


            
