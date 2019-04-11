var timer = 0;
var timerId = 0;
var questionTimeValue = 15;
var betweenQuestionTimeValue = 5;
var questionNumber = 0;
var rightAnswers = 0;
var wrongAnswers = 0;
var noAnswers = 0;

var questions = [
    {
        questionText: "In which opera are there no deaths?",
        answers: ["Tosca", "Barber of Seville", "Rigoletto", "Carmen"],
        correctAnswer: 1,
        rewardImage: "assets/images/rabbitofseville.jpg"
    },

    {
        questionText: "Which of the following is not the name of a real opera?",
        answers: ["Ernani", "Eugene Onegin", "Camembert", "The Nose"],
        correctAnswer: 2,
        rewardImage: "assets/images/Camembert.jpg"
    },

    {
        questionText: "Who wrote the opera Aida?",
        answers: ["Rossini", "Dvorak", "Verdi", "Jay Z"],
        correctAnswer: 2,
        rewardImage: "assets/images/Giuseppi_Verdi.jpg"
    },

    {
        questionText: "Who is the creative consultant of the Lyric Opera of Chicago?",
        answers: ["Renee Fleming", "Placido Domingo", "Yo Yo Ma", "Chance the Rapper"],
        correctAnswer: 0,
        rewardImage: "assets/images/Fleming.jpg"
    },

    {
        questionText: "Who does Carmen seduce in Bizet's Carmen?",
        answers: ["Don Carlo", "Don Quixote", "Don Ho", "Don Jose"],
        correctAnswer: 3,
        rewardImage: "assets/images/carmen.jpg"
    }
]
// var questions = [question1, question2, question3, question4, question5];

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

    // Generate answer buttons dynamically
    // Makes it flexible for questions that can have any number of answers. :)
    $("#answerArea").empty();
    for (var i = 0; i < question.answers.length; i++) {
        var answerButton = $("<button>").
            addClass("answers").
            attr("value", i).
            text(question.answers[i]);
        $("#answerArea").append(answerButton);
        $("#answerArea").append($("<br>"));
    }

    // Remember to hook up listeners since the buttons vanish with every new question
    $(".answers").on("click", function (event) {
        handleAnswerClick($(this));
    });

    $("#answerArea").show();
    $("#resultText").text("");
    $("#rewardImage").attr("src", "");
    $("#rewardImage").hide();
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
    $("#rewardImage").hide();
    $("#reset").show();
}

// on answer click
function handleAnswerClick(button) {
    console.log("Answer selected", button.val());
    // $(".answers").prop("disabled", true);
    $("#answerArea").hide();
    //      stop question timer 
    clearInterval(timerId);
    //      if correct answer
    var correctAnswer = questions[questionNumber].correctAnswer;
    var correctAnswerText = questions[questionNumber].answers[correctAnswer];
    var userAnswer = parseInt(button.val());
    if (userAnswer === correctAnswer) {
        //          display happy message
        $("#resultText").text(correctAnswerText + " is correct! You're an opera whiz!");
        $("#rewardImage").attr("src", questions[questionNumber].rewardImage);
        $("#rewardImage").show();
        rightAnswers++;
    } else {
        //          display correct answer
        var userAnswer = parseInt(button.val());
        var userAnswerText = questions[questionNumber].answers[userAnswer];
        $("#resultText").text(userAnswerText +
            " is incorrect. The correct answer is " +
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
        // taunt user for not answering question at all
        var answerIndex = questions[questionNumber].correctAnswer;
        $("#resultText").text("You didn't answer the question! No answer for you! Study up on your operas!");
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

    $("#reset").on("click", function (event) {
        reset();
    });

    $("#questionArea").hide();
    $("#reset").show();
    $("#rewardImage").hide();
});
