//TKTestQuestionService
/*global angular*/
angular.module('TKTestQuestions', [])
.service('TKTestQuestionService', ['$http', 'QuestionsRest', '$window', 
    function ($http, QuestionsRest, $window){
        var service = this;
        
        //Array to store questions from backend
        var questions = [];
        
        //Get questions from backend
        service.all = function () {
        QuestionsRest.results($window.localStorage['token'])
            .then(function(response){
                //If successful store questions in array
                if(response.status == 200) {
                    questions = response.data;
                }
                //Else log response
                else {
                    console.log(response);
                }
            });
        };
            
        //Return array of results    
        service.getQuestion = function(questionID) {
            var results = [];
            questions.forEach(function(question){
                //Search for questions with the specified question ID
                if(question.Question_Number == questionID)
                    results.push(question);
                }
            );
            return results;
        };
        
}]);