const questions = [
    {
        question: "What is the capital of France?",
        answers: {
            a: "Berlin",
            b: "Madrid",
            c: "Paris",
            d: "Lisbon"
        },
        correctAnswer: "c"
    },
    {
        question: "What is 2 + 2?",
        answers: {
            a: "3",
            b: "4",
            c: "5",
            d: "6"
        },
        correctAnswer: "b"
    }
];

const quizContainer = document.getElementById('quiz');
const resultsContainer = document.getElementById('results');
const submitButton = document.getElementById('submit');

function buildQuiz() {
    const output = [];

    questions.forEach((currentQuestion, questionIndex) => {
        const answers = [];

        for (let letter in currentQuestion.answers) {
            answers.push(
                `<label>
                    <input type="radio" name="question${questionIndex}" value="${letter}" onclick="selectAnswer(this)">
                    ${letter}: ${currentQuestion.answers[letter]}
                </label>`
            );
        }

        output.push(
            `<div class="question"> ${currentQuestion.question} </div>
            <div class="answers"> ${answers.join('')} </div>`
        );
    });

    quizContainer.innerHTML = output.join('');
}

let selectedAnswers = [];

function selectAnswer(selectedInput) {
    const questionIndex = selectedInput.name.replace('question', '');
    selectedAnswers[questionIndex] = selectedInput.value;
}

function showResults() {
    const answerContainers = quizContainer.querySelectorAll('.answers');
    let score = 0;

    questions.forEach((currentQuestion, questionIndex) => {
        const answerContainer = answerContainers[questionIndex];
        const userAnswer = selectedAnswers[questionIndex];

        answerContainer.querySelectorAll('label').forEach(label => {
            const input = label.querySelector('input');
            if (input.value === currentQuestion.correctAnswer) {
                label.style.backgroundColor = '#c8e6c9'; // Correct answer color
            } else if (input.value === userAnswer) {
                label.style.backgroundColor = '#ffcdd2'; // Incorrect answer color
            }
        });

        if (userAnswer === currentQuestion.correctAnswer) {
            score++;
        }
    });

    resultsContainer.innerHTML = `You scored ${score} out of ${questions.length}`;
}

buildQuiz();

submitButton.addEventListener('click', showResults);
