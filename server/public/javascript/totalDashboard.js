app.controller('TotalDashboardController', [ '$scope', '$http', '$rootScope', '$location', 'Tower', 'Car', function($scope, $http, $rootScope, $location, Tower, Car) {
    
    Car.updateData();    
    
  
    //calls draw at this rate in milliseconds
    window.setInterval(draw,500);
    function draw() {        
        Car.updateData(); //updated data from DB
    }
    
    draw(); //called at end to start draw loop
    
}]);

