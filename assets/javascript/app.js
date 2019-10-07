
$("#start").on("click", function () {
    $("#start").remove();
    game.loadQuestion();
})

$(document).on('click', '.answer-button', function (event) {
    game.clicked(event)
})
$(document).on('click', '#reset', function () {
    game.reset()
})

var questions = [{
    question: "What is the original planet that Senator Palpatine is from?",
    answers: ["Naboo", "Coruscant", "Tatooine", "Dantooine"],
    correctAnswer: "Naboo",
    image: ""
}, {
    question: "What is the first line of the Sith code?",
    answers: ["Peace is a lie, there is only strength", "Strength is a lie, there is only passion", "Peace is a lie, there is only passion", "There is only the force"],
    correctAnswer: "Peace is a lie, there is only passion",
    image: ""
}, {
    question: "Who was Darth Maul's brother?",
    answers: ["Savage Oppress", "Asaj Ventriss", "Hondo Ohnaka", "Cad Bane"],
    correctAnswer: "Savage Oppress",
    image: ""
}, {

    question: "What planet did Princess Leia initially say contained the secret rebel base in A New Hope?",
    answers: ["Alderaan", "Dantooine", "Hoth", "Endor"],
    correctAnswer: "Dantooine",
    image: ""
}, {
    question: "What color lightsaber do the Jedi Temple Guard Use?",
    answers: ["Yellow", "Blue", "Green", "Purple"],
    correctAnswer: "Yellow",
    image: ""
}, {
    question: "What alien race were the spies that brought the Second Death Star plans to the Rebellion?",
    answers: ["Trandoshan", "Wookie", "Bothan", "Rodian"],
    correctAnswer: "Bothan",
    image: ""
}, {
    question: "Who was Count Dooku's Jedi Master?",
    answers: ["Mace Windu", "Plo-Koon", "Qui-Gon Jin", "Yoda"],
    correctAnswer: "Yoda",
    image: ""

}];

var game = {
    questions: questions,
    currentQuestion: 0,
    counter: 30,
    correct: 0,
    incorrect: 0,
    unanswered: 0,
    countdown: function () {
        game.counter--;
        $("#counter").html(game.counter);
        if (game.counter <= 0) {
            console.log("TIME UP!");
            game.timeUp();
        }
    },
    loadQuestion: function () {
        timer = setInterval(game.countdown, 1000);
        $("#subwrapper").html("<h2>Time Left <span id='counter'> id=counter>30 </span> Seconds</h2>")
        $("#subwrapper").append("<h2>" + questions[game.currentQuestion].question + "</h2>");
        for (var i = 0; i < questions[game.currentQuestion].answers.length; i++) {
            $("#subwrapper").append('<button class = "answer-button" id="button-' + i + '" data-name="' + questions[game.currentQuestion].answers[i] + '">' + questions[game.currentQuestion].answers[i] + '</button>');
        }
    },
    nextQuestion: function () {
        game.counter = 30;
        $("#counter").html(game.counter);
        game.currentQuestion++;
        game.loadQuestion();

    },
    timeUp: function () {
        clearInterval(timer);
        game.unanswered++
        $("#subwrapper").html("<h2> You are out of time! </h2>");
        $("#subwrapper").append("<h3>The correct answer was: " + questions[game.currentQuestion].correctAnswer + "</h3>");
        if (game.currentQuestion == questions.length - 1) {
            setTimeout(game.results, 3 * 1000);
        }
        else {
            setTimeout(game.nextQuestion, 3 * 1000);
        }
    },
    results: function () {
        clearInterval(timer);
        $("#subwrapper").html("<h2> All done! Your Jedi Trials are now complete! </h2>");
        $("#subwrapper").append("<h3> Correct: " + game.correct + "</h3>");
        $("#subwrapper").append("<h3> Incorrect: " + game.incorrect + "</h3>");
        $("#subwrapper").append("<h3> Unanswered: " + game.unanswered + "</h3>");
        $("#subwrapper").append("<button id=reset> Restart </button>")

    },
    clicked: function () {
        clearInterval(timer);
        if ($(event.target).data("name") == questions[game.currentQuestion].correctAnswer) {
            game.answeredCorrectly();
        }
        else {
            game.answeredIncorrectly();
        }
    },
    answeredCorrectly: function () {
        console.log("Yes")
        clearInterval(timer);
        game.correct++
        $("#subwrapper").html("<h2> Correct! The Force is Strong with You </h2>");
        if (game.currentQuestion == questions.length - 1) {
            setTimeout(game.results, 3 * 1000);
        }
        else {
            setTimeout(game.nextQuestion, 3 * 1000);
        }
    },
    answeredIncorrectly: function () {
        console.log("no")
        clearInterval(timer)
        game.incorrect++
        $("#subwrapper").html("<h2> Incorrect! You underestimate the power of the Dark Side! </h2>");
        $("#subwrapper").append("<h3>The correct answer was: " + questions[game.currentQuestion].correctAnswer + "</h3>");
        if (game.currentQuestion == questions.length - 1) {
            setTimeout(game.results, 3 * 1000);
        }
        else {
            setTimeout(game.nextQuestion, 3 * 1000);
        }
    },
    reset: function () {
        game.currentQuestion = 0;
        game.counter = 0;
        game.correct = 0;
        game.incorrect = 0;
        game.unanswered = 0;
        game.loadQuestion();
    }
}