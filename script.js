const startBtn = document.getElementById('start-btn');
const restartBtn = document.getElementById('restart-btn');
const questionText = document.getElementById('question-text');
const answerButtons = document.getElementById('answer-buttons');
const progressText = document.getElementById('progress');
const scoreText = document.getElementById('score');
const finalScore = document.getElementById('final-score');
const message = document.getElementById('message');

const startScreen = document.getElementById('start-screen');
const questionScreen = document.getElementById('question-screen');
const resultScreen = document.getElementById('result-screen');

const questions = [
    { question: "What is the capital of France?", answers: ["London", "Berlin", "Paris", "Madrid"], correct: 2 },
    { question: "What is 2 + 2?", answers: ["3", "4", "5", "6"], correct: 1 },
    { question: "Which planet is known as the Red Planet?", answers: ["Earth", "Mars", "Venus", "Jupiter"], correct: 1 },
    { question: "Who wrote 'Romeo and Juliet'?", answers: ["Shakespeare", "Hemingway", "Tolkien", "Rowling"], correct: 0 },
    { question: "What is the largest ocean?", answers: ["Atlantic", "Pacific", "Indian", "Arctic"], correct: 1 }
];

let currentQuestion = 0;
let score = 0;
let answeringLocked = false;

startBtn.addEventListener('click', startQuiz);
restartBtn.addEventListener('click', restartQuiz);

function startQuiz() {
    score = 0;
    currentQuestion = 0;
    startScreen.classList.remove('active');
    resultScreen.classList.remove('active');
    questionScreen.classList.add('active');
    showQuestion();
}

function showQuestion() {
    answeringLocked = false;
    let q = questions[currentQuestion];
    questionText.textContent = q.question;
    answerButtons.innerHTML = "";

    q.answers.forEach((ans, index) => {
        const btn = document.createElement('button');
        btn.textContent = ans;
        btn.onclick = () => selectAnswer(index, q.correct);
        answerButtons.appendChild(btn);
    });

    progressText.textContent = `Question ${currentQuestion + 1} of ${questions.length}`;
    scoreText.textContent = `Score: ${score}`;
}

function selectAnswer(selectedIndex, correctIndex) {
    if (answeringLocked) return;
    answeringLocked = true;

    const buttons = Array.from(answerButtons.children);

    buttons.forEach((btn, index) => {
        btn.disabled = true; // 禁止再次点击
        if (index === correctIndex) {
            btn.style.backgroundColor = "#8bc34a"; // 正确绿色
            btn.style.color = "white";
        }
        if (index === selectedIndex && selectedIndex !== correctIndex) {
            btn.style.backgroundColor = "#f44336"; // 错误红色
            btn.style.color = "white";
        }
    });

    if (selectedIndex === correctIndex) score++;

    // 延迟显示下一题
    setTimeout(() => {
        currentQuestion++;
        if (currentQuestion < questions.length) {
            showQuestion();
        } else {
            showResult();
        }
    }, 1500);
}

function showResult() {
    questionScreen.classList.remove('active');
    resultScreen.classList.add('active');
    finalScore.textContent = `You scored ${score} out of ${questions.length}`;
    message.textContent = score > 3 ? "Great job!" : "Keep studying! You'll get better!";
}

function restartQuiz() {
    score = 0;
    currentQuestion = 0;
    resultScreen.classList.remove('active');
    startScreen.classList.add('active');
}
