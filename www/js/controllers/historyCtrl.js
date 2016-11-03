/*global angular*/
angular.module('starter.controllers')
    .controller('HistoryCtrl', ['$scope', '$window', '$state', 'tests', 'TKAnswersService', 'TKResultsButtonService', '$location', 'SSFUsersRest',
        function($scope, $window, $state, tests, TKAnswersService, TKResultsButtonService, $location, SSFUsersRest) {

            $scope.tests = tests === undefined ? [] : tests;

            $scope.goToResult = function(test) {
                var answers = {
                    "competing": test.competing,
                    "collaborating": test.collaborating,
                    "compromising": test.compromising,
                    "avoiding": test.avoiding,
                    "accommodating": test.accommodating
                };
                TKAnswersService.setAnswers(answers);
                TKResultsButtonService.setShouldShowMenuButton(false);
                $state.go('results');
            };
            
            $scope.goToTest = function() {
                TKAnswersService.resetAnswers();
                $state.go('question',{questionID:1});
            };
            
            $scope.goBack = function() {
                $location.path('/lobby');
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
        }
    ]);