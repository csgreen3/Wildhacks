(function() {
    'use strict';

    var mongoose = require('mongoose');
    var Schema = mongoose.Schema;

    var CarSchema = new Schema({
        IR: Number,
        Sensor: {},
        Speed: Number,
        Position: {},        
        Gyro: {},        
        Timestamp: Date
    }, 
    { collection : 'Cars' }
    );

module.exports = mongoose.model('Car', CarSchema);

})();