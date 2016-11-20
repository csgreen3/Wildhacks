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
        $http.get('/api/tower/getNew').then(function(result) {
                            
                towerFactory.data = result.data;                
                towerFactory.lastData = result.data[result.data.length - 1];
              
        });
    }
    
    return towerFactory;
}]);
