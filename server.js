var express = require('express');
var path = require('path');
var fs = require('fs');
var app = express();
var bodyParser = require('body-parser'); 
//var jsonfile = require('jsonfile');
var file ='./json/userdata.json';
var file1 ='./json/newbook.json';
var file11 ='./json/newbook_children.json';
var file111 ='./json/newbook_biography.json';
var file2 ='./json/newpurchase.json';
var file3 = './json/ownerdata.json';
var file4 = './json/history.json';
app.use(express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
    app.use(bodyParser.json());                                     // parse application/json
    /*app.use(bodyParser.json({ type: 'application/vnd.api+json' }));*/

app.get('/',function(req,res) {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.post('/uname',function(req,res) {
    console.log(req.body.uname);
    console.log(req.body);
   var uname = req.body.uname;
    var pwd = req.body.pwd;
    var fname = req.body.fname;
    var dob = req.body.dob;
    var address = req.body.address;
    var city = req.body.city;
    var phone = req.body.phone;
    var flag =0;
    var obj = {name : uname, password:pwd, firstName: fname, dob: dob, add:address, city:city, tele : phone};
    
    
    fs.readFile(file, (err, data) => {
    if (err && err.code === "ENOENT") {
        
        return fs.writeFile(file, JSON.stringify([obj]), error => console.error);
    }
    else if (err) {
        
        console.error(err);
    }    
    
    else {
        try {
            const fileData = JSON.parse(data);
            for(var i =0; i < fileData.length;i++) {
                        if(fileData[i].name==uname) {
                            flag =1;
                            break;
                        }
                    }
                    
                    if(flag ==1) {
                        var ob = {msg:'failure'}
                        res.send(ob);
                    }

            // 3. Append the object you want
            else {
                var ob = {msg:'success'}
                        res.send(ob);
            fileData.push(obj);

            //4. Write the file back out
            return fs.writeFile(file, JSON.stringify(fileData), error => console.error)
            }
        } catch(exception) {
            console.error(exception);
        }
    }
});
    
});

app.post('/signin',function(req,res) {
    
    console.log(req.body);
    var flag =0;
    var uname = req.body.uname;
    var pass = req.body.pwd;
    fs.readFile(file,(err,data) => {
        if(err) {
            console.error(err)
        }
        else
            {
                try {
                    const fileData = JSON.parse(data);
                    for(var i =0; i < fileData.length;i++) {
                        if(fileData[i].name==uname && fileData[i].password == pass) {
                            flag =1;
                            break;
                        }
                    }
                    
                    if(flag ==1) {
                        var ob = {msg:'success',name:uname}
                        res.send(ob);
                    }
                    else {
                        var ob = {msg:'failure'}
                        res.send(ob);
                        
                    }
                }
                catch(exception) {
                    console.log(exception);
                }
            }
    });
    
    
});

app.post('/ss',function(req,res) {
    fs.readFile(file1,(err,data)=> {
        if(err) {
            console.error(err);
        }
        else{
            try {
                const fileData = JSON.parse(data);
                console.log('success');
                //console.log(fileData);
                res.send(fileData);
                
            }
            catch(exception) {
                console.log(exception);
            }
        }
        
    });
    
});

app.post('/ch',function(req,res) {
    fs.readFile(file11,(err,data)=> {
        if(err) {
            console.error(err);
        }
        else{
            try {
                const fileData = JSON.parse(data);
                console.log('success');
                //console.log(fileData);
                res.send(fileData);
                
            }
            catch(exception) {
                console.log(exception);
            }
        }
        
    });
    
});

app.post('/bi',function(req,res) {
    fs.readFile(file111,(err,data)=> {
        if(err) {
            console.error(err);
        }
        else{
            try {
                const fileData = JSON.parse(data);
                console.log('success');
                //console.log(fileData);
                res.send(fileData);
                
            }
            catch(exception) {
                console.log(exception);
            }
        }
        
    });
    
});



app.post('/pay',function(req,res) {
    
    console.log(req.body);
    var obj = req.body;
    var title = req.body.title;
    var user = req.body.user;
    var flag=0;
    fs.readFile(file2, (err, data) => {
    if (err && err.code === "ENOENT") {
        // But the file might not yet exist.  If so, just write the object and bail
        return fs.writeFile(file2, JSON.stringify([obj]), error => console.error);
    }
    else if (err) {
        // Some other error
        console.error(err);
    }    
    // 2. Otherwise, get its JSON content
    else {
        try {
            var fileData = JSON.parse(data);
            fileData = fileData.filter(function(x) { return x !== null });
            for(var i=0;i< fileData.length; i++)
                {
                    
                    if(fileData[i].title==title && fileData[i].user == user) {
                        
                        flag=1;
                        break;
                        
                    }
                }

            // 3. Append the object you want
            console.log('flag' + flag);
            if(flag==0) {
            fileData.push(obj);
            var msg =
            {
                err:'success'
            }
                res.send(msg);    

            //4. Write the file back out
            return fs.writeFile(file2, JSON.stringify(fileData), error => console.error);
            
            }
             
            else {
          var msg1 =
            {
                err:'failure'
            }
        res.send(msg1);
    }
    
        } catch(exception) {
            console.error(exception);
        }
    }
});
});

app.post('/book',function(req,res) {
    
    console.log(req.body);
    var obj = req.body;
    var title = req.body.title;
    var user = req.body.user;
    
    var flag=0;
    fs.readFile(file2, (err, data) => {
    if (err && err.code === "ENOENT") {
        // But the file might not yet exist.  If so, just write the object and bail
        return fs.writeFile(file2, JSON.stringify([obj]), error => console.error);
    }
    else if (err) {
        // Some other error
        console.error(err);
    }    
    // 2. Otherwise, get its JSON content
    else {
        try {
            var fileData = JSON.parse(data);
            fileData = fileData.filter(function(x) { return x !== null });
            for(var i=0;i< fileData.length; i++)
                {
                    
                    if(fileData[i].title==title && fileData[i].user == user) {
                        
                        flag=1;
                        break;
                        
                    }
                }

            // 3. Append the object you want
            
            if(flag==0) {
            //fileData.push(obj);
                 var msg =
                  {
                  err:'success'
                   }
                   res.send(msg);    

            //4. Write the file back out
            return fs.writeFile(file2, JSON.stringify(fileData), error => console.error);
            }
             
            else {
                   var msg1 =
                     {
                       err:'failure'
                      }
                     res.send(msg1);
             }
    
} 
        catch(exception) {
            console.error(exception);
               }
       }
   });
});

app.post('/getPurchase',function(req,res) {
    var user=req.body.name;
    console.log('inside getpurchase ' + user);
    var arr=[];
    var obj={};
    var count=0;
    fs.readFile(file2,(err,data) => {
        if(err) {
            console.error(err)
        }
        else
            {
                try {
                    var fileData = JSON.parse(data);
                    fileData = fileData.filter(function(x) { return x !== null });
                    for(var i =0; i < fileData.length;i++) {
                        if(fileData[i].user===user) {
                            count++;
                            var obj =
                                {
                                serial:count,
                                title:fileData[i].title,
                                author:fileData[i].author,
                                price:fileData[i].price,
                                returns:fileData[i].return,
                                due:fileData[i].due,
                                date:fileData[i].date,
                                button:fileData[i].button,
                                regood: fileData[i].regood,
                                rebad: fileData[i].rebad,
                                refund:fileData[i].refund
                                    
                            }
                            
                            arr.push(obj);
                        }
                    }
                    
                    console.log(arr);
                    arr = arr.filter(function(x) { return x !== null });
                    const arrayData = JSON.stringify(arr);
                    res.send(arrayData);
                    
                    
                }
                catch(exception) {
                    console.log(exception);
                }
            }
    });
    
    
    
    
    
});

app.post('/getOrders',function(req,res) {
    var user=req.body.name;
    console.log('inside getorders ' + user);
    var arr=[];
    var obj={};
    var count=0;
    fs.readFile(file2,(err,data) => {
        if(err) {
            console.error(err)
        }
        else
            {
                try {
                    var fileData = JSON.parse(data);
                    fileData = fileData.filter(function(x) { return x !== null });
                    for(var i =0; i < fileData.length;i++) {
                        if(fileData[i].owner===user) {
                            count++;
                            var obj =
                                {
                                serial:count,
                                user : fileData[i].user, 
                                title:fileData[i].title,
                                author:fileData[i].author,
                                price:fileData[i].price,
                                returns:fileData[i].return,
                                due:fileData[i].due,
                                date:fileData[i].date,
                                button:fileData[i].button, 
                                regood: fileData[i].regood,
                                rebad: fileData[i].rebad,
                                refund: fileData[i].refund
                            }
                            
                            arr.push(obj);
                        }
                    }
                    arr = arr.filter(function(x) { return x !== null });
                    console.log(arr);
                    
                    const arrayData = JSON.stringify(arr);
                    res.send(arrayData);
                    
                    
                }
                catch(exception) {
                    console.log(exception);
                }
            }
    });
});

app.post('/returnBook',function(req,res) {
    console.log(req.body);
    var user=req.body.user;
    //var owner = req.body.owner;
    var title = req.body.title;
    var due = req.body.due;
    console.log('inside returnBook ' + user);
    //console.log('inside returnBook ' + owner);
    console.log('inside returnBook ' + title);
    var arr=[];
    var obj={};
    var file= require(file2);
   
    fs.readFile(file2,(err,data) => {
        if(err) {
            console.error(err)
        }
        else
            {
                try {
                    var fileData = JSON.parse(data);
                    fileData = fileData.filter(function(x) { return x !== null });
                    for(var i =0; i < fileData.length;i++) {
                        
                        if(fileData[i].user===user && fileData[i].title===title) {
                           fileData[i].due = due;
                           fileData[i].return = "true";
                            fileData[i].refund ="refund pending";
                            console.log( "updated status" + fileData[i].return);
                            //fs.writeFileSync(file2,JSON.stringify(fileData[i]))
                        }
                    }
                    fs.writeFile(file2, JSON.stringify(fileData), function (err) {
  if (err) return console.log(err);
  //console.log(JSON.stringify(file));
  console.log('writing to ' + file2);
   }); 
             
}
                catch(exception) {
                    console.log(exception);
                }
            }
    });
    res.send();
});

app.post('/refund',function(req,res) {
    console.log(req.body);
    var user=req.body.user;
    var owner = req.body.owner;
    var title = req.body.title;
    var due = req.body.due;
    console.log('inside refund ' + user);
    //console.log('inside returnBook ' + owner);
    console.log('inside refund ' + title);
    var arr=[];
    var obj={};
    var file= require(file2);
   
    fs.readFile(file2,(err,data) => {
        if(err) {
            console.error(err)
        }
        else
            {
                try {
                    var fileData = JSON.parse(data);
                    fileData = fileData.filter(function(x) { return x !== null });
                    for(var i =0; i < fileData.length;i++) {
                        
                        if(fileData[i].user===user && fileData[i].title===title && fileData[i].owner===owner && fileData[i].return ==="true") {
                           
                           fileData[i].due = due;
                            fileData[i].button = "returned";
                            fileData[i].refund ="refunded";
                            console.log( "updated due" + fileData[i].due);
                            var newobj =
                                {
                                    user : fileData[i].user,
                                    owner: fileData[i].owner,
                                    title: fileData[i].title,
                                    author: fileData[i].author,
                                    price: fileData[i].price,
                                    date:fileData[i].date,
                                    due: fileData[i].due,
                                    return: fileData[i].return,
                                    refund: fileData[i].refund
                                }
                            delete fileData[i];
                            fs.writeFile(file2, JSON.stringify(fileData), function (err) {
  if (err) return console.log(err);
  //console.log(JSON.stringify(file));
  console.log('writing to ' + file2);
   });
                            
                        }
                    }
                   
                    
fs.readFile(file4, (err, data) => {
    if (err && err.code === "ENOENT") {
        
        return fs.writeFile(file4, JSON.stringify([newobj]), error => console.error);
    }
    else if (err) {
        
        console.error(err);
    }    
     else {
        try {
            const fileData1 = JSON.parse(data);
            fileData1.push(newobj);
              return fs.writeFile(file4, JSON.stringify(fileData1), error => console.error)
            }
         catch(exception) {
                    console.log(exception);
                }
        }      
                    
                });
                
            }
                catch(exception) {
                    console.log(exception);
                }
            }
    });
    res.send();
});

app.post('/norefund',function(req,res) {
    console.log(req.body);
    var user=req.body.user;
    var owner = req.body.owner;
    var title = req.body.title;
    var due = req.body.due;
    console.log('inside norefund ' + user);
    //console.log('inside returnBook ' + owner);
    console.log('inside norefund ' + title);
    var arr=[];
    var obj={};
    var file= require(file2);
   
    fs.readFile(file2,(err,data) => {
        if(err) {
            console.error(err)
        }
        else
            {
                try {
                    var fileData = JSON.parse(data);
                    fileData = fileData.filter(function(x) { return x !== null });
                    for(var i =0; i < fileData.length;i++) {
                        
                        if(fileData[i].user===user && fileData[i].title===title && fileData[i].owner===owner && fileData[i].return ==="true") {
                           
                           fileData[i].due = 0;
                            fileData[i].button = "returned";
                            fileData[i].refund ="refund cancelled";
                            console.log( "updated due" + fileData[i].due);
                            var newobj =
                                {
                                    user : fileData[i].user,
                                    owner: fileData[i].owner,
                                    title: fileData[i].title,
                                    author: fileData[i].author,
                                    price: fileData[i].price,
                                    date:fileData[i].date,
                                    due: fileData[i].due,
                                    return: fileData[i].return,
                                    refund: fileData[i].refund
                                }
                            delete fileData[i];
                            fs.writeFile(file2, JSON.stringify(fileData), function (err) {
  if (err) return console.log(err);
  //console.log(JSON.stringify(file));
  console.log('writing to ' + file2);
   });
                            
                        }
                    }
                   
                    
fs.readFile(file4, (err, data) => {
    if (err && err.code === "ENOENT") {
        
        return fs.writeFile(file4, JSON.stringify([newobj]), error => console.error);
    }
    else if (err) {
        
        console.error(err);
    }    
     else {
        try {
            const fileData1 = JSON.parse(data);
            fileData1.push(newobj);
              return fs.writeFile(file4, JSON.stringify(fileData1), error => console.error)
            }
         catch(exception) {
                    console.log(exception);
                }
        }      
                    
                });
                
            }
                catch(exception) {
                    console.log(exception);
                }
            }
    });
    res.send();
});



app.post('/owneruname',function(req,res) {
    console.log(req.body.uname);
    console.log(req.body);
   var uname = req.body.uname;
    var pwd = req.body.ownerid;
    var fname = req.body.fname;
    var dob = req.body.dob;
    var address = req.body.address;
    var city = req.body.city;
    var phone = req.body.phone;
    var flag =0;
    var obj = {name : uname, ownerid:pwd, firstName: fname, dob: dob, add:address, city:city, tele : phone};
    
    
    fs.readFile(file3, (err, data) => {
    if (err && err.code === "ENOENT") {
        // But the file might not yet exist.  If so, just write the object and bail
        return fs.writeFile(file3, JSON.stringify([obj]), error => console.error);
    }
    else if (err) {
        // Some other error
        console.error(err);
    }    
    // 2. Otherwise, get its JSON content
    else {
        try {
            const fileData = JSON.parse(data);
            for(var i =0; i < fileData.length;i++) {
                        if(fileData[i].name==uname) {
                            flag =1;
                            break;
                        }
                    }
                    
                    if(flag ==1) {
                        var ob = {msg:'failure'}
                        res.send(ob);
                    }

            // 3. Append the object you want
            else {
                var ob = {msg:'success'}
                        res.send(ob);
            fileData.push(obj);

            //4. Write the file back out
            return fs.writeFile(file3, JSON.stringify(fileData), error => console.error)
            }
        } catch(exception) {
            console.error(exception);
        }
    }
});
    
});

app.post('/ownersignin',function(req,res) {
    
    console.log(req.body);
    var flag =0;
    var ownerid = req.body.ownerid;
    //var pass = req.body.pwd;
    fs.readFile(file3,(err,data) => {
        if(err) {
            console.error(err)
        }
        else
            {
                try {
                    const fileData = JSON.parse(data);
                    for(var i =0; i < fileData.length;i++) {
                        if(fileData[i].ownerid==ownerid) {
                            flag =1;
                            break;
                        }
                    }
                    
                    if(flag ==1) {
                        var ob = {msg:'success',name:ownerid}
                        res.send(ob);
                    }
                    else {
                        var ob = {msg:'failure'}
                        res.send(ob);
                        
                    }
                }
                catch(exception) {
                    console.log(exception);
                }
            }
    });
    
});

app.post('/getHistory',function(req,res) {
    var user=req.body.name;
    console.log('inside gethistory ' + user);
    var arr=[];
    var obj={};
    var count=0;
    fs.readFile(file4,(err,data) => {
        if(err) {
            console.error(err)
        }
        else
            {
                try {
                    var fileData = JSON.parse(data);
                    fileData = fileData.filter(function(x) { return x !== null });
                    for(var i =0; i < fileData.length;i++) {
                        if(fileData[i].owner===user) { 
                            
                            count++;
                            var obj =
                                {
                                serial:count,
                                user:fileData[i].user,
                                title:fileData[i].title,
                                author:fileData[i].author,
                                price:fileData[i].price,
                                return:fileData[i].return,
                                due:fileData[i].due,
                                date:fileData[i].date,
                                refund:fileData[i].refund
                                }
                            
                            
                            arr.push(obj);
                        }
                    }
                    arr = arr.filter(function(x) { return x !== null });
                    console.log(arr);
                    const arrayData = JSON.stringify(arr);
                    res.send(arrayData);
                    
                    
                }
                catch(exception) {
                    console.log(exception);
                }
            }
    });
});
app.post('/getuserHistory',function(req,res) {
    var user=req.body.name;
    console.log('inside gethistory ' + user);
    var arr=[];
    var obj={};
    var count=0;
    fs.readFile(file4,(err,data) => {
        if(err) {
            console.error(err)
        }
        else
            {
                try {
                    var fileData = JSON.parse(data);
                    fileData = fileData.filter(function(x) { return x !== null });
                    for(var i =0; i < fileData.length;i++) {
                        if(fileData[i].user===user) { 
                            
                            count++;
                            var obj =
                                {
                                serial:count,
                                user:fileData[i].user,
                                title:fileData[i].title,
                                author:fileData[i].author,
                                price:fileData[i].price,
                                return:fileData[i].return,
                                due:fileData[i].due,
                                date:fileData[i].date,
                                refund:fileData[i].refund
                                }
                            
                            
                            arr.push(obj);
                        }
                    }
                    arr = arr.filter(function(x) { return x !== null });
                    console.log(arr);
                    const arrayData = JSON.stringify(arr);
                    res.send(arrayData);
                    
                    
                }
                catch(exception) {
                    console.log(exception);
                }
            }
    });
});






app.listen(8080, function() {
    console.log('app is running in localhost:8080');
});
