/*global angular*/
angular.module("RESTServices", [])
    .service('SSFUsersRest', ['$http', '$window', '$state',
        function($http, $window, $state) {
        var SSFUsersRest = this;
        
        SSFUsersRest.post = function(newUserData) {
            return $http({
                url: "https://strongloop-backend-martinssf.c9users.io:8080/api/SSFUsers",
                method: "POST",     
                data: newUserData
            });
        };
        
        SSFUsersRest.login = function(UserData) {
            return $http({
                url: "https://strongloop-backend-martinssf.c9users.io:8080/api/SSFUsers/login",
                method: "POST",     
                data: UserData
            });
        };
        
        SSFUsersRest.logout = function(token) {
            return $http({
                headers: { Authorization: token},
                url: "https://strongloop-backend-martinssf.c9users.io:8080/api/SSFUsers/logout",
                method: "POST",
            });
        };
        
    }]);
    