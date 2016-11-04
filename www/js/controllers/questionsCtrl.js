//QuestionsCtrl
/*global angular*/
angular.module('starter.controllers')
    .controller('QuestionsCtrl', ['$scope', '$stateParams', 'testInfo', 'TKAnswersService', 'TKResultsButtonService', '$state', '$ionicHistory', '$window',
        function($scope, $stateParams, testInfo, TKAnswersService, TKResultsButtonService, $state, $ionicHistory, $window) {

            //Will notify which question has bug in case of error
            $scope.ptorQuestionGoA = 'ptor-question-go-a' + $stateParams.questionID;
            $scope.ptorQuestionGoB = 'ptor-question-go-b' + $stateParams.questionID;
            $scope.ptorQuestionTextA = 'ptor-question-text-a' + $stateParams.questionID;
            $scope.ptorQuestionTextB = 'ptor-question-text-b' + $stateParams.questionID;
    
            //Display which question number in title
            $scope.qNumber = $stateParams.questionID;
    
    
            testInfo.forEach(function(infoDict) {
                if (infoDict.Answer_ID === "A")
                    $scope.questionA = infoDict;
                if (infoDict.Answer_ID === "B")
                    $scope.questionB = infoDict;
                }
            );
    
            //Records user answers then displays results when finished
            $scope.buttonClicked = function(option) {
                //Variable to hold user answers
                var category = $scope["question" + option].Style;
                //Push answers to array categoriesStack
                TKAnswersService.saveAnswer(category);
    
                //If last question display results
                if ($scope.qNumber == 30) {
                    performRequest();
                }
                //Else continue questions
                else {
                    var nextqNumber = Number($scope.qNumber) + 1;
                    $state.go('question', {
                        questionID: nextqNumber
                    });
                }
            };
    
            //Back button erasing last answer
            $scope.goBack = function() {
                if ($scope.qNumber > 1)
                    TKAnswersService.eraseLastAnswer();
                    $ionicHistory.goBack();
            };

            //Adds ID and date to results, stores values and displays results
            function performRequest() {
                //Assign answers to variable
                var answersDict = angular.copy(TKAnswersService.getAnswers());
                //Create new object
                var date = new Date();
                //Add date to results
                answersDict["createDate"] = date.toUTCString();
                //Add ID to results
                answersDict["userID"] = $window.localStorage["userId"];
                //Save on backend
                TKAnswersService.saveTest(answersDict);
                //Show menu button
                TKResultsButtonService.setShouldShowMenuButton(true);
                //Show button
                $ionicHistory.nextViewOptions({
                    historyRoot: true
                });
                //Redirect to results
                $state.go('results');
            }
        }
        
    ]);