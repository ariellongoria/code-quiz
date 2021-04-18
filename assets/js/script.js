var questions = [
    {
        question: "Commonly used data types DO NOT include:",
        options: ["strings", "booleans", "alerts", "numbers"],
        correctOptions: "alerts",
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
        question: "A very useful toll used during development and debugging for printing content to the debugger is:",
        options: ["JavaScript", "terminal/bash", "for loops", "console.log"],
        correctOption: "console log",
    },
];

var score;

var startButton = document.querySelector("#start-button");
var startPage = document.querySelector("#start-page");
var quizBox = document.querySelector(".quiz");

// Starts timer
var beginTimer = function () {
    let timeLeft = 120;
    var countdownTimer = document.getElementById("time-left");
    setInterval(function () {
        if (timeLeft <= 0) {
            clearInterval((timeLeft = 0));
        }
        countdownTimer.innerHTML = timeLeft + " seconds";
        timeLeft -= 1;
    }, 1000);
};

//Initializes the quiz structure
var initialize = function () {
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
        document.querySelector("button[answer-id = '" + i + "']").textContent = questions[index].options[i];
    }
};

//pogchamp
var startQuiz = function () {
    startPage.remove();
    score = 0;
    initialize();
    renderQuestion(0);
};

startButton.addEventListener("click", startQuiz);
startButton.addEventListener("click", beginTimer);
