/**
 *  Main admin Page
 */

const express = require("express");
var bodyParser = require("body-parser");


const app =	express();
var http = require("http").Server(app);
var mongodb = require("mongodb");
var db = null;

app.use(bodyParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/public/css",express.static(__dirname+'/public/css'));
app.use("/public/js",express.static(__dirname+'/public/js'));
app.use("/public/partials",express.static(__dirname+'/public/partials'));


var mongofil="mongodb://localhost:27017/testimages";
var connect=require('./mongoDB');

app.get('/',function(req,res){
    res.sendFile(__dirname + "/index.html");
});

//List Users
app.post('/ListUsers',function(req,res){
    connect.listUser(db, function(objs)
    {
       if(objs!=undefined)
       {
           res.send(objs);
       }
    });
});

app.post('/addUsers',function(req,res){
    var username  = req.body.username;
    var userid  = req.body.userid;
    var useremail  = req.body.useremail;
    var type = req.body.type;
    connect.addUsers(db, username, userid, useremail, type, function(mssg)
    {
        if(mssg!=undefined)
        {
            res.send(mssg);
        }
    });
});

app.post('/deleteUsers',function(req,res){
    var id  = req.body.id;
    connect.deleteUsers(db, id ,  function(mssg)
    {
        if(mssg!=undefined)
        {
            res.send(mssg);
        }
    });
});


//Server function
mongodb.MongoClient.connect(mongofil, function (err, database) {
    db = database;
    http.listen(3030, function () {
        console.log("Working on port 3030");
    });

});

