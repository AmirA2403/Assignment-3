// Fake authentication function
const authenticate = () => {
    const usernameInput = document.getElementById('usernameInput').value;
    const authError = document.getElementById('authError');
    const quizContainer = document.getElementById('quizContainer');
    const authContainer = document.getElementById('authContainer');

    // Checks if the username is entered
    if (usernameInput.trim() !== "") {
        authContainer.style.display = 'none';  // Hides the username input section
        quizContainer.style.display = 'block';  // Shows the quiz section
    } else {
        // Shows an error message if username is empty
        authError.style.display = 'block';
    }
};

const updateProgressBar = () => {
    const form = document.getElementById('quizForm');
    let answered = 0;

    // Counts how many questions have been answered
    for (let question in answers) {
        const selectedOption = form.querySelector(`input[name="${question}"]:checked`);
        if (selectedOption) {
            answered++;
        }
    }

    // Updates progress bar and progress text
    const progressBar = document.getElementById('progressBar');
    const progressText = document.getElementById('progressText');
    progressBar.value = answered;
    progressText.textContent = `${answered}/5 Questions Answered`;
};

const submitQuiz = () => {
    const form = document.getElementById('quizForm');
    const formData = new FormData(form);
    let score = 0;

    // Clears previous feedback (remove correct/incorrect classes)
    document.querySelectorAll('.options label').forEach(label => {
        label.classList.remove('correct', 'incorrect');
    });

    // Checks answers and count how many have been answered
    for (let question in answers) {
        const selectedOption = form.querySelector(`input[name="${question}"]:checked`);
        const correctAnswer = answers[question];

        // If the user has selected an option for the question
        if (selectedOption) {
            const selectedLabel = form.querySelector(`label[for="${selectedOption.id}"]`);
            if (selectedOption.value === correctAnswer) {
                // Correct answer selected
                selectedLabel.classList.add('correct');
                score++;
            } else {
                // Incorrect answer selected
                selectedLabel.classList.add('incorrect');
            }
        }

        // Highlights the correct answer in all cases
        const correctOption = form.querySelector(`input[name="${question}"][value="${correctAnswer}"]`);
        const correctLabel = form.querySelector(`label[for="${correctOption.id}"]`);
        if (correctLabel) {
            correctLabel.classList.add('correct');
        }
    }

    const resultText = document.getElementById('resultText');
    if (answered === 5) {
        resultText.textContent = `You scored ${score} out of 5!`;
    } else {
        resultText.textContent = `Please answer all questions!`;
    }
};

// Correct Answers:
const answers = {
    q1: 'b',
    q2: 'false',
    q3: 'b',
    q4: 'false',
    q5: 'b'
};

// Adds event listener to the form to update progress in real-time
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('quizForm');
    form.addEventListener('change', updateProgressBar);
});
