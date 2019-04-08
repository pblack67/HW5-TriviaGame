var timer = 0;
var timerId = 0;
var questionTimeValue = 15;
var betweenQuestionTimeValue = 5;
var questionNumber = 0;
var correctAnswers = 0;
var wrongAnswers = 0;

var question1 = {
    questionText: "In which opera are there no deaths?",
    answers: ["Tosca", "Barber of Seville", "Rigoletto", "Carmen"],
    correctAnswer: "b"
}

var question2 = {
    questionText: "Which of the following is not the name of a real opera?",
    answers: ["Ernani", "Eugene Onegin", "Camembert", "The Nose"],
    correctAnswer: "c"
}

var questions = [question1, question2];

function startQuestionTimer() {
    timer = questionTimeValue;
    timerId = setInterval(timerHandler, 1000);
}

function startBetweenQuestionTimer() {
    timer = betweenQuestionTimeValue;
    timerId = setInterval(betweenQuestionHandler, 1000);
}


function initializeQuestion() {
    var question = questions[questionNumber];
    $("#questionText").text(question.questionText);
    $("#answer1Text").text(question.answers[0]);
    $("#answer2Text").text(question.answers[1]);
    $("#answer3Text").text(question.answers[2]);
    $("#answer4Text").text(question.answers[3]);
    $(".answers").prop("checked", false);
    $("#resultText").text("");
    $("#reset").hide();
}

// on answer click
function handleAnswerClick(radioButton) {
    console.log("Answer selected", radioButton.val());
    //      stop question timer 
    clearInterval(timerId);
    //      if correct answer
    var correctAnswer = questions[questionNumber].correctAnswer;
    if (radioButton.val() === correctAnswer) {
        //          display happy message
        $("#resultText").text("Correct! You're an opera whiz!");
        correctAnswers++;
    } else {
        //          display correct answer
        $("#resultText").text("The correct answer is " + correctAnswer + ". Study up on your operas!");
        wrongAnswers++;
    }

    questionNumber++;
    if (questionNumber < questions.length) {
        startBetweenQuestionTimer();
    } else {
        // handle end of game here
        clearInterval(timerId);
        console.log("Game Over");
        $("#reset").show();
    }
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
        //          display next question
        initializeQuestion();
        //          start question timer
        startQuestionTimer();
    }
}

// on question timer event 
function timerHandler() {
    //      decrement question timer
    console.log("Timer remaining:", timer);
    timer--;
    //      update the screen
    $("#timer").text("Time remaining: " + timer);
    //      if timer value is 0
    if (timer === 0) {
        //          stop question timer
        clearInterval(timerId);
        //          display correct answer
        var correctAnswer = questions[questionNumber].correctAnswer;
        $("#resultText").text("The correct answer is " + correctAnswer + ". Study up on your operas!");
        wrongAnswers++;
        //          start timer for between questions
        questionNumber++;
        if (questionNumber < questions.length) {
            startBetweenQuestionTimer();
        } else {
            // game over
            console.log("Game Over");
            $("#reset").show();
        }
    }
}

function reset() {
    questionNumber = 0;
    correctAnswers = 0;
    wrongAnswers = 0;
    // initialize page with first question
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

    reset();
});


