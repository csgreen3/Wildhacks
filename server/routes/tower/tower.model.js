(function() {
    'use strict';

    var mongoose = require('mongoose');
    var Schema = mongoose.Schema;

    var TowerSchema = new Schema({
        Sonar: {},
        Servo : Number,
        Position: {},
        Speed: Number,
        CarAngle: Number,
        Timestamp: Date        
    }, 
    { collection : 'Tower' }
    );

module.exports = mongoose.model('Tower', TowerSchema);

})();