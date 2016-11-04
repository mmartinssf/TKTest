//ResultsCtrl
/*global angular*/
angular.module('starter.controllers')
    .controller('ResultsCtrl', ['$scope', 'TKAnswersService', 'TKResultsButtonService', '$ionicHistory', '$state', 'SSFUsersRest', '$window', '$location',
        function($scope, TKAnswersService, TKResultsButtonService, $ionicHistory, $state, SSFUsersRest, $window, $location) {

        //Route menuButtonTapped to lobby
        $scope.menuButtonTapped = function() {
            $ionicHistory.nextViewOptions({
                historyRoot: true,
                disableBack: true
            });
            $state.go('lobby');
        };
        
        //Array to store labels
        $scope.labels = ["Competing", "Collaborating", "Compromising", "Avoiding", "Accommodating"];

        //Return object holding categories
        var answersInfo = TKAnswersService.getAnswers();
        
        //Returns result as a percentage
        function returnPercentage(value) {
            return (value / 12) * 100;
        }

        //Array holding function to calc. results percentage and stores values
        $scope.data = [
            [returnPercentage(answersInfo["competing"]), returnPercentage(answersInfo["collaborating"]),
                returnPercentage(answersInfo["compromising"]), returnPercentage(answersInfo["avoiding"]), returnPercentage(answersInfo["accommodating"])
            ]
        ];

        //Returns false value so button won't show
        $scope.shouldShowButton = TKResultsButtonService.getShouldShowMenuButton();

        //Object holding frontend visual options
        $scope.options = {
            scaleIntegersOnly: true,
            animation: false,
            responsive: true,
            maintainAspectRatio: false,
            scaleOverride: true,
            scaleSteps: 4,
            scaleStepWidth: 25,
            scaleStartValue: 0,
            scaleLabel: "<%=value%>" + "%",
            tooltipTemplate: "<%if (label){%><%=label%>: <%}%><%= value.toFixed(0) %>" + "%",
        };

        //Array of custom color values
        $scope.colours = [{
            fillColor: "rgba(151,187,205,0.2)",
            strokeColor: "rgba(15,187,25,1)",
            pointColor: "rgba(15,187,25,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(151,187,205,0.8)"
        }];
        
        //Sets object holding results to zero (default) then redirects to questions
        $scope.goToTest = function() {
            TKAnswersService.resetAnswers();
            $state.go('question',{questionID:1});
        };
        
        //Logs user out of backend 
        $scope.logout = function() {
        SSFUsersRest.logout($window.localStorage.token)
            .then(function(response) {
                //If successful logout, redirect to landing and clear localStorage
                if (response.status === 204) {
                    $window.localStorage.clear();
                    $state.go('landing');
                }
                //log response to console and alert user
                else {
                    console.log(response);
                    return alert("Unable to logout, response " + response);
                }
            });
        };
        
        //Redirect to history
        $scope.goBack = function() {
            $location.path('/history');
        };
    }

]);