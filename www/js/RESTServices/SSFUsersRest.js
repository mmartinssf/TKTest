/*global angular*/
angular.module("RESTServices", [])
    .service('SSFUsersRest', ['$http', function($http) {
        var SSFUsersRest = this;
        
        SSFUsersRest.post = function(newUserData) {
            return $http({
                url: "https://strongloop-backend-martinssf.c9users.io:8080/api/SSFUsers",
                method: "POST",     
                data: newUserData
            });
        };
        
    }]);
    