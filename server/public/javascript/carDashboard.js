app.controller('CarDashboardController', [ '$scope', '$http', '$rootScope', '$location', 'Tower', function($scope, $http, $rootScope, $location, Tower) {
    
    var currSpeed = 0;
    var currAngle = 90; // 0 is right, 180 is left

    $scope.forward = function() {
       console.log("hit");
        currSpeed = currSpeed == 250 ? currSpeed : currSpeed + 50;
        var xmlHttp = new XMLHttpRequest();
        var body = new FormData();
        xmlHttp.onreadystatechange = function() { 
            if (xmlHttp.readyState == 4 && xmlHttp.status == 200) callback(xmlHttp.responseText);
        }
        var argument = "f" + currSpeed;
        xmlHttp.open("POST", "https://api.particle.io/v1/devices/55ff70066678505552540667/motor?access_token=74bc0dc850b15e3fc46b0a26ccd028dda9fc47c1", true); // true for asynchronous
        body.append("arg", argument);
        xmlHttp.send(body);
    };

    $scope.reverse = function() {
        currSpeed = currSpeed == -250 ? currSpeed : currSpeed - 50;
        var xmlHttp = new XMLHttpRequest();
        var body = new FormData();
        xmlHttp.onreadystatechange = function() { 
            if (xmlHttp.readyState == 4 && xmlHttp.status == 200) callback(xmlHttp.responseText);
        }
        var argument = "r" + currSpeed;
        xmlHttp.open("POST", "https://api.particle.io/v1/devices/55ff70066678505552540667/motor?access_token=74bc0dc850b15e3fc46b0a26ccd028dda9fc47c1", true); // true for asynchronous
        body.append("arg", argument);
        xmlHttp.send(body);
    };

    $scope.left = function() {
        currAngle = currAngle == 180 ? currAngle : currAngle += 45;
        var xmlHttp = new XMLHttpRequest();
        var body = new FormData();
        xmlHttp.onreadystatechange = function() { 
            if (xmlHttp.readyState == 4 && xmlHttp.status == 200) callback(xmlHttp.responseText);
        }
        xmlHttp.open("POST", "https://api.particle.io/v1/devices/55ff70066678505552540667/motor?access_token=74bc0dc850b15e3fc46b0a26ccd028dda9fc47c1", true); // true for asynchronous
        body.append("arg", currAngle);
        xmlHttp.send(body);
    };

    $scope.right = function() {
        currAngle = currAngle == 0 ? currAngle : currAngle -= 45;
        var xmlHttp = new XMLHttpRequest();
        var body = new FormData();
        xmlHttp.onreadystatechange = function() { 
            if (xmlHttp.readyState == 4 && xmlHttp.status == 200) callback(xmlHttp.responseText);
        }
        xmlHttp.open("POST", "https://api.particle.io/v1/devices/55ff70066678505552540667/motor?access_token=74bc0dc850b15e3fc46b0a26ccd028dda9fc47c1", true); // true for asynchronous
        body.append("arg", currAngle);
        xmlHttp.send(body);
    }
    
    function callback(text) {
      console.log(text);
    }
    
}]);

