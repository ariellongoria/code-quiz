var questions = [
    {
        question: "Commonly used data types DO NOT include:",
        options: ["strings", "booleans", "alerts", "numbers"],
        correctOption: "alerts",
    },
    {
        question: "The condition in an if / else statement is enclosed with __.",
        options: ["quotes", "curly brackets", "parenthesis", "square brackets"],
        correctOption: "parenthesis",
    },
    {
        question: "String values must be enclosed within __ when being assigned to variables",
        options: ["commas", "curly brackets", "quotes", "parenthesis"],
        correctOption: "quotes",
    },
    {
        question: "Arrays in JavaScript can be used to store __.",
        options: ["numbers and strings", "other arrays", "booleans", "all of the above"],
        correctOption: "all of the above",
    },
    {
        question: "A very useful tool used during development and debugging for printing content to the debugger is:",
        options: ["JavaScript", "terminal/bash", "for loops", "console.log"],
        correctOption: "console log",
    },
];

var questionIndex = 0;
var timeLeft = 60;
var highScores = [];

var startButton = document.querySelector("#start-button");
var startPage = document.querySelector("#start-page");
var quizBox = document.querySelector(".quiz");
var highScoreButton = document.querySelector("#high-scores-button");
var endQuizScreen = document.querySelector(".end-screen");
var highScoreScreen = document.querySelector(".high-scores");
var countdownTimer = document.getElementById("time-left");

// Starts timer
var beginTimer = function () {
    var newTimer = setInterval(function () {
        if (timeLeft <= 0) {
            clearInterval(newTimer);
            if (timeLeft < 0) {
                timeLeft = 0;
            }
            endQuiz();
        } else if (questionIndex >= questions.length) {
            clearInterval(newTimer);
        } else {
            countdownTimer.innerHTML = timeLeft + " seconds";
            timeLeft -= 1;
        }
    }, 1000);
};

//Initializes the quiz structure
var initializeQuestions = function () {
    var newQuestion = document.createElement("h2");
    newQuestion.className = "question";
    quizBox.appendChild(newQuestion);
    var answerBox = document.createElement("span");
    for (var i = 0; i < 4; i++) {
        var answerButton = document.createElement("button");
        answerButton.className = "answer-btn";
        answerButton.setAttribute("answer-id", i);
        answerBox.appendChild(answerButton);
    }
    quizBox.appendChild(answerBox);
};

//Populates the elements with questions and answers
var renderQuestion = function (index) {
    document.querySelector(".question").textContent = questions[index].question;
    for (var i = 0; i < questions[index].options.length; i++) {
        var currentAnswer = document.querySelector("button[answer-id = '" + i + "']");
        currentAnswer.textContent = questions[index].options[i];
        if (currentAnswer.textContent === questions[index].correctOption) {
            currentAnswer.setAttribute("is-correct", true);
        } else {
            currentAnswer.setAttribute("is-correct", false);
        }
    }
};

var renderHighScores = function () {
    endQuizScreen.innerHTML = "";
    quizBox.innerHTML = "";
    startPage.innerHTML = "";
    var goBackButton = document.createElement("button");
    goBackButton.textContent = "Go Back";
    highScoreScreen.appendChild(goBackButton);
    var highScoresList = document.createElement("ul");
    for (i = 0; i < highScores.length; i++) {
        var highScoreElement = document.createElement("li");
        highScoreElement.textContent = highScores[i].player + "\t" + highScores[i].score;
        highScoresList.appendChild(highScoreElement);
    }
    highScoreScreen.appendChild(highScoresList);
};

var renderEndScreen = function () {
    var form = document.createElement("form");
    var nameSubmission = document.createElement("input");
    nameSubmission.setAttribute("type", "text");
    nameSubmission.setAttribute("name", "player-name");
    form.appendChild(nameSubmission);
    var scoreSubmitButton = document.createElement("button");
    scoreSubmitButton.textContent = "Submit New Score";
    scoreSubmitButton.setAttribute("type", "submit");
    form.appendChild(scoreSubmitButton);
    endQuizScreen.appendChild(form);
};

var submitScore = function (event) {
    event.preventDefault();
    var playerName = document.querySelector("input[name = 'player-name']");
    if (playerName.value) {
        var newHighScore = {
            player: playerName.value,
            score: timeLeft,
        };
    }
    highScores.push(newHighScore);
    saveScores();
    renderHighScores();
};

var saveScores = function () {
    localStorage.setItem("scores", JSON.stringify(highScores));
};

var loadScores = function () {
    highScores = JSON.parse(localStorage.getItem("scores"));
};

//Starts the quiz
var startQuiz = function () {
    startPage.innerHTML = "";
    score = 0;
    initializeQuestions();
    renderQuestion(questionIndex);
};

var endQuiz = function () {
    quizBox.innerHTML = "";
    console.log(timeLeft);
    countdownTimer.textContent = timeLeft;
    renderEndScreen();
};

loadScores();

startButton.addEventListener("click", startQuiz);
startButton.addEventListener("click", beginTimer);
highScoreButton.addEventListener("click", renderHighScores);
highScoreScreen.addEventListener("click", function () {
    highScoreScreen.innerHTML = "";
    startPage.innerHTML =
        "<p>Instructions</p><p>Try to answer the following code related questions within the time limit. Keep in mind that incorrect answers will penalize your time/score by ten seconds!</p><button type='button' id='start-button'>Start Quiz</button>";
});
endQuizScreen.addEventListener("submit", submitScore);

quizBox.addEventListener("click", function (event) {
    console.log(questionIndex);
    if (event.target.getAttribute("is-correct") === "true") {
        console.log("poggers");
    } else {
        console.log("not poggers");
        timeLeft -= 10;
    }
    if (questionIndex < questions.length - 1) {
        questionIndex++;
        renderQuestion(questionIndex);
    } else {
        questionIndex++;
        console.log(questionIndex);
        endQuiz();
    }
});
