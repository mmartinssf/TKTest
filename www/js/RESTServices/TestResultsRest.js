/*global angular*/
angular.module("RESTServices")
    .service('TestResultsRest', ['$http',
        function($http) {
        var TestResultsRest = this;
   
        TestResultsRest.save = function(test, token) {
            return $http({
                headers:{ Authorization: token },
                url: "https://strongloop-backend-martinssf.c9users.io:8080/api/TestResults",
                method: 'POST',
                data: test
            });
        };
        
        TestResultsRest.getAll = function(token) {
            return $http({
                headers:{ Authorization: token },
                url: "https://strongloop-backend-martinssf.c9users.io:8080/api/TestResults",
                method: 'GET',
            });
        };
        
   }]);