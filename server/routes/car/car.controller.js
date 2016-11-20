(function() {
    'use strict';

    var Car = require('./car.model');

    //grab all car datat
    module.exports.getAll = function(req, res) { 
        Car.find({}, function (err, post) {
            if (err) {
                console.error(err);
                return res.status(500).send(err);
            }
            res.json(post);
        });
    };
    
    
})();