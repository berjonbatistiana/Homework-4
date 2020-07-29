// Container for all quiz items
const quizItems = [
    {
        question: 'Who is the instructor for the UCB Bootcamp Part-time June 2020 class?',
        choices: ['Amanda Crawford', 'Emmanuel Jucaban', 'Kit Te'],
        answer: 1
    },
    {
        question: 'A Villanelle is a type of what?',
        choices: ['Story', 'Song', 'Poem'],
        answer: 2
    },
    {
        question: 'Which cartoon family lives in "742 Evergreen Terrace, Springfield, USA"?',
        choices:['The Simpsons (The Simpsons)', 'The Griffins (Family Guy)', 'The Smiths (Rick and Morty)'],
        answer: 0
    },

    {
        question: 'What martial art was originated in 1882 by Japanese Doctor Jigoro Kano?',
        choices: ['Karate', 'Aikido', 'Judo'],
        answer: 2
    },

    {
        question: 'In computer programming, which logica gate outputs TRUE if both inputs are TRUE?',
        choices: ['OR', 'AND', 'NOR'],
        answer: 1
    }
];

// Container for the leaderboard, will contain an array of quizResults
const leaderBoard = [];

const progressPerQuestion = 100/quizItems.length;

let progress = 0;
let sessionScore = 0;
let currentQuestion = 0;

// Gathering essential html elements
let $questionPrompt = document.querySelector(".question");
let $answerButtons = document.querySelectorAll(".answer-btn");
let $submitAnswerButton = document.getElementById("answer-next");
let $progressBar = document.querySelector(".progress-bar");

// Object quizResult
function quizResult(name, score) {
    this.name = name;
    this.score = score;
}

// Re-initialize quiz, run when doing another quiz
function initializeQuiz() {
    progress = 0;
    sessionScore = 0;
    currentQuestion = 0;
    let item = quizItems[0];
    $questionPrompt.textContent = item.question;

    item.choices.forEach((answer, i) => {
        $answerButtons[i].textContent = answer;
    });
}

// checks if there is a next question, then proceeds if not
function nextQuestion() {

    progress+=parseInt(progressPerQuestion);
    $progressBar.style.width = progress + '%';

    if (++currentQuestion > quizItems.length - 1) {
        endQuiz();
    } else {
        let item = quizItems[currentQuestion];
        $questionPrompt.textContent = item.question;

        item.choices.forEach((answer, i) => {
            $answerButtons[i].textContent = answer;
            $answerButtons[i].style.backgroundColor = "#343a40";

        });
    }
    $submitAnswerButton.setAttribute('disabled', '');
}


function endQuiz() {
    // modal to let user enter their name
    // initialize quiz
    console.log(`end score ${sessionScore}`);
}

$answerButtons.forEach(element => {
    element.addEventListener('click', x => {
        let me = x.target;
        $answerButtons.forEach(x => {
            x.style.backgroundColor = "#343a40"; x.removeAttribute("selected");
        });
        me.style.backgroundColor = "#64a973";
        me.setAttribute("selected", "");
        $submitAnswerButton.removeAttribute("disabled");
    })
});

$submitAnswerButton.addEventListener('click', () => {

    let answer = quizItems[currentQuestion].answer;
    let $userAnswer = document.getElementById(`${answer}`);
    let isCorrect = $userAnswer.hasAttribute('selected');

    if (isCorrect) {
        sessionScore++;
    }
    nextQuestion();
});

initializeQuiz();