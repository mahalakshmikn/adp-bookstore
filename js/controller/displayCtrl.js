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