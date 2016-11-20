app.controller('TowerDashboardController', [ '$scope', '$http', '$rootScope', '$location', 'Tower', function($scope, $http, $rootScope, $location, Tower) {
    
    Tower.updateData();    
    
    var DEG_TO_RAD = Math.PI / 180; 

    var canvas_sonarR = document.getElementById('towerCanvas_SonarR');
    var context_sonarR = canvas_sonarR.getContext('2d');    
    var canvas_sonarL = document.getElementById('towerCanvas_SonarL');
    var context_sonarL = canvas_sonarL.getContext('2d');
    
    var canvas_servo = document.getElementById('towerCanvas_Servo');
    var context_servo = canvas_servo.getContext('2d');
    
    var canvas_pos = document.getElementById('towerCanvas_Pos');
    var context_pos = canvas_pos.getContext('2d');
    
    var sonar_width_offset = canvas_sonarR.width/100;
    var sonar_height_offset = canvas_sonarR.height/32;
    
    window.setInterval(draw,500);
    function draw() {        
        Tower.updateData(); //updated data from DB
        //used to erase canvas
        canvas_sonarR.width = canvas_sonarR.width;
        canvas_sonarL.width = canvas_sonarL.width;
        canvas_servo.width = canvas_servo.width;
        canvas_pos.width = canvas_pos.width;
        var servo_rad = (360 - Tower.lastData.Servo) * Math.PI / 180;
        
        drawServoTemplate(servo_rad);
        
        var origin_x = canvas_pos.width / 2;
        var origin_z = canvas_pos.height / 2;
        var position_scale = 20;
        var positing_dot_scale;
        drawPositionTemplate();
        
        
        //
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

        Tower.data.forEach(function(element, index, array) {   
            
            
            //addCurveSegment(context_sonarR, element.Sonar.right, sonarR)
            
            //right sonar
            
            var x = sonar_width_offset * (index + (100 - Tower.data.length));
            var yR =canvas_sonarR.height - (element.Sonar.right * sonar_height_offset);
            context_sonarR.strokeStyle = "rgb(0,30," + x + ")";
            //context_sonarR.fillRect(x,yR,1,3);
            
            context_sonarR.lineTo(x, yR);
            context_sonarR.stroke();
            
            //left sonar
            var yL =canvas_sonarL.height - (element.Sonar.left * sonar_height_offset)
            context_sonarL.strokeStyle = "rgb(0," + x + ",30)";
            //context_sonarL.fillRect(x,yL,1,3);
            context_sonarL.lineTo(x, yL);
            context_sonarL.stroke();
            
            //position dots
             if (index < 97) {                 
                context_pos.fillStyle = "rgba(0,0,0,"+ (index/100.0)  + ")";            
                positing_dot_scale= index/20;
             } else {
                context_pos.fillStyle = "rgb(255,0,0)";           
                positing_dot_scale= 4;                 
             } 
            context_pos.fillRect((element.Position.x * position_scale) + origin_x, (element.Position.z * position_scale ) + origin_z,positing_dot_scale,positing_dot_scale);
            
        });
                
    }
    
    var canvas_pos = document.getElementById('towerCanvas_Pos');
    var context_pos = canvas_pos.getContext('2d');
    
    
    
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
        
//    function addCurveSegment(context, i, points) {
//    var averageLineLength, du, end, pieceCount, pieceLength, s, start, t, u, _ref, _ref2, _ref3;    
//    averageLineLength = 1;
//    pieceCount = 2;
//    for (t = 0, _ref = 1 / pieceCount; t < 1; t += _ref) {
//      _ref2 = [points[Math.floor(i + t)], points[Math.floor(i + t + 1 / pieceCount)]], start = _ref2[0], end = _ref2[1];
//        console.log(_ref2);
//      pieceLength = distance(start, end);
//      du = averageLineLength / pieceLength;
//      for (u = 0, _ref3 = 1 / pieceCount; 0 <= _ref3 ? u < _ref3 : u > _ref3; u += du) {
//        context.lineTo.apply(context, points[Math.floor(i + t + u)]);
//      }
//    }
//    return context.lineTo.apply(context, points[Math.floor(i + 1)]);
//  };
//    
//  function distance(a, b) {
//    return Math.sqrt(Math.pow(a[0] - b[0], 2) + Math.pow(a[1] - b[1], 2));
//  };

    draw(); //called at end to start draw loop
    
}]);

