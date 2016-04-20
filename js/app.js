var app = angular.module('myApp', ['ngRoute']);

app.factory('MobileService',function($http){
	var service = {};

	
	service.MyData = $http.get("getall.php").then(function (response) {

     return response.data.records;
  });
	return service;
});


app.config(function($routeProvider){
 $routeProvider
    .when('/',{
      templateUrl:'views/home.html',
    })
    .when('/devices',{
      templateUrl:'views/all.html',
      controller:'MenuCtrl'
    })
    .when('/:keyword',{
      templateUrl:'views/info.html',
      controller:'SpecCtrl'
    })
    .otherwise({
      redirectTo:'/'
    });
});

app.controller('MenuCtrl', [ 'MobileService','$scope' , function(MobileService ,$scope) {
  
MobileService.MyData.then(function(records){
	$scope.myData = records;
});

$scope.brand = '';

$scope.getBrand = function(x){
$scope.brand = x;
};

}]);

app.controller('SpecCtrl',['$scope','$routeParams','$http',function($scope,$routeParams,$http){
   
    var val = $routeParams.keyword;

    var parameters = {
        keyword : val
    };

    var config = {
        params: parameters
    };

  $http.get("getinfo.php", config).success(function (data) {
      $scope.myData = data.records;
  }).error(function (data, status, headers, config)
        {
          window.location.href = 'http://localhost/androidloversv.3/app.html#/devices';
        });

}]);

app.filter("trustUrl", ['$sce', function ($sce) {
        return function (recordingUrl) {
            return $sce.trustAsResourceUrl(recordingUrl);
        };
    }]);

app.filter('removeSpaces', [function() {
    return function(string) {
        if (!angular.isString(string)) {
            return string;
        }
        return string.replace(/[\s]/g, '');
    };
}]);

app.filter('unique', function() {
   return function(collection, keyname) {
      var output = [], 
          keys = [];

      angular.forEach(collection, function(item) {
          var key = item[keyname];
          if(keys.indexOf(key) === -1) {
              keys.push(key);
              output.push(item);
          }
      });

      return output;
   };
});
