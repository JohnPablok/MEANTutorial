//load the express package and create our app
var express = require('express');
var app     = express();
var path    = require('path');

//send our index.html file to the user for the home page
app.get('/', function(req, res){
    res.sendFile(path.join(__dirname + '/index.html'));
});
//create routes for the admin section

//get an instance of the router
var adminRouter = express.Router();

//route middleware that will happen on every request

adminRouter.use(function(req, res, next) {
    //log each request to the console
    console.log(req.method, req.url);
    //continue doing what we were doing and go to the route
    next();
    });

//route middleware to validate:name
adminRouter.param('name', function(req, res, next, name){
    //do validation on name here
    //blah blah validation
    //log something so we know its working
    console.log('doing name validations on' + name);
    //once validation is done save the new item in the req
    req.name = name;
    //go to the net thing
    next();
});

//admin main page, the dashboard (http://localhost:1337/admin)
adminRouter.get('/', function (req, res) {
        res.send('I am the dashboard!');
});

//users page (localhost:1337/admin/users)
adminRouter.get('/users', function (req, res) {
        res.send('I show all the users!');
});
//route with parameters :name
adminRouter.get('/users/:name', function(req, res){
    res.send('Hello '+ req.params.name + '!');
});

//posts page localhost:1337/admin/posts
adminRouter.get('/posts', function (req, res) {
        res.send('I show all the posts!');
});

//apply the routes to our application

app.use('/admin', adminRouter);



//start the server
app.listen(1337);
console.log("1337 is the magic port!!!");

