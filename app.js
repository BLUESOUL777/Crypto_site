const questions = [
    {
        question: "What is Bitcoin?",
        answers: [
            { text: "A physical currency", correct: false },
            { text: "A type of digital currency", correct: true },
            { text: "A form of government bond", correct: false },
            { text: "A traditional bank account", correct: false }
        ]
    },
    {
        question: "Who is known as the creator of Bitcoin?",
        answers: [
            { text: "Elon Musk", correct: false },
            { text: "Vitalik Buterin", correct: false },
            { text: "Satoshi Nakamoto", correct: true },
            { text: "Mark Zuckerberg", correct: false }
        ]
    },
    {
        question: "Which technology underpins cryptocurrencies like Bitcoin?",
        answers: [
            { text: "Blockchain", correct: true },
            { text: "Internet of Things (IoT)", correct: false },
            { text: "Cloud Computing", correct: false },
            { text: "Artificial Intelligence (AI)", correct: false }
        ]
    },
    {
        question: "What is an altcoin?",
        answers: [
            { text: "A cryptocurrency other than Bitcoin", correct: true },
            { text: "A traditional bank coin", correct: false },
            { text: "An alternative to coins used in vending machines", correct: false },
            { text: "A type of government-issued currency", correct: false }
        ]
    },
    {
        question: "What does 'mining' refer to in the context of cryptocurrencies?",
        answers: [
            { text: "Digging for precious metals", correct: false },
            { text: "A process to generate new cryptocurrencies", correct: true },
            { text: "Building blocks for traditional banks", correct: false },
            { text: "A technique to secure physical vaults", correct: false }
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;
let playerName = "";

// Ask for username before starting the quiz
function getPlayerName() {
    playerName = prompt("Enter your name to start the quiz:");
    if (!playerName || playerName.trim() === "") {
        playerName = "Anonymous"; // Default if no name is entered
    }
}

function startQuiz() {
    getPlayerName(); // Ask for username before starting
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = `${questionNo}. ${currentQuestion.question}`;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButton.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState() {
    nextButton.style.display = "none";
    while (answerButton.firstChild) {
        answerButton.removeChild(answerButton.firstChild);
    }
}

function selectAnswer(e) {
    const selectBtn = e.target;
    const isCorrect = selectBtn.dataset.correct === "true";
    if (isCorrect) {
        selectBtn.classList.add("correct");
        score++;
    } else {
        selectBtn.classList.add("incorrect");
    }
    Array.from(answerButton.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });

    nextButton.style.display = "block";
}

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length - 1) {
        handleNextButton();
    } else {
        saveScore();
        showScore();
    }
});

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        saveScore();
        showScore();
    }
}

function showScore() {
    resetState();
    questionElement.innerHTML = `Great job, ${playerName}! You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = `Restart Quiz`;
    nextButton.style.display = "block";
}

function saveScore() {
    let leaderboard = JSON.parse(localStorage.getItem("cryptoLeaderboard")) || [];
    leaderboard.push({ name: playerName, score: score });
    leaderboard.sort((a, b) => b.score - a.score); // Rank by highest score
    localStorage.setItem("cryptoLeaderboard", JSON.stringify(leaderboard));
}

// Home and Leaderboard Buttons
document.getElementById('homedirect').addEventListener('click', () => {
    window.location.href = '../index.html';
});
 
const leaderbtn = document.getElementById('leaderboard');
document.getElementById('leaderboard').addEventListener('click', () => {
    window.location.href = './leader.html';
});
function leaderState() {
    leaderbtn.style.display = "none";
}
startQuiz();
