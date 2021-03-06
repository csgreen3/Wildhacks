var Particle = require('particle-api-js');
var particle = new Particle();

var token='4b8d6fc4ec57c326e5fbe7ede37f7af6eb32d1d5';
var d_uid='55ff6f066678505540361367';
var timer1;

timer1 = setInterval(talk_with_photon,1000);

function talk_with_photon() {
    g_var(d_uid, token);
    c_func(d_uid, token);          
}

function g_var(d_id,l_token){
    particle.getVariable({ deviceId: d_id, name: 'int_val', auth: l_token }).then(
        function (data) {
            console.log('Device variable retrieved successfully:', data.body.result);
        }, function (err) {
            console.log('An error occurred while getting attrs:', err);
        });
}

function c_func(d_id, l_token) {

    var fnPr = particle.callFunction({ deviceId: d_id, name: 'int_fun', argument: 'wifi_rssi', auth: l_token });

    fnPr.then(
        function (data) {
            console.log('Function called succesfully WiFi_RSSI: ', data.body.return_value);
        }, function (err) {
            console.log('An error occurred:', err);
        });
        
    var fnPr2 = particle.callFunction({ deviceId: d_id, name: 'int_fun', argument: 'blink', auth: l_token });

    fnPr2.then(
        function (data) {
            console.log('Function called succesfully LED: ', data.body.return_value);
        }, function (err) {
            console.log('An error occurred:', err);
        });
}