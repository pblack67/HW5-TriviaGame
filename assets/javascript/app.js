var timer = 0;
var timerId = 0;
var questionTimeValue = 15;
var betweenQuestionTimeValue = 5;
var questionNumber = 0;
var rightAnswers = 0;
var wrongAnswers = 0;
var noAnswers = 0;

var question1 = {
    questionText: "In which opera are there no deaths?",
    answers: ["Tosca", "Barber of Seville", "Rigoletto", "Carmen"],
    correctAnswer: 1
}

var question2 = {
    questionText: "Which of the following is not the name of a real opera?",
    answers: ["Ernani", "Eugene Onegin", "Camembert", "The Nose"],
    correctAnswer: 2
}

var questions = [question1, question2];

function startQuestionTimer() {
    timer = questionTimeValue;
    $("#timer").text("Time remaining: " + timer);
    timerId = setInterval(timerHandler, 1000);
}

function startBetweenQuestionTimer() {
    timer = betweenQuestionTimeValue;
    timerId = setInterval(betweenQuestionHandler, 1000);
}


function initializeQuestion() {
    var question = questions[questionNumber];
    $("#questionText").text(question.questionText);
    $("#answer1Button").text(question.answers[0]);
    $("#answer2Button").text(question.answers[1]);
    $("#answer3Button").text(question.answers[2]);
    $("#answer4Button").text(question.answers[3]);
    $("#answerArea").show();
    $("#resultText").text("");
    $("#reset").hide();
}

function gameOver() {
    console.log("Game Over");
    $("#finalScore").text("You had " + rightAnswers + " correct answers" + " and " + wrongAnswers + " incorrect answers.");
    if (noAnswers > 0) {
        $("#unanswered").text("You didn't answer " + noAnswers + " questions! For shame!");
    }
    $("#questionArea").hide();
    $("#resultText").text("");
    $("#reset").show();
}

// on answer click
function handleAnswerClick(radioButton) {
    console.log("Answer selected", radioButton.val());
    // $(".answers").prop("disabled", true);
    $("#answerArea").hide();
    //      stop question timer 
    clearInterval(timerId);
    //      if correct answer
    var correctAnswer = questions[questionNumber].correctAnswer;
    var correctAnswerText = questions[questionNumber].answers[correctAnswer];
    var userAnswer = parseInt(radioButton.val());
    if (userAnswer === correctAnswer) {
        //          display happy message
        $("#resultText").text(correctAnswerText + " is correct! You're an opera whiz!");
        rightAnswers++;
    } else {
        //          display correct answer
        var userAnswer = parseInt(radioButton.val());
        var userAnswerText = questions[questionNumber].answers[userAnswer];
            $("#resultText").text(userAnswerText + " is incorrect. The correct answer is " +
            correctAnswerText +
            ". Study up on your operas!");
        wrongAnswers++;
    }

    $("#timer").text("Time remaining: 0");
    questionNumber++;
    clearInterval(timerId);
    startBetweenQuestionTimer();
}

// on between question timer event
function betweenQuestionHandler() {
    //      decrement between question timer
    timer--;
    console.log("Timer remaining:", timer);
    //      if timer value is 0
    if (timer === 0) {
        //          stop between question timer
        clearInterval(timerId);
        
        if (questionNumber < questions.length) {
            //          display next question
            initializeQuestion();
            //          start question timer
            startQuestionTimer();
        } else {
            // handle end of game here
            gameOver();
        }

    }
}

// on question timer event 
function timerHandler() {
    //      decrement question timer
    timer--;
    console.log("Timer remaining:", timer);
    $("#timer").text("Time remaining: " + timer);
    //      update the screen
    //      if timer value is 0
    if (timer === 0) {
        //          stop question timer
        clearInterval(timerId);
        $("#answerArea").hide();
        //          display correct answer
        var answerIndex = questions[questionNumber].correctAnswer;
        $("#resultText").text("You didn't answer the question! The correct answer is " +
            questions[questionNumber].answers[answerIndex] +
            ". Study up on your operas!");
        noAnswers++;
        //          start timer for between questions
        questionNumber++;
        if (questionNumber < questions.length) {
            startBetweenQuestionTimer();
        } else {
            // game over
            gameOver();
        }
    }
}

function reset() {
    // reset right/wrong
    rightAnswers = 0;
    wrongAnswers = 0;
    noAnswers = 0;
    $("#finalScore").text("");
    $("#unanswered").text("");
    $("#questionArea").show();
    // initialize page with first question
    questionNumber = 0;
    initializeQuestion();
    // initialize question timer
    startQuestionTimer();
}

$(document).ready(function () {

    $(".answers").on("click", function (event) {
        handleAnswerClick($(this));
    });

    $("#reset").on("click", function (event) {
        reset();
    });

    $("#questionArea").hide();
    $("#reset").show();
});
