app.controller('TowerDashboardController', [ '$scope', '$http', 'Tower', 'Car', function($scope, $http, Tower, Car) {
    
    //Tower.updateData();    
    var DEG_TO_RAD = Math.PI / 180; 

    //Calls to canvas to get as variables
    var canvas_sonarR = document.getElementById('towerCanvas_SonarR');
    var context_sonarR = canvas_sonarR.getContext('2d');    
    var canvas_sonarL = document.getElementById('towerCanvas_SonarL');
    var context_sonarL = canvas_sonarL.getContext('2d');    
    var canvas_servo = document.getElementById('towerCanvas_Servo');
    var context_servo = canvas_servo.getContext('2d');    
    var canvas_pos = document.getElementById('towerCanvas_Pos');
    var context_pos = canvas_pos.getContext('2d');
    var canvas_speed = document.getElementById('towerCanvas_Speed');
    var context_speed = canvas_speed.getContext('2d');    
    var canvas_carAngle = document.getElementById('towerCanvas_CarAngle');
    var context_carAngle = canvas_carAngle.getContext('2d');
        
    
    var sonar_width_offset = canvas_sonarR.width/100;
    var sonar_height_offset = canvas_sonarR.height/32;
    var speed_height_offset = canvas_sonarR.height/250;
    
    //calls draw at this rate in milliseconds
    window.setInterval(draw,5000);
    function draw() {        
        Tower.updateData(); //updated data from DB
        Car.updateData(); //updated data from DB
        
        
        //used to erase canvas
        canvas_sonarR.width = canvas_sonarR.width;
        canvas_sonarL.width = canvas_sonarL.width;
        canvas_servo.width = canvas_servo.width;
        canvas_pos.width = canvas_pos.width;
        canvas_carAngle.width = canvas_carAngle.width;
        canvas_speed.width = canvas_speed.width;
        
        if (Tower.data.length > -1 ) {
            
            var servo_rad = (360 - Tower.lastData.Servo) * Math.PI / 180;        
            drawServoTemplate(servo_rad);
            
            var origin_x = canvas_pos.width / 2;
            var origin_z = canvas_pos.height / 2;
            var position_scale = 20;
            var positing_dot_scale;
            drawPositionTemplate();


            //Used to setup first data point for drawing line wave
            context_sonarR.beginPath();
            context_sonarR.moveTo( 
                sonar_width_offset * (0 + (100 - Tower.data.length)),
               canvas_sonarR.height - (Tower.data[0].Sonar.right * sonar_height_offset) 
            );
            context_sonarL.beginPath();
            context_sonarL.moveTo( 
                sonar_width_offset * (0 + (100 - Tower.data.length)),
               canvas_sonarL.height - (Tower.data[0].Sonar.left * sonar_height_offset) 
            );
        
        }
        if (Car.data.length > -1 ) {
            
            var car_rad = (360 - Car.lastData.CarAngle) * Math.PI / 180;    
            drawCarDirectionTemplate(car_rad);
            
            context_speed.beginPath();
            context_speed.moveTo( 
                sonar_width_offset * (0 + (100 - Tower.data.length)),
               canvas_speed.height - (Car.data[0].Speed * speed_height_offset) 
            );
        
        }
        
        if (Tower.data.length > -1 ) {
            Tower.data.forEach(function(element, index, array) {  

                //right sonar            
                var x = sonar_width_offset * (index + (100 - Tower.data.length));
                var yR =canvas_sonarR.height - (element.Sonar.right * sonar_height_offset);
                context_sonarR.strokeStyle = "rgb(0,30," + x + ")";
                context_sonarR.lineTo(x, yR);
                context_sonarR.stroke();

                //left sonar
                var yL =canvas_sonarL.height - (element.Sonar.left * sonar_height_offset)
                context_sonarL.strokeStyle = "rgb(0," + x + ",30)";
                context_sonarL.lineTo(x, yL);
                context_sonarL.stroke();

                //position dots
                 if (index < 97) {                 
                    context_pos.fillStyle = "rgba(0,0,0,"+ (((100 - Tower.data.length) + index)/100.0)  + ")";            
                    positing_dot_scale= ((100 - Tower.data.length) + index)/20;
                 } else {
                    context_pos.fillStyle = "rgb(255,0,0)";           
                    positing_dot_scale= 4;                 
                 } 
                context_pos.fillRect((element.Position.x * position_scale) + origin_x, (element.Position.z * position_scale ) + origin_z,positing_dot_scale,positing_dot_scale);



            });
        }
        
        if (Car.data.length > -1 ) {
            Car.data.forEach(function(element, index, array) {
                //Speed Data
                var speedX = sonar_width_offset * (index + (100 - Tower.data.length));
                var speedY = canvas_speed.height - (element.Speed * speed_height_offset);
                context_speed.strokeStyle = "rgb(" + speedX + ",30,0)";
                context_speed.lineTo(speedX, speedY);
                context_speed.stroke();
            });
        }
                
    }
        
    //Draw function for every Servo Call
    function drawServoTemplate(radian) {
        var mid_width = canvas_servo.width / 2;
        var mid_height = canvas_servo.height / 2;
        var pos_radius = mid_width - 10;
        var line1 = (radian * 180 / Math.PI) - 15;
        var line2 = (radian * 180 / Math.PI) + 45;
        var line3 = (radian * 180 / Math.PI) - 45;
        var line4 = (radian * 180 / Math.PI) + 15;
        
        context_servo.beginPath();
        context_servo.strokeStyle = "rgba(180, 180, 180, .6)";
        context_servo.moveTo(0, canvas_servo.height / 2);
        context_servo.lineTo(canvas_servo.width, canvas_servo.height / 2);
        context_servo.stroke();
        context_servo.beginPath();
        context_servo.moveTo(canvas_servo.width / 2, 0);
        context_servo.lineTo(canvas_servo.width / 2, canvas_servo.height);
        context_servo.stroke();
        context_servo.fillText("90",canvas_servo.width / 2 - 20, 15);
        context_servo.fillText("0",canvas_servo.width - 20, canvas_servo.height / 2 - 10);
        
        //first fan design
        context_servo.beginPath();
        context_servo.strokeStyle = "blue";
        context_servo.arc(mid_width, mid_height, pos_radius, line1 * DEG_TO_RAD, line2 * DEG_TO_RAD);
        context_servo.stroke();
        context_servo.beginPath();
        context_servo.moveTo(mid_width, mid_height);
        context_servo.lineTo(pos_radius * Math.cos(line1 * DEG_TO_RAD) + mid_width, pos_radius * Math.sin(line1 * DEG_TO_RAD) + mid_height);
        context_servo.stroke();
        context_servo.beginPath();
        context_servo.moveTo(mid_width, mid_height);
        context_servo.lineTo(pos_radius * Math.cos(line2 * DEG_TO_RAD) + mid_width, pos_radius * Math.sin(line2 * DEG_TO_RAD) + mid_height);
        context_servo.stroke();
        
        //2nd fan design
        context_servo.beginPath();
        context_servo.strokeStyle = "red";
        context_servo.arc(mid_width, mid_height, pos_radius, line3 * DEG_TO_RAD, line4 * DEG_TO_RAD);
        context_servo.stroke();
        context_servo.beginPath();
        context_servo.moveTo(mid_width, mid_height);
        context_servo.lineTo(pos_radius * Math.cos(line3 * DEG_TO_RAD) + mid_width, pos_radius * Math.sin(line3 * DEG_TO_RAD) + mid_height);
        context_servo.stroke();
        context_servo.beginPath();
        context_servo.moveTo(mid_width, mid_height);
        context_servo.lineTo(pos_radius * Math.cos(line4 * DEG_TO_RAD) + mid_width, pos_radius * Math.sin(line4 * DEG_TO_RAD) + mid_height);
        context_servo.stroke();
    }
    
    //Draw function for every Car Angle Call
    function drawCarDirectionTemplate(radian) {
        var mid_width = canvas_carAngle.width / 2;
        var mid_height = canvas_carAngle.height / 2;
        var pos_radius = mid_width - 10;
        var line1 = (radian * 180 / Math.PI) - 22.5;
        var line2 = (radian * 180 / Math.PI) + 22.5;
        
        context_carAngle.beginPath();
        context_carAngle.strokeStyle = "rgba(180, 180, 180, .6)";
        context_carAngle.moveTo(0, canvas_carAngle.height / 2);
        context_carAngle.lineTo(canvas_carAngle.width, canvas_carAngle.height / 2);
        context_carAngle.stroke();
        context_carAngle.beginPath();
        context_carAngle.moveTo(canvas_carAngle.width / 2, 0);
        context_carAngle.lineTo(canvas_carAngle.width / 2, canvas_carAngle.height);
        context_carAngle.stroke();
        context_carAngle.fillText("90",canvas_carAngle.width / 2 - 20, 15);
        context_carAngle.fillText("0",canvas_carAngle.width - 20, canvas_carAngle.height / 2 - 10);
        
        //first fan design
        context_carAngle.beginPath();
        context_carAngle.strokeStyle = "green";
        context_carAngle.arc(mid_width, mid_height, pos_radius, line1 * DEG_TO_RAD, line2 * DEG_TO_RAD);
        context_carAngle.stroke();
        context_carAngle.beginPath();
        context_carAngle.moveTo(mid_width, mid_height);
        context_carAngle.lineTo(pos_radius * Math.cos(line1 * DEG_TO_RAD) + mid_width, pos_radius * Math.sin(line1 * DEG_TO_RAD) + mid_height);
        context_carAngle.stroke();
        context_carAngle.beginPath();
        context_carAngle.moveTo(mid_width, mid_height);
        context_carAngle.lineTo(pos_radius * Math.cos(line2 * DEG_TO_RAD) + mid_width, pos_radius * Math.sin(line2 * DEG_TO_RAD) + mid_height);
        context_carAngle.stroke();
        
    }
    
   var rings = 3;
   var radius = canvas_pos.width / 2;
   function drawPositionTemplate() {
        context_pos.beginPath();
        context_pos.strokeStyle = "rgba(180, 180, 180, .6)";
        context_pos.moveTo(0, canvas_pos.height / 2);
        context_pos.lineTo(canvas_pos.width, canvas_pos.height / 2);
        context_pos.stroke();
        context_pos.beginPath();
        context_pos.moveTo(canvas_pos.width / 2, 0);
        context_pos.lineTo(canvas_pos.width / 2, canvas_pos.height);
        context_pos.stroke();
        context_pos.fillText("+ Y",canvas_pos.width / 2 - 20, 15);
        context_pos.fillText("+ X",canvas_pos.width - 20, canvas_pos.height / 2 - 10);
       
       //rings
       for( var i = 0; i < rings; i++ ){
            context_pos.beginPath();
            context_pos.arc( radius, radius, ( ( radius - ( 2 / 2) ) / rings) * ( i + 1 ), 0, 2 * Math.PI, false );
            context_pos.strokeStyle = 'hsla(' + ( 170 - ( i * ( 50 / rings ) ) ) + ', 50%, 40%, 0.1)';
            context_pos.lineWidth = 2;
            context_pos.stroke();
       };
       
    }

    draw(); //called at end to start draw loop

        
}]);
