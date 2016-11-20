app.controller('CarDashboardController', [ '$scope', '$http', '$rootScope', '$location', 'Car', function($scope, $http, $rootScope, $location, Car) {
    
    Car.updateData();    
    
  
    //calls draw at this rate in milliseconds
    window.setInterval(draw,500);
    function draw() {        
        Car.updateData(); //updated data from DB
    }
    
    draw(); //called at end to start draw loop
    
}]);

