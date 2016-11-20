//main module
var app = angular.module('app', ['ngRoute']);

//sets rootscope value prior to anything
app.run(function($rootScope) {
    $rootScope.rootTest = "RootScope";    
});

//routes to different views of different pages
app.config(['$routeProvider', function($routeProvider) {
    
  $routeProvider.
    when('/', {
      templateUrl: 'templates/towerDashboard.html',
      controller:  'TowerDashboardController'
    }).
    when('/car', {
      templateUrl: 'templates/carDashboard.html',
      controller:  'CarDashboardController',
    }).
    otherwise({
      redirectTo: '/'
    });
}]);

app.factory('Tower', ['$http', function($http){
    var towerFactory = {}
    towerFactory.data = [];
    towerFactory.lastData = {};
    
    towerFactory.updateData = function() { 
        
        //REMOVE IF NO DATABASE
        $http.get('https://api.particle.io/v1/devices/55ff6f066678505540361367/data?access_token=bf2e35478df5ca656dd4dade7e190e3e467d756d').then(function(response) {
                console.log(response);           
                var dataArray = response.result.split(',');
                var dataObject = {};
                dataObject.Sonar.left = dataObject[0];
                dataObject.Sonar.right = dataObject[1];
                dataObject.Servo = dataObject[2];
                dataObject.Timestamp = new Date();                
                towerFactory.data.push(dataObject);;                
                towerFactory.lastData = dataObject;
              
        });
    }
    
    return towerFactory;
}]);

app.factory('Car', ['$http', function($http){
    var carFactory = {}
    carFactory.data = [];
    carFactory.lastData = {};
    
    carFactory.updateData = function() { 
        
        //REMOVE IF NO DATABASE
//        $http.get('/api/car/getNew').then(function(result) {
//                            
//                carFactory.data = result.data;                
//                carFactory.lastData = result.data[result.data.length - 1];
//              
//        });
    }
    
    return carFactory;
}]);
