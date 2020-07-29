// Container for all quiz items
const quizItems = [
    {
        question: 'Who is the instructor for the UCB SF Bootcamp Part-time June 2020 class?',
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
        question: 'In computer programming, which logical gate outputs TRUE if both inputs are TRUE?',
        choices: ['OR', 'AND', 'NOR'],
        answer: 1
    }
];

// Container for the leaderboard, will contain an array of quizResults
const leaderBoard = [];

const progressPerQuestion = 100/quizItems.length;

const timer = 300;

let progress = 0;
let sessionScore = 0;
let currentQuestion = 0;
let remainingTime = 300;

// Gathering essential html elements
let $titleScreen = document.querySelector('.quiz-title-screen');
let $quizScreen = document.querySelector('.quiz-container');

let $questionPrompt = document.querySelector(".question");

let $answerButtons = document.querySelectorAll(".answer-btn");

let $startQuizButton = document.getElementById('start-quiz');
let $submitAnswerButton = document.getElementById("answer-next");

let $questionTimerText = document.querySelector('.question-header > h4');
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
    
    $titleScreen.hidden = false;
}

// switches the container to the first question and initializes the timer
function startQuiz(){
    remainingTime = timer;
    $questionTimerText.textContent = remainingTime;
    $titleScreen.hidden = true;
    $quizScreen.hidden = false;

    let quizTimer = setInterval(()=>{
        $questionTimerText.textContent = --remainingTime;
        if (remainingTime <= 0){
            clearInterval(quizTimer);
            endQuiz(true);
        }
    }, 1000);
}

// checks if there is a next question, then proceeds if not
// this is where we edit the question and the answers to display on to the html
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
}


function endQuiz(isTimesUp = false) {
    $submitAnswerButton.setAttribute('disabled', '');
    // modal to let user enter their name
    // initialize quiz
    console.log(`end score ${sessionScore}`);
}

// we add an event listener for each of the answer buttons for indicating which is the selected answer
$answerButtons.forEach(element => {
    element.addEventListener('click', x => {
        let me = x.target;
        $answerButtons.forEach(x => {
            x.style.backgroundColor = "#343a40"; x.removeAttribute("selected");
        });
        me.style.backgroundColor = "#64a973";
        me.setAttribute("selected", "");
        $submitAnswerButton.removeAttribute("disabled");
    });
});

// starts the quiz
$startQuizButton.addEventListener('click', () => {
    startQuiz();
});


// submits the selected answer and moves on to the next question
// this is also where we deduct time when the answer is wrong
$submitAnswerButton.addEventListener('click', () => {

    let answer = quizItems[currentQuestion].answer;
    let $userAnswer = document.getElementById(`${answer}`);
    let isCorrect = $userAnswer.hasAttribute('selected');

    if (isCorrect) {
        document.querySelector('.correct-indicator').hidden = false;
        document.querySelector('.wrong-indicator').hidden = true;
        sessionScore++;
    } else {
        document.querySelector('.correct-indicator').hidden = true;
        document.querySelector('.wrong-indicator').hidden = false;
        $questionTimerText.textContent = (remainingTime-=10);
    }
    nextQuestion();
});

// run this when the page loads for the first time
initializeQuiz();