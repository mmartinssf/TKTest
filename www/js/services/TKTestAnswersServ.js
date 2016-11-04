//TKTestAnswersService
/*global angular*/
angular.module('TKTestAnswers', [])
    .service('TKAnswersService', ['$http', '$window', 'TestResultsRest',
        function($http, $window, TestResultsRest) {
            var service = this;
            //Object to hold categories
            var answerCategories = {
                "competing": 0,
                "collaborating": 0,
                "compromising": 0,
                "avoiding": 0,
                "accommodating": 0
            };

            var categoriesStack = [];

            //Return object
            service.getAnswers = function() {
                return answerCategories;
            };
            
            //Add answers to object answerCategories then push object to array categoriesStack
            service.saveAnswer = function(answerCategory) {
                answerCategories[answerCategory.toLowerCase()]++;
                categoriesStack.push(answerCategory);
            };
            
            //Set values in object answerCategories to zero
            service.resetAnswers = function() {
                for (var property in answerCategories) {
                    if (answerCategories.hasOwnProperty(property)) {
                        answerCategories[property] = 0;
                    }
                }
            };
            
            //Remove last object in array categoriesStack
            service.eraseLastAnswer = function() {
                answerCategories[categoriesStack.pop().toLowerCase()]--;
            };
            
            //Save test to backend, token for verification
            service.saveTest = function(test) {
                test.userID = $window.localStorage.userId;
                TestResultsRest.save(test, $window.localStorage["token"])
                .then(function(response) {
                    //If saved, log to console
                    if (response.status === 200) {
                        //console.log(response);
                    }
                    //Else return response
                    else {
                        return alert('Unable to save, response ' + response);
                    }
                });
            };
            
            //Get test answers from backend
            service.getTests = function() {
                return TestResultsRest.getAll($window.localStorage['token'])
                    //If successful return test results
                    .then(function(response) {
                        if (response.status == 200) {
                            return response.data;
                        }
                        //Else alert error
                        else {
                            return alert('Unable to complete request, response ' + response);
                        }
                    });
            };
            
            //Change value of answerCategories to parameter passed
            service.setAnswers = function(answers) {
                answerCategories = answers;
            };
        }
    ]);