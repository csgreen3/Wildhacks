(function() {
    'use strict';

    var Tower = require('./tower.model');

    //grab all for display
    module.exports.getAll = function(req, res) { 
        Tower.find({}, function (err, post) {
            if (err) {
                console.error(err);
                return res.status(500).send(err);
            }
            res.json(post);
        });
    };
    
    //grab all since passed time in milliseconds
     module.exports.getNew = function(req, res) { 
        var newDate = new Date(req.body.date);
        
        Tower.find({}).sort("-Timestamp").limit(100).exec(function (err, post) {
            if (err) {
                console.error(err);
                return res.status(500).send(err);
            }
            console.log(post.length);
            res.json(post);
        });
    };
   /* module.exports.getNew = function(req, res) { 
        var newDate = new Date(req.body.date);
        console.log(newDate);
        Tower.find( { $query : 
                     {"Timestamp" : 
                        {$gt: newDate}
                     },
                $orderby: {"Timestamp": -1}                
            }, function (err, post) {
            if (err) {
                console.error(err);
                return res.status(500).send(err);
            }
            console.log(post.length);
            res.json(post);
        });
    };*/
    
    module.exports.create = function(req, res) { 
        var body = req.body;
        body.Timestamp = new Date();
        var newTower = new Tower(body);        
        newTower.save(function(err, post) {
          if (err) {
                console.error(err);
                return res.status(500).send(err);
          }
          res.json(post);
        });   
    };
    
    
    
    
})();