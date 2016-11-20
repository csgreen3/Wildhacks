//main module
var app = angular.module('app', ['ngRoute']);

//routes to different views of different pages
app.config(['$routeProvider', function($routeProvider) {
    
  $routeProvider.
    when('/', {
      templateUrl: 'templates/towerDashboard.html',
      controller:  'TowerDashboardController'
    }).
    when('/car', {
      templateUrl: 'templates/carDashboard.html',
      controller:  'CarDashboardController'
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
       $http.get('/api/car/getNew').then(function(result) {
                            
                carFactory.data = result.data;                
                carFactory.lastData = result.data[result.data.length - 1];
              
         
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
        $http.get('/api/car/getNew').then(function(result) {
                            
                carFactory.data = result.data;                
                carFactory.lastData = result.data[result.data.length - 1];
              
        });
    }
    
    return carFactory;
}]);
