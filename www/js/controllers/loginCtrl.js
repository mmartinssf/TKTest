/*global angular*/
angular.module('starter.controllers')
    .controller('LoginCtrl', ['$scope', '$state','SSFUsersRest', '$window', '$location',
        function($scope, $state, SSFUsersRest, $window, $location) {
         
            $scope.user = {};
            
            $scope.login = function(form) {
                //if form missing required fields, alert user
                if (form.$invalid) return alert("Please complete the form before proceeding.");
                
                SSFUsersRest.login($scope.user)
                .then(function(response) {
                    //store id/token to local storage
                    $window.localStorage.userId = response.data.userId;
                    $window.localStorage.token = response.data.id;
                    
                    //data is null, alert user
                    if (response.data === null) {
                        return alert("User is Offline");
                    }   //if successful register, redirect to lobby
                    else if (response.status === 200) {
                        $scope.user = {};
                        $state.go('lobby');
                    }
                }, 
                //alerts for error response
                function(error) {
                    if (error.status === 401) {
                        return alert("Login Failed! Please Verify Login & Password.");
                    }
                    else if (error.status === 422) {
                        return alert("Email Is Already Taken");
                    }
                    else if (error.status === 500) {
                        return alert("The World Has Ended!/n or Maybe The Server Is Offline...");
                    }
                        
                });
            };
            
            $scope.register = function() {
                $location.path('/register');
            };
        }
        
    ]);