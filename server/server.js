//-------------------------Module "Importing"-----------------------------//
var express = require('express'); //used as routing framework
var app = express(); //creates an instance of express

//modules required (same idea of #includes or Imports)
var path = require('path'); //Node.js module used for getting path of file
var logger = require('morgan'); //used to log in console window all request
var cookieParser = require('cookie-parser'); //Parse Cookie header and populate req.cookies
var bodyParser = require('body-parser'); //allows the use of req.body in POST request
var server = require('http').createServer(app); //creates an HTTP server instance
var https = require('https'); //Node.js module creates an instance of HTTP to make calls to Pi
//var net = require('net'); // Load the TCP Library
//var io = require('./sockets').listen(server) //allows for sockets on the HTTP server instance
//var extend = require('util')._extend; //used to make copy of objects -> extend({}, objToCopy);

//-------------------------Globals-----------------------------//
var localIP = require("ip").address(); //used to know where to check for web view site
console.log("Local IP: " + localIP);

var debugMode = false;
var generateMode = false;

//-------------------------Particle----------------------------//
var Particle = require('particle-api-js');
var particle = new Particle();

var Sparky = "55ff6f066678505540361367";
var BoyBlue = "55ff70066678505552540667"

var token='4b8d6fc4ec57c326e5fbe7ede37f7af6eb32d1d5';
var tower_id= Sparky;
var car_1_id= BoyBlue;

//-------------------------getting funtions/routes from other files-----------------------------//
//api to mongoose calls
var api = require('./routes/api');



//-------------------------Node Setup-----------------------------//
//Loops through starting after "node server.js" and checks the arguments
for (var i = 2; i < process.argv.length; i++) {
    switch(process.argv[i]){
        case "-debug":
            console.log("RUNNING IN DEBUG MODE");
            debugMode = true;
            break;
        case "-generate":
            console.log("RUNNING IN GENERATE MODE");
            generateMode = true;
    }
}

//-------------------------Sets up MongoDB Connection-----------------------------//
if (debugMode) {
    var mongoURI = "mongodb://127.0.0.1:27017/Wildhacks"; //localhost:defaultPort/dataBase

    //sets up Mongoose
    var mongoose = require('mongoose'); //added for Mongo support
    var MongooseDB = mongoose.connect(mongoURI).connection; //makes connection
    MongooseDB.on('error', function(err) { console.log(err.message); console.log("Is MongoDB Running?"); });
    MongooseDB.once('open', function() {
      console.log("mongooseDB connection open");
    });
}
//-------------------------Express JS configs-----------------------------//
// view engine setup
app.set('views', './views');
app.set('view engine', 'ejs');


//Express making use of these modules
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public'))); //sets all static file calls to folder


//-------------------------ROUTES-----------------------------//
if (!debugMode) app.use('/api', api); //sets the API used to access the Database

//used to help server know which device IDs are actually being used instead of scanning all 256
app.get('/', function(req, res, next) {    
    res.render('Dashboard');
});

var towerTimer;
var generateTimer;
if (!debugMode) towerTimer = setInterval(collectTowerData,1000);
if (generateMode) generateTimer = setInterval(generateData,300);

var body_ff = {"Sonar":{"left" : 5, "right" : 7 }, "Servo" : 90, "Position" : { "x" : 1, "z" : 1  }, "Speed": 100, "CarAngle" : 45 };

function generateData() {
    body_ff.Sonar.left += (Math.random() -  Math.random()) * 1.5;
        if (body_ff.Sonar.left < 0) body_ff.Sonar.left = 0;
        if (body_ff.Sonar.left > 32) body_ff.Sonar.left = 32;
    body_ff.Sonar.right += (Math.random() -  Math.random()) * 1.5;    
        if (body_ff.Sonar.right  < 0) body_ff.Sonar.right  = 0;
        if (body_ff.Sonar.right  > 32) body_ff.Sonar.right  = 32;
//    body_ff.Servo += (Math.random() -  Math.random()) * 90;    
    body_ff.Servo += 5;    
        if (body_ff.Servo < 0) body_ff.Servo = 360;
        if (body_ff.Servo > 360) body_ff.Servo = 0;    
    body_ff.Position.x += (Math.random() -  Math.random()) * 1.0;    
        if (body_ff.Position.x < -4) body_ff.Position.x = -4;
        if (body_ff.Position.x > 4) body_ff.Position.x = 4;
    body_ff.Position.z += (Math.random() -  Math.random()) * 1.0;    
        if (body_ff.Position.z < -4) body_ff.Position.z = -4;
        if (body_ff.Position.z > 4) body_ff.Position.z = 4;    
     body_ff.Speed += (Math.random() -  Math.random()) * 5.0;    
        if (body_ff.Speed < 0) body_ff.Speed = 0;
        if (body_ff.Speed > 250) body_ff.Speed = 250;    
    body_ff.CarAngle     = 45; 
    saveTowerData(body_ff);    
}

function collectTowerData() {    
    
//    var setDataFunction = particle.callFunction({ deviceId: tower_id, name: 'set_data', argument: "0", auth: token });
//    setDataFunction.then(
//        function (data) {           
//        }, function (err) {
//            console.log('An error occurred:', err);
//        });
//   
//    particle.getVariable({ deviceId: tower_id, name: 'data_string', auth: token }).then(
//    function (data) {
//        console.log('Read:', data.body.result);
//        //Parse first!
//        //var dataArray = data.body.result.split("#");
//        
//       //saveTowerData(body);
//    }, function (err) {
//        console.log('An error occurred while getting attrs:', err);
//    });
    
    
//    particle.getVariable({ deviceId: tower_id, name: 'test', auth: token }).then(
//    function (data) {
//        console.log('Read:', data.body.result);
//        //Parse first!
//        var body = {IR : data.body.result - 1500,
//                    "Sonar" : {
//                        "left" : 2, 
//                        "right" : 3
//                    }, 
//                    "Servo" : 0, 
//                    "Position" : {
//                        "x" : 1, 
//                        "y" : 0, 
//                        "z" : 1
//                    }
//                   };
//       // console.log(body);
//       saveTowerData(body);
//    }, function (err) {
//        console.log('An error occurred while getting attrs:', err);
//    });
}

function saveTowerData(body){
   if (debugMode) {  
       var TowerSchema = require('./routes/tower/tower.model.js');
        //create a new post    
        body.Timestamp = new Date();
        var newTower = new TowerSchema(body);   
        newTower.save(function(err, post) {
          if (err) {
                console.error(err);
                return;
          }
        });   

   }
}
    
//    var fnPr = particle.callFunction({ deviceId: d_uid, name: ('set_' + color_set), argument: new_value, auth: token });
//
//    fnPr.then(
//        function (data) {
//            console.log('Set ' + color_set + ' to ' + data.body.return_value);
//        }, function (err) {
//            console.log('An error occurred:', err);
//        });
   
//particle.getVariable({ deviceId: d_uid, name: 'red_val', auth: token }).then(
//function (data) {
//    red = data.body.result;
//    console.log('Red:', data.body.result);
//}, function (err) {
//    console.log('An error occurred while getting attrs:', err);
//});

//-------------------------Sockets-----------------------------//




//-------------------------HTTP Server Config-----------------------------//
server.listen(6500); //Port to listen on
server.on('listening', onListening);

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  console.log('Listening on ' + bind);
}
