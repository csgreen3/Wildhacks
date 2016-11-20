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
//    when('/room', {
//      templateUrl: 'templates/room.html',
//      controller:  'RoomController',
//      controllerAs: 'Room'
//    }).
    otherwise({
      redirectTo: '/'
    });
}]);

app.factory('Tower', ['$http', function($http){
    var towerFactory = {}
    towerFactory.fetched = false;
    towerFactory.data = [];
    towerFactory.lastData = {};
    
    //gets all init data and returns last data for time comparison
    towerFactory.fetchData = function() {
        $http.get('/api/tower/').then(function(result){
            towerFactory.data = result.data;
            towerFactory.lastData = towerFactory.data[towerFactory.data.length - 1];
            //console.log(towerFactory.lastData);
            towerFactory.fetched = true;

        })
    }
    
    towerFactory.updateData = function() { 
        
        //if (!towerFactory.fetched) return;   
        $http.get('/api/tower/getNew').then(function(result) {
                            
                towerFactory.data = result.data;                
                towerFactory.lastData = result.data[result.data.length - 1];
              
        });
    }
    
    return towerFactory;
}]);