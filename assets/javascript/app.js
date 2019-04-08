var timer = 0;
var timerId = 0;
var questionTimeValue = 15;
var betweenQuestionTimeValue = 7;
var questionNumber = 0;

var question1 = {
    questionText: "In which opera are there no deaths?",
    answer1: "Tosca",
    answer2: "Barber of Seville",
    answer3: "Rigoletto",
    answer4: "Carmen",
    correctAnswer: "b"
}

var question2 = {
    questionText: "Which of the following is not the name of a real opera?",
    answer1: "Ernani",
    answer2: "Eugene Onegin",
    answer3: "Camembert",
    answer4: "The Nose",
    correctAnswer: "c"
}

var questions = [question1, question2];

function handleAnswerClick(button) {
    // console.log("Answer selected" , button.val());
    clearInterval(timerId);
}

$(".answers").on("click", function (event) {
    console.log("Answer clicked");
    handleAnswerClick(this);
});

function initializeQuestion() {
    var question = questions[questionNumber++];
    $("#questionText").text(question.questionText);
    $("#answer1Text").text(question.answer1);
    $("#answer2Text").text(question.answer2);
    $("#answer3Text").text(question.answer3);
    $("#answer4Text").text(question.answer4);
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
        //          start timer for between questions
    }
}

$(document).ready(function() { 
    // click to start?
    // initialize page with first question
    initializeQuestion();

    // initialize question timer
    // start timer
    timer = questionTimeValue;
    timerId = setInterval(timerHandler, 1000);
});

// on between question timer event
//      decrement between question timer
//      if timer value is 0
//          stop between question timer
//          display next question
//          start question timer
// on answer click
//      stop question timer 
//      if correct answer
//          display happy message
//      else
//          display correct answer
//          start between question logic
