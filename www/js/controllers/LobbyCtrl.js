//LobbyCtrl
/*global angular*/
angular.module('starter.controllers')

.controller('LobbyCtrl', ['$scope', 'TKTestQuestionService', '$state', 'TKAnswersService', 'SSFUsersRest', '$window', '$location', '$ionicSlideBoxDelegate', 'UserInfoRest',
    function($scope, TKTestQuestionService, $state, TKAnswersService, SSFUsersRest, $window, $location, $ionicSlideBoxDelegate, UserInfoRest) {
        
        //Get first name from backend
        $scope.person = {};
        UserInfoRest.getUserInfo($window.localStorage.token)
        .then(function(response){
            $scope.person = response.data;
            return $scope.person;
        });

        //Get questions from backend
        TKTestQuestionService.all();

        //Start test
        $scope.goToTest = function() {
            TKAnswersService.resetAnswers();
            $state.go('question', {
                questionID: 1
            });
        };

        //Logout user from backend  
        $scope.logout = function() {
            SSFUsersRest.logout($window.localStorage.token)
                .then(function(response) {
                    if (response.status === 204) {
                        $window.localStorage.clear();
                        $state.go('landing');
                    }

                });
        };

        //Redirect to history page
        $scope.results = function() {
            $location.path('/history');
        };

        // Content for lobby page
        $scope.items = [{
            title: "The Five Conflict-Handling Modes",
            content: "The Thomas-Kilmann Conflict Mode Instrument (TKI) assesses an individual’s behavior in conflict " +
                "situations—that is, situations in which the concerns of two people appear to be incompatible. " +
                "In conflict situations, we can describe a person’s behavior along two basic dimensions: ",
            content2: "1. Assertiveness, the extent to which the individual attempts to satisfy his or her own concerns ",
            content3: "2. Cooperativeness, the extent to which the individual attempts to satisfy the other person’s concerns ",
            content4: "These two dimensions of behavior can be used to define five methods of dealing with conflict. These " +
                "five conflict-handling modes are shown below:",
            image: "./img/tk_chart.JPG"
        }, {
            title: "ACCOMODATING",
            content: "Accommodating is unassertive and cooperative—the opposite of competing. ",
            content2: "When accommodating, an individual neglects his or her own concerns to satisfy the concerns of the" +
                "other person; there is an element of self-sacrifice in this mode. " +
                "Accommodating might take the form of selfless generosity or charity, obeying another person’s order when you" +
                "would prefer not to, or yielding to another’s point of view. ",
            content3: "",
            content4: "",
            image: "./img/accomodating.png"
        }, {
            title: "AVOIDING",
            content: "Avoiding is unassertive and uncooperative. ",
            content2: "When avoiding, an individual does not immediately pursue his or her own concerns or those of the " +
                "other person. He or she does not address the conflict. Avoiding might take the form of diplomatically " +
                "sidestepping an issue, postponing an issue until a better time, or simply withdrawing from a threatening situation. ",
            content3: "",
            content4: "",
            image: "./img/avoiding.png"
        }, {
            title: "COLLABORATING",
            content: "Collaborating is both assertive and cooperative.",
            content2: "When collaborating, an individual attempts to work with the other person to find a solution that " +
                "fully satisfies the concerns of both. It involves digging into an issue to identify the underlying " +
                "concerns of the two individuals and to find an alternative that meets both sets of concerns. ",
            content3: "Collaborating between two persons might take the form of exploring a disagreement to learn from " +
                "each other’s insights, resolving some condition that would otherwise have them competing for " +
                "resources, or confronting and trying to find a creative solution to an interpersonal problem. ",
            content4: "",
            image: "./img/collaborating.png"
        }, {
            title: "COMPETING",
            content: "Competing is assertive and uncooperative, a power-oriented mode. ",
            content2: "When competing, an individual pursues his or her own concerns at the other person’s " +
                "expense, using whatever power seems appropriate to win his or her position. Competing " +
                "might mean standing up for your rights, defending a position you believe is correct, or simply trying to win. ",
            content3: "",
            content4: "",
            image: "./img/competing.png"
        }, {
            title: "COMPROMISING",
            content: "Compromising is intermediate in both assertiveness and cooperativeness. ",
            content2: "When compromising, an individual has the objective of finding an expedient, mutually " +
                "acceptable solution that partially satisfies both parties. Compromising falls on a middle " +
                "ground between competing and accommodating, giving up more than competing but less than accommodating. ",
            content3: "Likewise, it addresses an issue more directly than avoiding but doesn’t explore it in as much depth as " +
                "collaborating. Compromising might mean splitting the difference, exchanging concessions, or seeking a " +
                "quick middle-ground position.",
            image: "./img/compromising.png"
        }];

        //Allows SlideBox to slide
        $scope.nextSlide = function() {
            $ionicSlideBoxDelegate.next();
        };

    }

]);
