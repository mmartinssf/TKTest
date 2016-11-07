/*global angular*/
angular.module("RESTServices")
    .service('UserInfoRest', ['$http', '$window',
        function($http, $window) {
            var UserInfoRest = this;
            
            UserInfoRest.getUserInfo = function(token) {
                return $http({
                    headers: {
                        Authorization: token
                    },
                    url: "https://strongloop-backend-martinssf.c9users.io/api/SSFUsers/" + $window.localStorage.userId,
                    method: "GET"
                });
            };
        }
    ]);