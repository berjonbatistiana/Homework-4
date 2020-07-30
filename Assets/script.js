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
        choices: ['The Simpsons (The Simpsons)', 'The Griffins (Family Guy)', 'The Smiths (Rick and Morty)'],
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

// Progress bar modifier
const progressPerQuestion = 100 / quizItems.length;


// Gathering essential html elements
// const $leaderHeaders = "<tr><th>Initials</th><th>Score</th><th>Time</th></tr>"

let $titleScreen = document.querySelector('.quiz-title-screen');
let $quizScreen = document.querySelector('.quiz-container');
let $resultsScreen = document.querySelector('.quiz-result');
let $leaderboardScreen = document.querySelector('.leaderboard-container');

let $questionPrompt = document.querySelector(".question");

let $answerButtons = document.querySelectorAll(".answer-btn");

let $startQuizButton = document.getElementById('start-quiz');
let $submitAnswerButton = document.getElementById("answer-next");
let $submitLeaderboard = document.getElementById('add-leader');
let $textLeaderName = document.getElementById('user-initials-input');

let $questionTimerText = document.querySelector('.question-header > h4');
let $quizResultMessage = document.querySelector('.quiz-result-message');
let $quizResultScore = document.getElementById('quiz-result-score');

let $progressBar = document.querySelector(".progress-bar");

let $leaderboardButton = document.querySelector('.leaderboard-button');
let $leaderboardBody = document.querySelector('.leaderboard-body');
let $leaderboardClearButton = document.querySelector('.clear-leader');

let $form = document.querySelectorAll(".form");

// Quiz variables
const timer = 300;
let quizTimer; // Declaration of quizTimer to be used in two functions
let remainingTime = 300;
let progress = 0;
let sessionScore = 0;
let currentQuestion = 0;
let timesUpMessage = "Time's up!";
let finishedMessage = 'You have reached the end of the quiz!';

// Object quizResult
function quizResult(name = 'noname', score, time) {
    this.name = name;
    this.score = score;
    this.time = time;
}
// ------ functions -------

// --- display toggles, start ------------|
function displayQuiz() {                //|
    $resultsScreen.hidden = true;       //|
    $titleScreen.hidden = true;         //|
    $quizScreen.hidden = false;         //|
}                                       //|
                                        //|
function displayTitle() {               //|
    $resultsScreen.hidden = true;       //|
    $quizScreen.hidden = true;          //|
    $titleScreen.hidden = false;        //|
}                                       //|
                                        //|
function displayResults() {             //|
    $titleScreen.hidden = true;         //|
    $quizScreen.hidden = true;          //|
    $resultsScreen.hidden = false;      //|
}                                       //|
// display toggles, end __________________|

// TODO: Import and export leader from local
function importLeaderFromLocal(){

}

function exportLeadertoLocal(){

}

// sort leaderboard
function sortLeaderByScore(){
    // import leader from local
    leaderBoard.sort((a,b) => {
        if (parseInt(a.score) > parseInt(b.score)) {
            return -1;
        } else if (parseInt(a.score) < parseInt(b.score)) {
            return 1;
        } else {
            return 0;
        }
    });
}

// clear leaderboard 
function clearLeaderboard(){
    //clear leader from local
    leaderBoard.length = 0;
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

// switches the container to the first question and initializes the timer
function startQuiz() {
    remainingTime = timer;
    $questionTimerText.textContent = remainingTime;

    displayQuiz();

    quizTimer = setInterval(() => {
        $questionTimerText.textContent = --remainingTime;
        if (remainingTime < 0) {
            endQuiz(true);
        }
    }, 1000);
}

// checks if there is a next question, then proceeds if not
// this is where we edit the question and the answers to display on to the html
function nextQuestion() {

    progress += parseInt(progressPerQuestion);
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

// displays results
function endQuiz(isTimesUp = false) {
    clearInterval(quizTimer);
    $quizResultMessage.textContent = finishedMessage;
    $quizResultScore.textContent = `Your score is ${sessionScore}/${quizItems.length}`;
    if (isTimesUp) {
        $quizResultMessage.textContent = timesUpMessage;
    }
    displayResults();
}

// render an entry in the leaderboard
function renderLeader(leader) {
    let $leaderRecordEl = document.createElement('tr');
    let $leaderNameEl = document.createElement('td');
    let $leaderScoreEl = document.createElement('td');
    let $leaderTimeEl = document.createElement('td');

    $leaderNameEl.textContent = leader.name;
    $leaderScoreEl.textContent = leader.score;
    $leaderTimeEl.textContent = leader.time;

    $leaderRecordEl.appendChild($leaderNameEl);
    $leaderRecordEl.appendChild($leaderScoreEl);
    $leaderRecordEl.appendChild($leaderTimeEl);
    
    $leaderboardBody.appendChild($leaderRecordEl);
}

function renderLeaderTable(){
    $leaderboardBody.innerHTML = '';
    sortLeaderByScore();
    leaderBoard.forEach(element => {
        renderLeader(element);
    });
}


// -------- Event Listeners --------

// disable forms default event
$form.forEach(element => {
    element.addEventListener('submit', e => {
        e.preventDefault();
    });
});

// we add an event listener for each of the answer buttons for indicating which is the selected answer
$answerButtons.forEach(element => {
    element.addEventListener('click', e => {
        let me = e.target;
        $answerButtons.forEach(button => { // reset buttons before highlighting another one
            button.style.backgroundColor = "#343a40"; 
            button.removeAttribute("selected");
        });
        me.style.backgroundColor = "#64a973";
        me.setAttribute("selected", "");
        $submitAnswerButton.removeAttribute("disabled");
    });
});

// starts the quiz
$startQuizButton.addEventListener('click', e => {
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
        $questionTimerText.textContent = (remainingTime -= 10);
    }
    nextQuestion();
});

// store the quiz results into an array to be put into local storage
$submitLeaderboard.addEventListener('click', () => {
    leaderBoard.push(new quizResult($textLeaderName.value, sessionScore, remainingTime));
    // TODO: put into local storage
    initializeQuiz();
    displayTitle();
});

$leaderboardButton.addEventListener('click', () => {
    renderLeaderTable();
});

$leaderboardClearButton.addEventListener('click', () => {
    clearLeaderboard();
    renderLeaderTable();
});

// run this when the page loads for the first time
initializeQuiz();
displayTitle();