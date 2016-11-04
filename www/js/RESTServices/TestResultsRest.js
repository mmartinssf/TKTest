/*global angular*/
angular.module("RESTServices")
    .service('TestResultsRest', ['$http', '$window',        
    function($http, $window) {
        var TestResultsRest = this;
   
        //Save results to backend, user token for authorization
        TestResultsRest.save = function(test, token) {
            //test.userID = $window.localStorage.userId;
            return $http({
                headers:{ Authorization: token },
                url: "https://strongloop-backend-martinssf.c9users.io:8080/api/TestResults",
                method: 'POST',
                data: test
            });
        };
        
        //Get results from backend, user token for authorization
        //Sorted to only get results for unique userId
        TestResultsRest.getAll = function(token) {
            return $http({
                headers:{ Authorization: token },
                url: "https://strongloop-backend-martinssf.c9users.io:8080/api/TestResults?filter[where][userID]=" + $window.localStorage.userId,
                method: 'GET',
            });
        };
        
   }]);