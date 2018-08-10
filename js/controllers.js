var app =angular.module('app.controllers',[]);
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
            
});
            
app.controller('displayCtrl',function($scope,$http,$location,$state,$rootScope,$compile) {
    
     $scope.user = $rootScope.user;
        $scope.object =
            {
                name:$scope.user
            }
    $scope.calc = function(x) {
              console.log('inside calc');
        console.log('date:'+ x.date);
        var today = new Date();
var dd = today.getDate();
var mm = today.getMonth()+1; //January is 0!
var yyyy = today.getFullYear();
if(dd<10) {
dd='0'+dd
}
if(mm<10) {
mm='0'+mm
}
today = yyyy+'/'+mm+'/'+dd;
var date2 = new Date(2018,11,11);
var date1 = new Date(x.date);
var timeDiff = Math.abs(date2.getTime() - date1.getTime());
$scope.dayDifference = Math.ceil(timeDiff / (1000 * 3600 * 24));
console.log($scope.dayDifference);
        $scope.due =$scope.dayDifference;
        x.due=$scope.dayDifference;
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
            /*var ele = document.getElementById("purchase");
            ele.innerHTML="";
            var tr = document.createElement("tr");
            var th1=document.createElement("th")
            th1.innerHTML = "Serial";
            tr.appendChild(th1);
                
            var th2=document.createElement("th")
            th2.innerHTML = "Title";
            tr.appendChild(th2);
                
            var th3=document.createElement("th")
            th3.innerHTML = "Author";
            tr.appendChild(th3);  
                
            var th4=document.createElement("th")
            th4.innerHTML = "Price";
            tr.appendChild(th4);
                
            var th5=document.createElement("th")
            th5.innerHTML = "Return status";
            tr.appendChild(th5);
                
            var th6=document.createElement("th")
            th6.innerHTML = "Due Amount";
            tr.appendChild(th6);
                
            var th7=document.createElement("th")
            th7.innerHTML ="Days";
            tr.appendChild(th7);
            var th8=document.createElement("th")
            th8.innerHTML ="Return";
            tr.appendChild(th8)
            ele.appendChild(tr);
            for(var i=0;i<response.data.length;i++) {
            var tr1 = document.createElement("tr")
            
                
            var td1=document.createElement("td")
            td1.innerHTML = response.data[i].serial;
            tr1.appendChild(td1);
                
            var td2=document.createElement("td")
            td2.innerHTML = response.data[i].title;
            tr1.appendChild(td2);
                
            var td3=document.createElement("td")
            td3.innerHTML = response.data[i].author;
            tr1.appendChild(td3);  
                
            var td4=document.createElement("td")
            td4.innerHTML = response.data[i].price;
            tr1.appendChild(td4);
                
            var td5=document.createElement("td")
            td5.innerHTML = response.data[i].returns;
            tr1.appendChild(td5);
                
            var td6=document.createElement("td")
            td6.innerHTML = response.data[i].due;
                $scope.date =response.data[i].date;
            td6.setAttribute("ng-model","buydate");
                $compile(td6)($scope);
            tr1.appendChild(td6);
                
            var td7=document.createElement("td")
            td7.innerHTML = response.data[i].date;
            tr1.appendChild(td7);
            var td8=document.createElement("td")
            var btn = document.createElement("input");
            btn.setAttribute("type","button");
            btn.setAttribute("id","readMore")
            btn.setAttribute("ng-click","calc()") ;   
            btn.setAttribute("value",response.data[i].button);
                $compile(btn)($scope);
                //$compile(ele)($scope);
                td8.appendChild(btn);
               tr1.appendChild(td8);
            ele.appendChild(tr1);
            }*/
            console.log('successfully got purchase details of the user');
            
    
        })
          
          
}); 
            


            
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