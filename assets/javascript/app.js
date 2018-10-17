$(document).ready(function() {

//Game starts when user clicks Start button
$("#start-button").on("click", triviaGame.startTimer);

});

var triviaGame = {

    //Timer starts at 60 seconds, decreases by 1 second
    timeRemaining: 60,

    //Timer starts after user hits Start button, questions are then shown
    startTimer: function () {
        $("#timer").text("Time left: " + triviaGame.timeRemaining);
        setInterval(triviaGame.countdown, 1000);
        $("#start").hide();
        trivia.displayQuestions();
    },

    //Decrement of timer, and stop timer at 0
    countdown: function() {
        triviaGame.timeRemaining--;
        $("#timer").text("Time left: " + triviaGame.timeRemaining);
        if (triviaGame.timeRemaining === 0) {
            triviaGame.stopTimer();
            $("#timer").empty();
        }
    },

    //Timer stops, and we check users answers
    stopTimer: function() {
        clearInterval();
        trivia.checkAnswers();
    },

    //After questions are done, hide them, then display results
    showResults: function(numCorrect, numIncorrect, numUnanswered) {
        $("#results").show();
        $("#questions").empty();
        $("#timer").empty();
        $("#timer").hide();
        $("#correct").text("Correct: " + numCorrect);
        $("#incorrect").text("Incorrect: " + numIncorrect);
        $("#unanswered").text("Unanswered: " + numUnanswered);
    }
}

// Trivia page
var trivia = {

    //Pull questions from the array and append to HTML
    displayQuestions: function() {
        var divContainer = $("#questions");
        var answerGroup = $(".form-check");
        divContainer.append("<h2>Answer as many questions as you can:</h2>");
        for (var i = 0; i < officeQuestions.length; i++) {
            divContainer.append("<div id='question'>" + officeQuestions[i].question + "</div>");

            var answer1 = officeQuestions[i].answers[0];
            var answer2 = officeQuestions[i].answers[1];
            var answer3 = officeQuestions[i].answers[2];
            var answer4 = officeQuestions[i].answers[3];

            divContainer.append('<div class="form-check"><input class="form-check-input" type="radio" name="radio-group'+i+'" id="radio'+i+'"><label class="form-check-label" id="radio'+i+'label" for="radio'+i+'">' + answer1 + '</label></div>');
            divContainer.append('<div class="form-check"><input class="form-check-input" type="radio" name="radio-group'+i+'" id="radio'+i+'"><label class="form-check-label" id="radio'+i+'label" for="radio'+i+'">' + answer2 + '</label></div>');
            divContainer.append('<div class="form-check"><input class="form-check-input" type="radio" name="radio-group'+i+'" id="radio'+i+'"><label class="form-check-label" id="radio'+i+'label" for="radio'+i+'">' + answer3 + '</label></div>');
            divContainer.append('<div class="form-check"><input class="form-check-input" type="radio" name="radio-group'+i+'" id="radio'+i+'"><label class="form-check-label" id="radio'+i+'label" for="radio'+i+'">' + answer4 + '</label></div>');
        }

        //Submit button at end
        var submitButton = '<button class="btn btn-primary" id="submit-button" type="submit">Submit</button>';
        divContainer.append(submitButton);
        $("#submit-button").on("click", triviaGame.stopTimer);
    },

    //Checks if user answers are correct, incorrect, or unanswered
    checkAnswers: function() {
        var correctAnswer;
        var userAnswer;
        var numCorrect = 0;
        var numIncorrect = 0;
        var numUnanswered = 0;

        //Loop through array to compare users answers, and increase score when correct
        for (var i=0; i < officeQuestions.length; i++) {
            correctAnswer = officeQuestions[i].correct;
            userAnswer = $('input[id=radio'+i+']:checked + label').text();

            if (userAnswer === correctAnswer) {
                numCorrect++;
            } else if (userAnswer === "") {
                numUnanswered++;
            } else if (userAnswer !== correctAnswer) {
             {
                 numIncorrect++;
             }
        }
    }

    //Show result page
    triviaGame.showResults(numCorrect, numIncorrect, numUnanswered);
},
}

//Array of ojbects with questions, answers, and the correct answer
var officeQuestions =
[
    {
        question: "In S1E1 'Pilot': Who started their first day at Dunder Mifflin Scranton?",
        answers: ["Jim Halpert", "Ryan Howard", "Michael Scott", "Erin Hannon"],
        correct: "Ryan Howard"
    },

    {
        question: "In S2E1 'The Dundies': What Dundie award does Phyllis take home?",
        answers: ["The Busiest Beaver Dundie", "The Bushiest Beaver Dundie", "Spicy Curry Dundie", "Whitest Sneakers Dundie"],
        correct: "The Bushiest Beaver Dundie"
    },

    {
        question: "In S3E1 'Gay Witch Hunt': What is Andy's nickname for Jim?",
        answers: ["Jimbo", "Fat Halpert", "Jimothy", "Big Tuna"],
        correct: "Big Tuna"
    },

    {
        question: "In S4E1 'Fun Run': Dwight mercy kills Angela's cat. Name that cat.",
        answers: ["Sprinkles", "Bandit", "Garbage", "Fluffy"],
        correct: "Sprinkles"
    },

    {
        question: "In S5E1: 'Weight Loss': Where does Jim propose to Pam?",
        answers: ["A romantic restaurant", "At the Office", "In the parking lot", "A gas station"],
        correct: "A gas station"
    }
]