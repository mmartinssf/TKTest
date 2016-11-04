//HistoryCtrl
/*global angular*/
angular.module('starter.controllers')
    .controller('HistoryCtrl', ['$scope', '$window', '$state', 'tests', 'TKAnswersService', 'TKResultsButtonService', '$location', 'SSFUsersRest',
        function($scope, $window, $state, tests, TKAnswersService, TKResultsButtonService, $location, SSFUsersRest) {

            //Ternary setting tests to empty array or object
            $scope.tests = tests === undefined ? [] : tests;

            //Get test results, hide menu button and redirect to results page
            $scope.goToResult = function(test) {
                //Pass results and store object as string in variable answers
                var answers = {
                    "competing": test.competing,
                    "collaborating": test.collaborating,
                    "compromising": test.compromising,
                    "avoiding": test.avoiding,
                    "accommodating": test.accommodating
                };
                
                //Pass object of strings and assign to variable answerCategories
                TKAnswersService.setAnswers(answers);
                //Hide menu button
                TKResultsButtonService.setShouldShowMenuButton(false);
                //Redirect to results page
                $state.go('results');
            };
            
            //Reset object in order to hold new values, start questions
            $scope.goToTest = function() {
                //Set values in object answerCategories to zero
                TKAnswersService.resetAnswers();
                //Redirect to question page question one
                $state.go('question',{questionID:1});
            };
            
            //Button redirect to lobby page
            $scope.goBack = function() {
                $location.path('/lobby');
            };
            
            //Log user out of backend and clear localStorage, redirect to landing page
            $scope.logout = function() {
            SSFUsersRest.logout($window.localStorage.token)
                .then(function(response) {
                    if (response.status === 204) {
                        $window.localStorage.clear();
                        $state.go('landing');
                    }
                });
            };
        }
    ]);