/*global angular*/
angular.module('starter.controllers')

.controller('LobbyCtrl',['$scope', 'TKTestQuestionService', '$state', 'TKAnswersService', 'SSFUsersRest', '$window', '$location', 
function($scope, TKTestQuestionService, $state, TKAnswersService, SSFUsersRest, $window, $location) {
TKTestQuestionService.all();


   $scope.goToTest = function() {
      TKAnswersService.resetAnswers();
      $state.go('question',{questionID:1});
   };
      
   $scope.logout = function() {
   SSFUsersRest.logout($window.localStorage.token)
      .then(function(response) {
         if (response.status === 204) {
            //$window.localStorage.clear();
            $state.go('landing');
         }
      });
   };
   
   $scope.results = function() {
      $location.path('/history');
   };

}]);

